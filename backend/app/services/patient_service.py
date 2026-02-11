from app.models.schemas import PatientCreate, Patient
from app.db.supabase import get_supabase
from typing import List

class PatientService:
    def __init__(self):
        self.client = get_supabase()

    def create_patient(self, patient: PatientCreate) -> Patient:
        data = patient.model_dump()
        response = self.client.table("patients").insert(data).execute()
        return Patient(**response.data[0])

    def get_patients(self) -> List[Patient]:
        response = self.client.table("patients").select("*").execute()
        return [Patient(**item) for item in response.data]

    def get_patient(self, patient_id: str) -> Patient:
        response = self.client.table("patients").select("*").eq("patient_id", patient_id).single().execute()
        return Patient(**response.data)
