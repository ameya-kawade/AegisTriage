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

class LiverDiseaseInput(BaseModel):
    Age: int
    Gender: int
    Total_Bilirubin: float
    Direct_Bilirubin: float
    Alkaline_Phosphotase: int
    Alamine_Aminotransferase: int
    Aspartate_Aminotransferase: int
    Total_Protiens: float
    Albumin: float
    Albumin_Globulin_Ratio: float

class KidneyDiseaseInput(BaseModel):
    Age: int
    Blood_Pressure: int
    Specific_Gravity: float
    Albumin: int
    Sugar: int
    Red_Blood_Cells: int
    Pus_Cells: int
    Pus_Cell_Clumps: int
    Bacteria: int
    Blood_Glucose_Random: int
    Blood_Urea: int
    Serum_Creatinine: float
    Sodium: int
    Potassium: float
    Hemoglobin: float
    Packed_Cell_Volume: int
    White_Blood_Cell_Count: int
    Red_Blood_Cell_Count: float
    Hypertension: int
    Diabetes_Mellitus: int
    Coronary_Artery_Disease: int
    Appetite: int
    Pedal_Edema: int
    Anemia: int

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int
