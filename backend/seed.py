import sys
import os

# Add current directory to path so we can import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, SessionLocal, Base
import models
import crud
import schemas

def seed_db():
    print("Initializing Database...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    print("Seeding Users...")
    users = [
        {"email": "dispatcher@greenfleet.ai", "password": "demo123", "role": "dispatcher"},
        {"email": "admin@greenfleet.ai", "password": "demo123", "role": "admin"},
        {"email": "driver@greenfleet.ai", "password": "demo123", "role": "driver"},
    ]
    for u in users:
        crud.create_user(db, schemas.UserCreate(**u))
        
    print("Seeding Vehicles...")
    vehicles = [
        {"vehicle_id": "GF-101", "registration_number": "MH-12-AB-1234", "vehicle_type": "Heavy Truck", "fuel_type": "Diesel", "capacity": 20.0, "current_location": "19.0760,72.8777", "status": "Active", "fuel_efficiency": 3.5, "odometer": 120500, "health": "Good", "risk_score": 12.5},
        {"vehicle_id": "GF-102", "registration_number": "MH-14-CD-5678", "vehicle_type": "Medium Truck", "fuel_type": "CNG", "capacity": 10.0, "current_location": "18.5204,73.8567", "status": "Active", "fuel_efficiency": 6.2, "odometer": 45000, "health": "Excellent", "risk_score": 8.0},
        {"vehicle_id": "GF-103", "registration_number": "DL-01-EF-9012", "vehicle_type": "Light Commercial Vehicle", "fuel_type": "EV", "capacity": 2.5, "current_location": "28.7041,77.1025", "status": "In Transit", "fuel_efficiency": 8.0, "odometer": 12000, "health": "Good", "risk_score": 5.2},
        {"vehicle_id": "GF-104", "registration_number": "CG-04-GH-3456", "vehicle_type": "Heavy Truck", "fuel_type": "Diesel", "capacity": 18.0, "current_location": "21.2514,81.6296", "status": "Active", "fuel_efficiency": 2.8, "odometer": 210000, "health": "Maintenance Required", "risk_score": 65.0},
    ]
    for v in vehicles:
        crud.create_vehicle(db, schemas.VehicleCreate(**v))

    print("Seeding Alerts...")
    alerts = [
        {"vehicle_id": 4, "type": "Fuel Theft", "severity": "CRITICAL", "message": "Abnormal fuel drop of 8.7L detected."},
        {"vehicle_id": 1, "type": "Idling", "severity": "MEDIUM", "message": "Excessive idling detected (15+ mins)."},
    ]
    for a in alerts:
        crud.create_alert(db, schemas.AlertCreate(**a))

    print("Seeding complete.")
    db.close()

if __name__ == "__main__":
    seed_db()
