from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    patient_id: UUID
    admission_time: datetime
    status: str = "waiting"

    model_config = ConfigDict(from_attributes=True)

class DiseaseAssessmentBase(BaseModel):
    patient_id: UUID
    disease_type: str
    input_data: Dict[str, Any]

class DiseaseAssessmentCreate(DiseaseAssessmentBase):
    pass

class DiseaseAssessment(DiseaseAssessmentBase):
    assessment_id: UUID
    risk_score: Optional[float] = None
    risk_category: Optional[str] = None
    confidence: Optional[float] = None
    model_version: Optional[str] = None
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)
