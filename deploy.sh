#!/bin/bash

# Crypto Knight Deployment Script

git pull origin master

pm2 stop crypto-knight

pm2 delete crypto-knight

npm install

pm2 start "npm run start" --name crypto-knight