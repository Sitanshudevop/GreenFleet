from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="driver") # admin, dispatcher, driver
    is_active = Column(Boolean, default=True)

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(String, unique=True, index=True)
    registration_number = Column(String)
    vehicle_type = Column(String) # Heavy Truck, Medium Truck, Light Commercial Vehicle
    fuel_type = Column(String) # Diesel, CNG, EV
    capacity = Column(Float)
    current_location = Column(String) # Lat, Lng string
    status = Column(String) # Active, In Transit, Maintenance
    fuel_efficiency = Column(Float) # km/l or km/kWh
    odometer = Column(Float)
    health = Column(String)
    risk_score = Column(Float)

class Trip(Base):
    __tablename__ = "trips"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    driver_id = Column(Integer, ForeignKey("users.id"))
    origin = Column(String)
    destination = Column(String)
    status = Column(String) # Planned, Active, Completed
    start_time = Column(DateTime, default=datetime.datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    distance = Column(Float)
    predicted_fuel = Column(Float)
    actual_fuel = Column(Float, nullable=True)
    
    vehicle = relationship("Vehicle")
    driver = relationship("User")

class Telemetry(Base):
    __tablename__ = "telemetry"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    lat = Column(Float)
    lng = Column(Float)
    speed = Column(Float)
    fuel_level = Column(Float)
    rpm = Column(Float)
    engine_temp = Column(Float)
    load = Column(Float)
    idle_status = Column(Boolean)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    type = Column(String) # Fuel Theft, Idling, Harsh Braking
    severity = Column(String) # CRITICAL, HIGH, MEDIUM, LOW
    message = Column(String)
    is_resolved = Column(Boolean, default=False)
