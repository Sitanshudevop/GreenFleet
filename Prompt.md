You are the lead engineer responsible for building a COMPLETE, WORKING, DEMO-READY prototype of the project described below.

IMPORTANT:
DO NOT just create a UI mockup.
DO NOT stop after creating frontend pages.
DO NOT leave buttons non-functional.
DO NOT give me pseudocode.
DO NOT create placeholder screens that do nothing.

You must actually build the complete project, connect the frontend and backend, implement working logic, seed realistic demo data, test the application, identify errors, fix them, and continue iterating until the entire prototype is functional.

========================================================
PROJECT
========================================================

Project Name:
GREENFLEET AI

Tagline:
AI-Powered Fuel Prediction & Fleet Optimization

Goal:
Build an intelligent fleet-management platform that predicts fuel consumption before dispatch, optimizes vehicle-route assignments, monitors fleet behavior in real time, detects anomalies such as fuel theft/leaks/idling, and provides CO2 reduction and CNG/EV transition insights.

The prototype is being developed for Smart India Hackathon 2026.

The prototype should look and behave like a serious commercial product, not a college-level static website.

========================================================
CORE PROBLEM
========================================================

Fleet operators face:

1. Unpredictable fuel consumption before a trip.
2. Manual/static route planning that ignores fuel efficiency.
3. Inefficient vehicle-to-route assignment.
4. Fuel theft, leakage and excessive idling that are difficult to detect.
5. Lack of real-time fleet visibility.
6. Fragmented vehicle, fuel, driver and route data.
7. Difficulty understanding CO2 emissions.
8. No data-driven CNG/EV transition planning.

GreenFleet AI solves these through:

1. Fuel consumption prediction.
2. Fuel-aware route optimization.
3. Vehicle-route assignment optimization.
4. Real-time telemetry monitoring.
5. Driver behavior scoring.
6. Anomaly detection.
7. CO2 analytics.
8. CNG/EV transition planning.
9. Unified dispatcher and driver dashboards.

========================================================
TECHNOLOGY STACK
========================================================

Use the following stack where practical.

FRONTEND
- React.js
- Responsive dashboard UI
- React Router
- Tailwind CSS or another clean modern UI system
- Recharts / Chart.js for analytics
- Leaflet + OpenStreetMap OR Google Maps if API credentials are available
- React Native architecture may be represented through a mobile-friendly driver interface if a separate mobile build would unnecessarily complicate the prototype

BACKEND
- Python
- FastAPI
- REST APIs
- Pydantic
- Uvicorn

OPTIONAL REAL-TIME SERVICES
- Node.js + Express.js if actually useful
- WebSocket / Socket.IO for live dashboard updates

AI / ML
- XGBoost or LightGBM for fuel prediction
- LSTM using PyTorch/TensorFlow if useful for time-series demonstration
- scikit-learn
- Isolation Forest for anomaly detection
- SHAP for explainability

OPTIMIZATION
- QUBO formulation
- Simulated Annealing or Simulated Bifurcation running on CPU
- D-Wave neal if available and useful
- Qiskit QAOA simulation may be included as an optional research/demo module
- Google OR-Tools as the classical benchmark

IMPORTANT:
Do NOT falsely claim that the prototype is running on a quantum computer.

Clearly label quantum-inspired optimization as:
"Quantum-Inspired / QUBO Optimization"

DATA
- PostgreSQL
- TimescaleDB if practical
- Redis if practical
- MQTT for telemetry simulation if practical

SECURITY
- JWT
- RBAC
- AES-256/TLS concepts documented
- Never hard-code secrets

DEPLOYMENT
- Docker
- Docker Compose if useful
- Google Cloud compatible
- Hugging Face Spaces compatible for appropriate ML/demo components

========================================================
IMPORTANT DEVELOPMENT PRINCIPLE
========================================================

BUILD A REAL WORKING MVP.

The application must work even WITHOUT:
- physical GPS devices
- physical OBD-II hardware
- paid Google Maps APIs
- real fleet telemetry
- external quantum hardware
- production cloud credentials

Therefore create a powerful DEMO/SIMULATION MODE.

The user must be able to launch the application and immediately demonstrate the entire system using realistic synthetic fleet data.

========================================================
APPLICATION STRUCTURE
========================================================

