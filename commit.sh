#!/bin/bash
if [ "$1" == "init" ]; then
    git init
    git remote add origin https://github.com/Jonatanfroeling-user/Bap-garbagetruck.git   
fi

git add .
git commit -m 'update'
git push origin main