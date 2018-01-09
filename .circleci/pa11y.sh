#!/bin/sh
docker-compose up fs-intake-frontend &
sleep 60
cd ../frontend
# yarn run pa11y
pa11y-ci
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
docker-compose down
exit $pa11yreturncode