Create a professional application with these major modules:

1. LOGIN / AUTHENTICATION
2. EXECUTIVE DASHBOARD
3. FLEET MANAGEMENT
4. LIVE MAP
5. FUEL PREDICTION
6. ROUTE OPTIMIZATION
7. FLEET ASSIGNMENT
8. REAL-TIME MONITORING
9. ANOMALY DETECTION
10. DRIVER ANALYTICS
11. TRIP PLANNING
12. CO2 / ENVIRONMENT ANALYTICS
13. CNG / EV TRANSITION PLANNER
14. REPORTS
15. SETTINGS
16. DEMO CONTROL CENTER

========================================================
1. AUTHENTICATION
========================================================

Create a professional login page.

Demo credentials should be clearly available:

Dispatcher:
email: dispatcher@greenfleet.ai
password: demo123

Admin:
email: admin@greenfleet.ai
password: demo123

Driver:
email: driver@greenfleet.ai
password: demo123

Implement role-based access.

Dispatcher:
- fleet dashboard
- route optimization
- trip planning
- live monitoring
- alerts

Admin:
- everything
- analytics
- reports
- settings

Driver:
- assigned trip
- route
- fuel guidance
- alerts
- driver score

========================================================
2. EXECUTIVE DASHBOARD
========================================================

Create a highly polished dashboard.

Show:

- Total Vehicles
- Active Vehicles
- Vehicles In Transit
- Today's Trips
- Average Fuel Consumption
- Predicted Fuel Cost
- Fuel Saved
- CO2 Reduced
- Active Alerts
- Driver Safety Score
- Fleet Utilization

Use attractive KPI cards.

Include charts:

A. Fuel Consumption Trend
B. Fuel Cost Trend
C. CO2 Emission Trend
D. Fleet Utilization
E. Vehicle Efficiency Ranking

Include a map showing the current fleet.

Include "AI Insights".

Examples:

"Vehicle GF-102 is consuming 14% more fuel than its baseline."

"Route R-17 can reduce predicted fuel consumption by approximately 8%."

"Vehicle GF-108 has abnormal fuel-level drops."

"3 vehicles have excessive idling detected."

========================================================
3. FLEET MANAGEMENT
========================================================

Create a fleet table.

Fields:

Vehicle ID
Registration Number
Vehicle Type
Fuel Type
Capacity
Current Location
Driver
Status
Fuel Efficiency
Odometer
Last Service
Health
Risk Score

Vehicle types:

- Heavy Truck
- Medium Truck
- Light Commercial Vehicle

Fuel types:

- Diesel
- CNG
- EV

Add:

- Search
- Filter
- Sort
- Add vehicle
- Edit vehicle
- Delete vehicle
- View details

Vehicle details page should show:

- Fuel history
- Trips
- Maintenance
- Driver
- Efficiency
- CO2 emissions
- Alerts
- Route history

========================================================
4. LIVE FLEET MAP
========================================================

Create a live map.

Use Leaflet/OpenStreetMap if possible.

Show:

- vehicle markers
- routes
- destination
- vehicle status
- traffic indicator
- fuel efficiency indicator

Marker colors:

Green = efficient
Yellow = warning
Red = critical

Clicking a vehicle should open a detail panel.

Show:

Vehicle
Driver
Speed
Fuel %
Fuel consumption
ETA
Current route
Engine status
Idle time
Risk score

========================================================
5. FUEL PREDICTION ENGINE
========================================================

THIS IS ONE OF THE MOST IMPORTANT FEATURES.

Create a working fuel prediction module.

Inputs:

Vehicle type
Fuel type
Vehicle weight/load
Distance
Average speed
Traffic level
Road gradient
Weather
Temperature
Driver behavior
Historical fuel efficiency

Output:

Predicted fuel consumption
Predicted fuel cost
Expected CO2
Fuel efficiency
Confidence score

Example:

Distance: 248 km
Load: 8.2 tons
Traffic: Medium
Weather: Clear

Prediction:

Fuel Required: 74.8 L
Expected Cost: ₹6,732
Expected CO2: 200.5 kg
Confidence: 91%

IMPORTANT:
If a trained model cannot be created from real data, generate a synthetic training dataset and train an actual lightweight model.

