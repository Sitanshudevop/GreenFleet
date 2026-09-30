from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
import models, schemas, crud
import os
import random

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GreenFleet AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to GreenFleet AI API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/auth/login")
def login(form_data: dict, db: Session = Depends(get_db)):
    # Very simple mock auth for MVP
    email = form_data.get("email")
    password = form_data.get("password")
    user = crud.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    # bypassing pwd hash check for simple demo
    if password != "demo123": 
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"access_token": user.email, "token_type": "bearer", "role": user.role}

@app.get("/vehicles", response_model=list[schemas.Vehicle])
def read_vehicles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    return vehicles

@app.get("/alerts", response_model=list[schemas.Alert])
def read_alerts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alerts = crud.get_alerts(db, skip=skip, limit=limit)
    return alerts

@app.post("/predict/fuel")
def predict_fuel(data: dict):
    # Mocking fuel prediction for now until ML is connected
    distance = data.get("distance", 100)
    load = data.get("load", 10)
    
    base_consumption = (distance / 3.5) # assuming 3.5 km/l base
    load_factor = 1 + (load * 0.02)
    predicted_fuel = base_consumption * load_factor
    cost_per_liter = 90
    expected_co2_per_liter = 2.68
    
    return {
        "predicted_fuel_liters": round(predicted_fuel, 2),
        "expected_cost": round(predicted_fuel * cost_per_liter, 2),
        "expected_co2_kg": round(predicted_fuel * expected_co2_per_liter, 2),
        "confidence": 92.5
    }

@app.post("/optimize/route")
def optimize_route(data: dict):
    # Mock optimization endpoint
    origin = data.get("origin")
    destination = data.get("destination")
    
    # Simulate current vs optimized
    current_dist = random.uniform(250, 350)
    opt_dist = current_dist * random.uniform(0.85, 0.95)
    
    return {
        "current_route": {
            "distance_km": round(current_dist, 2),
            "fuel_l": round(current_dist / 3.0, 2),
            "co2_kg": round((current_dist / 3.0) * 2.68, 2)
        },
        "optimized_route": {
            "distance_km": round(opt_dist, 2),
            "fuel_l": round(opt_dist / 3.5, 2),
            "co2_kg": round((opt_dist / 3.5) * 2.68, 2)
        },
        "savings": {
            "distance_km": round(current_dist - opt_dist, 2),
            "fuel_l": round((current_dist / 3.0) - (opt_dist / 3.5), 2),
            "co2_kg": round(((current_dist / 3.0) - (opt_dist / 3.5)) * 2.68, 2)
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
