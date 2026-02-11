from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services.ml_service import MockMLService

router = APIRouter()

@router.post("/predict/heart-disease")
async def predict_heart_disease(data: Dict[str, Any]):
    return MockMLService.predict_heart_disease(data)

@router.post("/predict/liver-disease")
async def predict_liver_disease(data: Dict[str, Any]):
    return MockMLService.predict_liver_disease(data)