Do NOT fake the ML architecture.

Create:
backend/ml/fuel_model.py

Include:
- dataset generation
- preprocessing
- training
- prediction
- model persistence

Use XGBoost or LightGBM if available.

Provide a fallback RandomForest/GradientBoosting implementation if dependency issues occur.

========================================================
6. FUEL PREDICTION EXPLAINABILITY
========================================================

Implement SHAP if practical.

Show:

"Why is this trip predicted to consume more fuel?"

Example:

Load weight       +28%
Traffic           +21%
Distance          +18%
Driving behavior  +12%
Road gradient      +9%
Weather            +4%

Create a visual explanation.

========================================================
7. ROUTE OPTIMIZATION
========================================================

Create a route optimization page.

Inputs:

Origin
Destination
Vehicle
Load
Fuel type
Traffic
Weather
Priority

Optimization objectives:

- minimize fuel
- minimize distance
- minimize travel time
- minimize CO2
- balance all objectives

Show:

Current route
Optimized route
Distance saved
Fuel saved
Time saved
CO2 saved

Example:

Current:
312 km
92 L
₹8,280
248 kg CO2

Optimized:
284 km
79 L
₹7,110
213 kg CO2

Savings:
28 km
13 L
₹1,170
35 kg CO2

Do NOT invent unrealistic savings universally.

Label values as:
"Estimated"

========================================================
8. QUANTUM-INSPIRED OPTIMIZATION
========================================================

Create a dedicated optimization engine.

Use QUBO formulation for:

Vehicle-route assignment.

Variables:

x(vehicle, route) ∈ {0,1}

Objective:

Minimize:

fuel_cost
+ route_distance
+ time_penalty
+ CO2_penalty
+ load_mismatch_penalty

Implement:

1. QUBO formulation
2. Simulated annealing solver
3. Optional simulated bifurcation
4. Classical OR-Tools benchmark

Show comparison:

Quantum-Inspired:
solution cost
runtime
fuel estimate

OR-Tools:
solution cost
runtime
fuel estimate

IMPORTANT:
Do not claim quantum advantage.

Instead display:

"Quantum-Inspired Optimization Benchmark"

========================================================
9. REAL-TIME TELEMETRY SIMULATOR
========================================================

Create a DEMO MODE where telemetry is continuously generated.

Every few seconds update:

GPS
Speed
Fuel level
RPM
Engine temperature
Load
Idle status
Driver behavior
Fuel consumption

Allow:

START SIMULATION
PAUSE
RESET
SPEED UP
SLOW DOWN

Generate multiple vehicles.

Example:

GF-101
GF-102
GF-103
GF-104
GF-105
GF-106
GF-107
GF-108

The dashboard must visibly update.

========================================================
10. ANOMALY DETECTION
========================================================

Implement Isolation Forest.

Detect:

Fuel theft
Fuel leakage
Abnormal fuel consumption
Excessive idling
Harsh acceleration
Harsh braking
Overspeeding

Each alert should contain:

Vehicle
Timestamp
Location
Type
Severity
Detected value
Expected value
Recommended action

Example:

CRITICAL

Vehicle GF-104

Fuel anomaly detected.

Expected fuel drop:
2.1 L

Observed:
8.7 L

Possible causes:
Fuel theft / leakage

Recommended:
Inspect vehicle and verify fuel log.

========================================================
11. DRIVER BEHAVIOR
========================================================

Create driver scoring.

Metrics:

Speeding
Harsh braking
Harsh acceleration
Excessive idling
Route deviation

Generate:

Driver Safety Score: 87/100

Show historical trend.

Give recommendations:

"Reduce harsh braking by 12%."

"Idle time is above fleet average."

========================================================
12. TRIP PLANNER
========================================================

Create a pre-trip planning wizard.

Step 1:
Origin

Step 2:
Destination

Step 3:
Vehicle

Step 4:
Load

Step 5:
Traffic/weather

Step 6:
Optimization preference

Then generate:

Recommended vehicle
Recommended route
Fuel prediction
Fuel cost
ETA
CO2
Alternative route

Allow user to compare:

FASTEST
CHEAPEST
GREENEST
BALANCED

========================================================
13. CO2 / ENVIRONMENT DASHBOARD
========================================================

Create:

