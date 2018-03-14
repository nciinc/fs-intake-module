echo 'building pa11y\n\n'
docker-compose build fs-intake-pa11y
echo 'start application\n\n'
docker-compose up fs-intake-pa11y &
sleep 120
cd ../frontend
echo 'running pa11y\n\n'
pa11y-ci
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
docker-compose down
exit $pa11yreturncode
