from sqlalchemy.orm import Session
import models, schemas

def get_password_hash(password):
    return password  # Mock hashing for MVP

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_vehicles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Vehicle).offset(skip).limit(limit).all()

def create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    db_vehicle = models.Vehicle(**vehicle.dict())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def get_alerts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Alert).order_by(models.Alert.timestamp.desc()).offset(skip).limit(limit).all()

def create_alert(db: Session, alert: schemas.AlertCreate):
    db_alert = models.Alert(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert
