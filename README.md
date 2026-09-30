# GreenFleet AI

**AI-Powered Fuel Prediction & Fleet Optimization**

GreenFleet AI is an intelligent fleet-management platform that predicts fuel consumption before dispatch, optimizes vehicle-route assignments using quantum-inspired optimization, monitors fleet behavior in real time, detects anomalies (like fuel theft and idling), and provides CO2 reduction insights.

This prototype was developed for the Smart India Hackathon.

## Architecture

* **Frontend**: React.js, Tailwind CSS, Recharts, Leaflet, Vite
* **Backend**: Python, FastAPI, SQLite (Fallback to PostgreSQL)
* **AI/ML**: XGBoost, Isolation Forest
* **Optimization**: Quantum-Inspired QUBO (Simulated Annealing) & OR-Tools Benchmark

## Getting Started

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `.\venv\Scripts\activate` (or `source venv/bin/activate` on Linux/Mac)
4. `pip install -r requirements.txt`
5. `python seed.py`
6. `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:5173`

## Features

1. **Dashboard**: Executive summary of fleet KPIs (Fuel, CO2, Alerts).
2. **Fuel AI**: Predict fuel consumption before dispatch using trained ML models.
3. **Route Optimization**: Quantum-Inspired (QUBO) route optimization benchmarked against Classical OR-Tools.
4. **Live Map**: Real-time tracking of vehicles.
5. **Anomaly Detection**: Detection of fuel theft and excessive idling.

## Demo Mode

The application contains a **Demo Mode** built-in. Use the provided demo credentials to access the platform. When running in a disconnected environment, the application will fallback to generating simulated telemetry and ML predictions automatically.

Demo Credentials:
- **Dispatcher**: `dispatcher@greenfleet.ai` / `demo123`
- **Admin**: `admin@greenfleet.ai` / `demo123`
- **Driver**: `driver@greenfleet.ai` / `demo123`
