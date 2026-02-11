from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services.ml_service import MockMLService
from app.models.schemas import LiverDiseaseInput, KidneyDiseaseInput, DiabetesInput

router = APIRouter()

@router.post("/predict/heart-disease")
async def predict_heart_disease(data: Dict[str, Any]):
    return MockMLService.predict_heart_disease(data)

@router.post("/predict/liver-disease")
async def predict_liver_disease(data: LiverDiseaseInput):
    return MockMLService.predict_liver_disease(data.model_dump())

@router.post("/predict/kidney-disease")
async def predict_kidney_disease(data: KidneyDiseaseInput):
    return MockMLService.predict_kidney_disease(data.model_dump())

@router.post("/predict/diabetes")
async def predict_diabetes(data: DiabetesInput):
    return MockMLService.predict_diabetes(data.model_dump())
