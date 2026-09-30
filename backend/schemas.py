from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class VehicleBase(BaseModel):
    vehicle_id: str
    registration_number: str
    vehicle_type: str
    fuel_type: str
    capacity: float
    current_location: str
    status: str
    fuel_efficiency: float
    odometer: float
    health: str
    risk_score: float

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int
    class Config:
        from_attributes = True

class TripBase(BaseModel):
    vehicle_id: int
    driver_id: int
    origin: str
    destination: str
    status: str
    distance: float
    predicted_fuel: float

class TripCreate(TripBase):
    pass

class Trip(TripBase):
    id: int
    start_time: datetime
    end_time: Optional[datetime] = None
    actual_fuel: Optional[float] = None
    class Config:
        from_attributes = True

class TelemetryBase(BaseModel):
    vehicle_id: int
    lat: float
    lng: float
    speed: float
    fuel_level: float
    rpm: float
    engine_temp: float
    load: float
    idle_status: bool

class TelemetryCreate(TelemetryBase):
    pass

class Telemetry(TelemetryBase):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    vehicle_id: int
    type: str
    severity: str
    message: str

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    timestamp: datetime
    is_resolved: bool
    class Config:
        from_attributes = True
