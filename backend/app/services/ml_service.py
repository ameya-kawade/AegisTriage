import random
from typing import Dict, Any

class MockMLService:
    @staticmethod
    def predict_heart_disease(data: Dict[str, Any]) -> Dict[str, Any]:
        # Simulate processing time
        # Random risk score for demonstration
        risk_score = random.uniform(0.1, 0.9)
        category = "LOW"
        if risk_score > 0.8:
            category = "CRITICAL"
        elif risk_score > 0.6:
            category = "HIGH"
        elif risk_score > 0.4:
            category = "MEDIUM"
        
        return {
            "risk_score": round(risk_score, 2),
            "risk_category": category,
            "confidence": round(random.uniform(0.8, 0.99), 2),
            "model_version": "v1.0.0-mock"
        }

    @staticmethod
    def predict_liver_disease(data: Dict[str, Any]) -> Dict[str, Any]:
        risk_score = random.uniform(0.1, 0.9)
        category = "LOW" if risk_score < 0.5 else "HIGH"
        return {
            "risk_score": round(risk_score, 2),
            "risk_category": category,
            "confidence": 0.85,
            "model_version": "v1.0.0-mock"
        }

    @staticmethod
    def predict_kidney_disease(data: Dict[str, Any]) -> Dict[str, Any]:
        # Simple mock logic based on CKD risk factors
        risk_score = random.uniform(0.1, 0.9)
        category = "LOW"
        if risk_score > 0.7:
            category = "HIGH"
        elif risk_score > 0.4:
            category = "MEDIUM"
            
        return {
            "risk_score": round(risk_score, 2),
            "chronic_kidney_disease": risk_score > 0.5,
            "risk_category": category,
            "confidence": 0.88,
            "model_version": "v1.0.0-mock"
        }

    @staticmethod
    def predict_diabetes(data: Dict[str, Any]) -> Dict[str, Any]:
        risk_score = random.uniform(0.1, 0.9)
        category = "LOW"
        if risk_score > 0.7:
            category = "HIGH"
        elif risk_score > 0.4:
            category = "MEDIUM"
            
        return {
            "risk_score": round(risk_score, 2),
            "diabetes_detected": risk_score > 0.6,
            "risk_category": category,
            "confidence": 0.90,
            "model_version": "v1.0.0-mock"
        }
