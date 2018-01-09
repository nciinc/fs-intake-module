#!/bin/sh
docker-compose up fs-intake-frontend
sleep 30
cd ../frontend
yarn run pa11y
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
docker-compose down fs-intake-frontend
exit $pa11yreturncode