Total CO2 emissions
CO2 per km
CO2 per trip
CO2 saved
Fuel saved
Idle emissions

Charts:

CO2 trend
Vehicle comparison
Route comparison

Include:

"CNG/EV Transition Planner"

========================================================
14. CNG / EV TRANSITION PLANNER
========================================================

Create a calculator.

Inputs:

Vehicle
Annual distance
Current fuel
Fuel price
Maintenance cost
Vehicle age

Compare:

Diesel
CNG
EV

Calculate:

Annual fuel cost
Energy cost
Maintenance
CO2
Estimated savings
Payback period

Show:

Recommended transition candidates

Example:

Vehicle GF-108

Annual distance:
78,000 km

Current diesel cost:
₹X

Estimated CNG cost:
₹Y

Estimated annual saving:
₹Z

Estimated payback:
X years

Clearly label this as an estimate.

========================================================
15. REPORTS
========================================================

Generate downloadable reports.

Report types:

- Fleet efficiency report
- Fuel consumption report
- Driver safety report
- Anomaly report
- CO2 report
- Route optimization report

Allow CSV export.

If practical create PDF export.

========================================================
16. ALERT CENTER
========================================================

Create centralized alerts.

Filters:

Critical
High
Medium
Low

Categories:

Fuel
Vehicle
Driver
Route
Security
Maintenance

Allow:

Acknowledge
Resolve
Assign
View vehicle

========================================================
17. AI INSIGHTS ENGINE
========================================================

Create a rule-based + ML-assisted insight engine.

Generate useful natural-language insights from current data.

Examples:

"Fuel consumption increased 8.4% this week."

"GF-104 has three abnormal fuel-level events."

"Route Delhi → Jaipur shows the largest optimization opportunity."

"5 vehicles have idling above the fleet threshold."

"EV transition could be evaluated for 3 high-mileage vehicles."

Do not generate meaningless generic AI text.

Insights must be based on actual application data.

========================================================
18. DEMO MODE
========================================================

THIS IS CRITICAL FOR SIH PRESENTATION.

Create a "DEMO MODE" button.

When activated:

1. Load realistic fleet data.
2. Start telemetry simulation.
3. Populate map.
4. Generate alerts.
5. Run fuel prediction.
6. Show optimization.
7. Update KPIs.
8. Generate AI insights.

Create a "Run Full Demo" button.

When clicked:

STEP 1:
Load fleet

STEP 2:
Predict fuel

STEP 3:
Optimize route

STEP 4:
Assign vehicle

STEP 5:
Start trip

STEP 6:
Generate telemetry

STEP 7:
Detect anomaly

STEP 8:
Generate alert

STEP 9:
Calculate CO2

STEP 10:
Show dashboard result

Add a visual progress indicator.

========================================================
19. DATABASE
========================================================

Create database schema.

Tables:

users
vehicles
drivers
trips
routes
telemetry
fuel_predictions
fuel_transactions
anomalies
alerts
driver_scores
optimization_runs
emission_records
maintenance
locations

Create seed data.

Do not require the user to manually insert records.

========================================================
20. API ENDPOINTS
========================================================

Create proper FastAPI endpoints.

Examples:

POST /auth/login

GET /vehicles
POST /vehicles
PUT /vehicles/{id}
DELETE /vehicles/{id}

GET /drivers

GET /trips
POST /trips

POST /predict/fuel

POST /optimize/route

POST /optimize/assignment

GET /telemetry/live

GET /alerts

POST /alerts/{id}/acknowledge

GET /analytics/fuel

GET /analytics/co2

GET /analytics/fleet

POST /demo/start

POST /demo/stop

GET /health

Document APIs.

========================================================
21. FRONTEND DESIGN
========================================================

Design language:

Professional SaaS dashboard.

Use:

- dark navy / green / teal accents
- white cards
- subtle shadows
- rounded corners
- clean typography
- excellent spacing
- responsive layout
- professional icons
- clear hierarchy

Do NOT make it look like a generic AI template.

Brand:

GREENFLEET AI

Use a simple logo treatment.

Navigation:

Dashboard
Fleet
Live Map
Trips
Fuel AI
Optimization
Alerts
Drivers
Environment
Reports
Settings

Top bar:

Search
Notifications
Demo Mode
User Profile

