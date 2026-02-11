import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.pipeline import Pipeline

# 1. & 2. Load and Clean (Keeping your logic, adding one-line 'ca' fix)
df = pd.read_csv('heart_disease_uci.csv').replace(['?', 'null'], np.nan)
df['ca'] = pd.to_numeric(df['ca'], errors='coerce').fillna(df['ca'].astype(float).median())
df['slope'] = df['slope'].fillna('Unknown')
df['thal'] = df['thal'].fillna('Unknown')

# 3. Target & 4. Features
df['num'] = df['num'].apply(lambda x: 1 if x > 0 else 0)
df = pd.get_dummies(df, columns=['cp', 'restecg', 'slope', 'thal', 'sex'], drop_first=True)

X = df.drop(columns=[c for c in ['num', 'dataset', 'id'] if c in df.columns])
y = df['num']

# Save feature names now so testing script works later
joblib.dump(X.columns.tolist(), 'feature_names.pkl')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- IMPROVED TUNING SECTION ---

# Use a Pipeline to keep Scaler and Classifier together
# This prevents "Data Leakage" during cross-validation
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(random_state=42))
])

# Expanded Parameter Distribution
# RandomizedSearch picks 50 random combinations from this "space"
param_dist = {
    'rf__n_estimators': [100, 300, 500],
    'rf__max_depth': [5, 10, 15, None],
    'rf__min_samples_split': [2, 5, 10, 15],
    'rf__min_samples_leaf': [1, 2, 4, 8],      # Key for smoothing the model
    'rf__max_features': ['sqrt', 'log2'],     # Adds randomness to reduce overfitting
    'rf__class_weight': ['balanced', 'balanced_subsample', None]
}

# 2. RandomizedSearchCV is often faster and better than GridSearch
random_search = RandomizedSearchCV(
    pipe, 
    param_distributions=param_dist, 
    n_iter=50,      # Number of random combinations to try
    cv=5, 
    scoring='recall', 
    random_state=42,
    n_jobs=-1
)

random_search.fit(X_train, y_train)

# 4. Extract results
best_pipe = random_search.best_estimator_
print(f"Best Parameters: {random_search.best_params_}")

# 5. Prediction with 0.4 Threshold
# Note: best_pipe handles scaling automatically now!
probs = best_pipe.predict_proba(X_test)[:, 1]
custom_preds = (probs >= 0.4).astype(int)

print("\n--- Model Performance After Advanced Tuning (0.4 Threshold) ---")
print(classification_report(y_test, custom_preds))

# Save the entire pipeline (includes the scaler + the tuned model)
joblib.dump(best_pipe, 'heart_disease_pipeline.pkl')