#!/usr/bin/env bash

set -e

# Detect environment based on deployment group name
if [[ $DEPLOYMENT_GROUP_NAME == *"dev"* ]]; then
  echo "\nREACT_APP_ENV=DEV" >> /home/ubuntu/.env
elif [[ $DEPLOYMENT_GROUP_NAME == *"prod"* ]]; then
  echo "\nREACT_APP_ENV=PROD" >> /home/ubuntu/.env
else
  echo "Unknown deployment group: $DEPLOYMENT_GROUP_NAME"
  exit 1
fi

echo "Deploying app"
docker stop metau-frontend || true && docker rm metau-frontend || true
docker-compose -f /home/ubuntu/docker-compose.yml up -d --build
docker network inspect metau-net >/dev/null 2>&1 || docker network create --driver bridge metau-net
docker network connect metau-net metau-frontend