========================================================
22. UX REQUIREMENTS
========================================================

Every important button must work.

No dead buttons.

No fake navigation.

No empty pages.

No "Coming Soon" sections for core features.

Every page must contain realistic data.

Loading states.

Empty states.

Error states.

Success notifications.

Confirmation dialogs.

Tooltips where useful.

Mobile responsive.

========================================================
23. PERFORMANCE
========================================================

Avoid unnecessary huge dependencies.

Lazy load large pages.

Do not constantly retrain models.

Cache prediction results when appropriate.

Use efficient telemetry simulation.

========================================================
24. ERROR HANDLING
========================================================

Handle:

Backend unavailable
Database unavailable
Invalid API response
Missing data
Model failure
Map API unavailable
Network failure

The frontend should show useful messages instead of crashing.

========================================================
25. OFFLINE / FALLBACK MODE
========================================================

The prototype must remain demonstrable even if:

- Google Maps API isn't configured
- PostgreSQL isn't running
- Redis isn't running
- MQTT isn't available

Implement graceful fallback to:

- SQLite/local demo data
- simulated map coordinates
- local telemetry generator
- local ML model

The application must still run.

========================================================
26. PROJECT STRUCTURE
========================================================

Create a clean monorepo:

greenfleet-ai/

frontend/
backend/
ml/
data/
docs/
scripts/
docker/

Include:

README.md
.env.example
docker-compose.yml

Document:

installation
development
production
demo mode
API
ML training
database setup

========================================================
27. TESTING
========================================================

You MUST test the project.

Create:

Backend unit tests
API tests
ML prediction tests
Optimization tests
Frontend smoke tests if practical

At minimum test:

- login
- vehicle retrieval
- fuel prediction
- route optimization
- anomaly detection
- demo mode
- alerts
- database connectivity

========================================================
28. SELF-CORRECTION LOOP
========================================================

THIS IS EXTREMELY IMPORTANT.

After implementation, DO NOT STOP.

Follow this loop:

BUILD
↓
RUN
↓
CHECK ERRORS
↓
FIX ERRORS
↓
RUN AGAIN
↓
TEST FEATURES
↓
FIX UI
↓
TEST APIs
↓
TEST DATABASE
↓
TEST DEMO MODE
↓
CHECK RESPONSIVENESS
↓
IMPROVE
↓
REPEAT

Continue this loop until:

- frontend starts successfully
- backend starts successfully
- database initializes successfully OR fallback works
- login works
- dashboard works
- APIs work
- ML prediction works
- optimization works
- telemetry simulation works
- anomaly detection works
- alerts work
- charts work
- map works or fallback works
- demo mode works
- no major console errors
- no broken routes
- no obvious UI overlap
- no placeholder core features

========================================================
29. FINAL DEMO TEST
========================================================

Before declaring completion, perform an end-to-end demo yourself.

Simulate this scenario:

A dispatcher wants to send a truck from:

Bhilai → Nagpur

Vehicle:
GF-104

Load:
8 tons

Fuel:
Diesel

The system should:

1. Receive trip request.
2. Predict fuel consumption.
3. Calculate fuel cost.
4. Calculate CO2.
5. Generate at least two route options.
6. Optimize route.
7. Select suitable vehicle.
8. Display route on map.
9. Start simulated trip.
10. Generate telemetry.
11. Detect an abnormal fuel drop.
12. Create an alert.
13. Update dashboard.
14. Update CO2 analytics.
15. Update driver score.
16. Generate AI insight.

Everything should work from the UI.

========================================================
30. PRESENTATION / SIH DEMO REQUIREMENTS
========================================================

The prototype must be optimized for a 3–5 minute SIH demonstration.

Create an obvious "RUN FULL DEMO" button.

The demo should visually show:

BEFORE:
Manual/static planning

↓

AI FUEL PREDICTION

↓

OPTIMIZED ROUTE

↓

VEHICLE ASSIGNMENT

↓

LIVE MONITORING

↓

ANOMALY DETECTION

↓

CO2 / SAVINGS

↓

ACTIONABLE INSIGHTS

Make important improvements visually obvious.

========================================================
31. DATA REALISM
========================================================

Do NOT use ridiculous fake values.

Use realistic ranges.

Example diesel truck:

