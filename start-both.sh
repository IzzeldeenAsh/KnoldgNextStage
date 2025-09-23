#!/bin/bash

# Start both KNOLDG applications simultaneously
echo "Starting KNOLDG applications..."

# Start KNOLDG-APP in background
cd "/Users/izzeddinashour/Desktop/Production-KNOLDG/KNOLDG-APP" && npm start &
APP_PID=$!

# Start KnowrlandForClient in background
cd "/Users/izzeddinashour/Desktop/Production-KNOLDG/KnowrlandForClient" && npm run dev &
CLIENT_PID=$!

echo "KNOLDG-APP (npm start) started with PID: $APP_PID"
echo "KnowrlandForClient (npm run dev) started with PID: $CLIENT_PID"

# Wait for both processes
wait $APP_PID $CLIENT_PID