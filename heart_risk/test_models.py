import joblib
import numpy as np
import pandas as pd

# 1. Load the tools
try:
    model = joblib.load('heart_disease_rf_model.pkl')
    scaler = joblib.load('heart_disease_scaler.pkl')
    feature_names = joblib.load('feature_names.pkl')
except FileNotFoundError:
    print("Error: Required .pkl files not found. Ensure you saved model, scaler, and feature_names.")
    exit()

# 2. Define multiple sample patients
# We use a list of dictionaries to represent different medical profiles
patients_data = [
    {
        "description": "High Risk (Older, high BP, high cholesterol, chest pain)",
        "age": 67, "trestbps": 160, "chol": 286, "fbs": 0, "thalach": 108, 
        "exang": 1, "oldpeak": 1.5, "ca": 3.0, "sex_True": 1, 
        "cp_typical angina": 1, "restecg_normal": 1, "slope_flat": 1, "thal_reversable defect": 1
    },
    {
        "description": "Low Risk (Young, active, normal vitals)",
        "age": 25, "trestbps": 110, "chol": 190, "fbs": 0, "thalach": 180, 
        "exang": 0, "oldpeak": 0.0, "ca": 0.0, "sex_True": 0, 
        "cp_non-anginal": 1, "restecg_normal": 1, "slope_upsloping": 1, "thal_normal": 1
    },
    {
        "description": "Borderline (Middle age, slightly high metrics)",
        "age": 50, "trestbps": 135, "chol": 230, "fbs": 0, "thalach": 140, 
        "exang": 0, "oldpeak": 0.8, "ca": 0.0, "sex_True": 1, 
        "cp_atypical angina": 1, "restecg_normal": 1, "slope_flat": 1, "thal_normal": 1
    }
]

# 3. Processing and Prediction Loop
results = []
threshold = 0.4

for p in patients_data:
    # Extract description for display
    desc = p.pop("description")
    
    # Create DataFrame and align with training features
    temp_df = pd.DataFrame([p])
    for col in feature_names:
        if col not in temp_df.columns:
            temp_df[col] = 0
    temp_df = temp_df[feature_names] # Reorder
    
    # Scale and Predict
    scaled_x = scaler.transform(temp_df)
    prob = model.predict_proba(scaled_x)[:, 1][0]
    prediction = 1 if prob >= threshold else 0
    
    results.append({
        "Profile": desc,
        "Probability": f"{prob:.2%}",
        "Result": "RISK" if prediction == 1 else "Healthy"
    })

# 4. Display Results
results_df = pd.DataFrame(results)
print("\n--- Multi-Patient Test Results (Threshold: 0.4) ---")
print(results_df.to_string(index=False))