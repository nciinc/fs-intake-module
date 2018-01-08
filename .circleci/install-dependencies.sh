#!/bin/sh
docker-compose run fs-intake-frontend yarn  
docker-compose run fs-intake-server yarn && yarn global add mocha && yarn global add nyc
