import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# 1. Load Data
df = pd.read_csv('heart_disease_uci.csv')

# 2. Comprehensive Cleaning
df = df.replace(['?', 'null'], np.nan)

# Convert 'ca' to numeric (essential if it has string placeholders)
df['ca'] = pd.to_numeric(df['ca'], errors='coerce')

# Fill Numerical Missing Values with Median
df['ca'] = df['ca'].fillna(df['ca'].median())

# Fill Categorical Missing Values with 'Unknown'
df['slope'] = df['slope'].fillna('Unknown')
df['thal'] = df['thal'].fillna('Unknown')

# 3. Target Engineering
# UCI dataset uses 'num' 0-4; converting to 0 (Healthy) and 1 (Risk)
df['num'] = df['num'].apply(lambda x: 1 if x > 0 else 0)

# 4. Feature Engineering
# Create dummies for categorical variables
df = pd.get_dummies(df, columns=['cp', 'restecg', 'slope', 'thal', 'sex'], drop_first=True)

# Define X and y (dropping 'id' or 'dataset' if they exist to avoid noise)
cols_to_drop = ['num', 'dataset', 'id']
X = df.drop(columns=[col for col in cols_to_drop if col in df.columns])
y = df['num']

# 5. Split and Scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 6. Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 7. Apply Custom Threshold (0.4) for Higher Recall
probabilities = model.predict_proba(X_test)[:, 1]
custom_predictions = (probabilities >= 0.4).astype(int)

# 8. Results
print("--- Model Performance at 0.4 Threshold ---")
print(f"Accuracy: {accuracy_score(y_test, custom_predictions):.4f}")
print(classification_report(y_test, custom_predictions))

# 9. Visualize Feature Importance
importances = model.feature_importances_
feature_df = pd.DataFrame({'Feature': X.columns, 'Importance': importances}).sort_values(by='Importance', ascending=True)

plt.figure(figsize=(10, 8))
plt.barh(feature_df['Feature'], feature_df['Importance'], color='crimson')
plt.title('Medical Predictors of Heart Disease (Feature Importance)')
plt.xlabel('Importance Score')
plt.savefig("fig.png")