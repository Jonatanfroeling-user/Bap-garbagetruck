#!/bin/bash
if [ "$1" == "init" ]; then
    git init
    git remote add origin https://github.com/Jonatanfroeling-user/Bap-garbagetruck.git   
fi

git add .
git commit -m "update_$(date '+%Y%m%d%H%M%S' )"
git push origin main