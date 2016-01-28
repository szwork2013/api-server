#!/bin/bash

PROJECT=$(pwd)
timestamp=$(date '+%s')
if [ -f "${PROJECT}/logs/api-server.pid" ]; then  
    echo "api-server is already running."
else
    echo "starting api-server ... "
    nohup node server.js > ${PROJECT}/logs/api-server-${timestamp}.log 2>&1 & echo $! > ${PROJECT}/logs/api-server.pid
fi