Fuel efficiency:
2.5–5.0 km/L depending on vehicle/load

Speed:
20–80 km/h

Fuel tank:
100–500 L

Load:
0–20 tonnes

CO2 emission:
derive from fuel consumption using a documented emission factor

Do not randomly display impossible numbers.

========================================================
32. SECURITY
========================================================

Never expose secrets.

Use environment variables.

Provide:

.env.example

Do not commit API keys.

Validate all API inputs.

Use password hashing.

Use JWT authentication.

========================================================
33. DOCUMENTATION
========================================================

Create:

README.md

Include:

Project overview
Architecture
Tech stack
Installation
Running locally
Environment variables
Database
ML model
Optimization
Demo mode
API endpoints
Testing
Deployment

Also create:

docs/ARCHITECTURE.md
docs/API.md
docs/DEMO_SCRIPT.md

DEMO_SCRIPT.md should explain exactly how to demonstrate the project to SIH judges in 3–5 minutes.

========================================================
34. IMPORTANT CLAIM POLICY
========================================================

Do not make unsupported claims such as:

"Quantum computers make this 100x faster."

"AI guarantees 25% fuel savings."

"System reduces fuel by exactly 20%."

Instead use:

"Estimated"

"Predicted"

"Simulation"

"Benchmark"

"Pilot result"

"Potential savings"

The prototype must distinguish simulated results from real-world measured results.

========================================================
35. FINAL QUALITY CHECK
========================================================

Before you finish:

Inspect every page visually.

Check:

- spacing
- alignment
- typography
- responsiveness
- charts
- cards
- tables
- map
- buttons
- navigation
- dialogs
- error messages

Remove:

- lorem ipsum
- placeholder text
- TODO comments in user-facing areas
- dead buttons
- broken links
- console errors
- unnecessary demo text
- duplicate components

========================================================
36. WHAT YOU MUST DO NOW
========================================================

START BUILDING THE PROJECT NOW.

Do not simply explain what you would build.

Actually create the files.

First inspect the existing workspace/repository.

If a project already exists:
- understand its structure
- preserve useful existing work
- improve it instead of unnecessarily deleting it

If no project exists:
- initialize the complete project.

Then implement the entire system.

Do not ask me unnecessary questions.

If a technical decision is required, choose a sensible implementation yourself.

If a dependency is unavailable:
- implement a practical fallback
- document it
- continue building

If a feature is too complex for production implementation within the prototype:
- create a real working simplified implementation
- do not leave it as a static placeholder

After implementation:
RUN THE APPLICATION.

Test it.

Fix every error you encounter.

Then run it again.

Continue until the complete prototype works.

========================================================
FINAL CONDITION
========================================================

DO NOT STOP after generating the first version.

Your task is complete ONLY when you have:

✓ Complete frontend
✓ Complete backend
✓ Database/fallback database
✓ Working ML prediction
✓ Working route optimization
✓ Working QUBO/quantum-inspired optimization
✓ OR-Tools benchmark
✓ Working telemetry simulation
✓ Working anomaly detection
✓ Working alerts
✓ Working driver scoring
✓ Working live map/fallback map
✓ Working CO2 analytics
✓ Working CNG/EV planner
✓ Working reports
✓ Working authentication
✓ Working demo mode
✓ Seeded realistic data
✓ API documentation
✓ README
✓ Demo script
✓ Tests
✓ Successful end-to-end demo
✓ No major errors

KEEP ITERATING UNTIL ALL OF THE ABOVE ARE FUNCTIONAL.

DO NOT STOP AT A UI MOCKUP.
BUILD THE ACTUAL WORKING PROTOTYPE.
CONTINUE AUTONOMOUSLY.

Do not stop to ask whether you should continue.

Whenever you finish a phase, immediately move to the next phase.

If you encounter an error:
1. inspect the error,
2. identify the root cause,
3. fix the code,
4. rerun the affected component,
5. verify the fix,
6. continue.

If something is incomplete, do not report it as complete.

Before your final response, actually launch the application and perform the complete end-to-end GreenFleet AI demo scenario described in the specification.

Your final response must contain:
- what was built
- how to run it
- demo credentials
- major features implemented
- test results
- any genuinely unavoidable limitations

But only after the application is actually working.