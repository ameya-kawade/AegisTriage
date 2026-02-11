from fastapi import FastAPI
from app.core.config import settings
from app.api.endpoints import patients, ml

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="2.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.include_router(patients.router, prefix=f"{settings.API_V1_STR}/patients", tags=["patients"])
app.include_router(ml.router, prefix=f"{settings.API_V1_STR}/ml", tags=["ml"])

@app.get("/")
async def root():
    return {"message": "Welcome to AegisTriage 2.0 API"}
