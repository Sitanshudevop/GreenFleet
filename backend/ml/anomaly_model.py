import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "isolation_forest.pkl")

def generate_telemetry_data(n_samples=5000):
    np.random.seed(42)
    # normal behavior
    df = pd.DataFrame({
        'speed': np.random.normal(50, 15, n_samples),
        'rpm': np.random.normal(1500, 300, n_samples),
        'fuel_drop_rate': np.random.normal(0.05, 0.01, n_samples), # L/min
        'idle_time': np.random.exponential(2, n_samples)
    })
    
    # inject anomalies (fuel theft, excessive idling, harsh driving)
    anomalies = pd.DataFrame({
        'speed': np.random.uniform(90, 120, 50), # overspeeding
        'rpm': np.random.uniform(3000, 4500, 50), # harsh accel
        'fuel_drop_rate': np.random.uniform(0.5, 2.0, 50), # fuel theft
        'idle_time': np.random.uniform(15, 60, 50) # excessive idling
    })
    
    df = pd.concat([df, anomalies], ignore_index=True)
    return df

def train_anomaly_model():
    print("Generating telemetry data...")
    df = generate_telemetry_data()
    
    print("Training Isolation Forest...")
    model = IsolationForest(contamination=0.01, random_state=42)
    model.fit(df)
    
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

def detect_anomaly(telemetry: dict):
    if not os.path.exists(MODEL_PATH):
        train_anomaly_model()
    
    model = joblib.load(MODEL_PATH)
    # Expected order: speed, rpm, fuel_drop_rate, idle_time
    df = pd.DataFrame([telemetry])
    
    # -1 is anomaly, 1 is normal
    prediction = model.predict(df)[0]
    
    is_anomaly = bool(prediction == -1)
    return is_anomaly

if __name__ == "__main__":
    train_anomaly_model()
