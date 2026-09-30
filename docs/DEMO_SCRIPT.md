# GreenFleet AI - SIH Demo Script

**Total Demo Time:** 3-5 Minutes

## Setup
1. Ensure both frontend (`npm run dev`) and backend (`uvicorn main:app`) are running.
2. Have the login screen open at `http://localhost:5173`.

## Step 1: Introduction & Login (30s)
1. "Hello judges, we present GreenFleet AI, an intelligent platform for fuel prediction and fleet optimization."
2. Show the professional login screen.
3. Click "Sign In" using the pre-filled dispatcher credentials (`dispatcher@greenfleet.ai`).

## Step 2: The Executive Dashboard (45s)
1. Point out the KPI cards: Active Vehicles, Avg Fuel Consumption, CO2 Reduced, Active Alerts.
2. Highlight the "Fuel Consumption Trend" chart. Show the overlay of "AI Predicted" vs "Actual" consumption.
3. Show the **AI Insights & Alerts** panel on the right. Point out the Isolation Forest anomaly detections (e.g. Fuel Theft, Idling).

## Step 3: Fleet Management & Live Map (45s)
1. Navigate to the **Fleet** page.
2. Show the dynamic risk scoring and vehicle health tracking. 
3. "We don't just track location, we track the efficiency and health of every asset."
4. Navigate to the **Live Map**. Show the live tracking. Explain how colors represent the real-time vehicle status (Active, In Transit, Maintenance).

## Step 4: Quantum-Inspired Route Optimization (60s)
1. This is the core MVP feature. Navigate to **Optimization**.
2. Explain the scenario: "We need to send 8 tonnes of cargo from Bhilai to Nagpur."
3. Click **Run Optimization**.
4. The system calculates the QUBO optimization and displays the results.
5. Point out the **Benchmark**: Compare the standard route vs the optimized route.
6. Emphasize the clear, data-driven savings: "By optimizing this single route using our quantum-inspired engine, we save 13.3 Liters of fuel and mitigate 34.5 kg of CO2."

## Step 5: Conclusion (30s)
1. "GreenFleet AI transforms logistics from a reactive operation into a proactive, data-driven ecosystem. We reduce costs, lower emissions, and prevent theft automatically."
2. Conclude and ask for questions.
