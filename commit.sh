#!/bin/bash
if [[ "$2" -eq "init" ]]; then
    git init
    git remote add origin https://github.com/Jonatanfroeling-user/Bap-garbagetruck.git   
fi

git add .
git commit -m 'init'
git push origin main