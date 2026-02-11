from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.schemas import Patient, PatientCreate
from app.services.patient_service import PatientService

router = APIRouter()

def get_patient_service():
    return PatientService()

@router.post("/", response_model=Patient)
async def create_patient(patient: PatientCreate, service: PatientService = Depends(get_patient_service)):
    try:
        return service.create_patient(patient)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[Patient])
async def read_patients(service: PatientService = Depends(get_patient_service)):
    try:
        return service.get_patients()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
