#!/bin/bash

npm run install:shared

npm run build:shared

docker build -t backend -f ./tests/docker/Backend.Dockerfile .

docker-compose -f ./tests/docker-compose.tests.yml up -d

bash ./tests/scripts/wait.sh

cd tests && npm run test
