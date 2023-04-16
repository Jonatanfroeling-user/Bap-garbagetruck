#!/bin/bash
if [ "$1" == "init" ]; then
    git init
    git remote add origin https://github.com/Jonatanfroeling-user/Bap-garbagetruck.git   
fi
git init
sleep 0.1
git add .
sleep 0.5
git commit -m "update_$(date '+%Y%m%d%H%M%S' )"
sleep 1
git push origin main
