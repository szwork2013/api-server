#!/bin/bash
PROJECT=$(pwd)
if [ -f "${PROJECT}/logs/api-server.pid" ] 
then  
    pid=$(cat ${PROJECT}/logs/api-server.pid)
    kill -QUIT ${pid}
    rm ${PROJECT}/logs/api-server.pid
    echo "api-server stopped."
else 
    echo "api-server not running."
fi
