import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgboost_model.pkl")

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)
    # distance, load, traffic(0-2), weather(0-2), speed, vehicle_efficiency
    data = {
        'distance': np.random.uniform(50, 800, n_samples),
        'load': np.random.uniform(0, 25, n_samples), # tonnes
        'traffic_level': np.random.randint(0, 3, n_samples), # 0: light, 1: medium, 2: heavy
        'weather_condition': np.random.randint(0, 3, n_samples), # 0: clear, 1: rain, 2: extreme
        'average_speed': np.random.uniform(30, 80, n_samples),
        'base_efficiency': np.random.uniform(2.5, 8.0, n_samples) # km/l
    }
    df = pd.DataFrame(data)
    
    # Fuel consumption formula (synthetic)
    # base = distance / base_efficiency
    # load penalty = +2% per tonne
    # traffic penalty = +15% per level
    # weather penalty = +10% per level
    base_fuel = df['distance'] / df['base_efficiency']
    load_penalty = 1 + (df['load'] * 0.02)
    traffic_penalty = 1 + (df['traffic_level'] * 0.15)
    weather_penalty = 1 + (df['weather_condition'] * 0.10)
    
    # adding some noise
    noise = np.random.normal(1, 0.05, n_samples)
    
    df['fuel_consumed'] = base_fuel * load_penalty * traffic_penalty * weather_penalty * noise
    
    return df

def train_model():
    print("Generating synthetic data for Fuel Prediction Model...")
    df = generate_synthetic_data()
    X = df.drop('fuel_consumed', axis=1)
    y = df['fuel_consumed']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost Regressor...")
    model = XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)
    
    score = model.score(X_test, y_test)
    print(f"Model R2 Score: {score:.4f}")
    
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

def predict_fuel(features: dict):
    if not os.path.exists(MODEL_PATH):
        train_model()
        
    model = joblib.load(MODEL_PATH)
    # Expected order: distance, load, traffic_level, weather_condition, average_speed, base_efficiency
    df = pd.DataFrame([features])
    prediction = model.predict(df)[0]
    return float(prediction)

if __name__ == "__main__":
    train_model()
