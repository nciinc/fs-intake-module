ARGUMENTS=''
for i in "$@"
do
  ARGUMENTS=$ARGUMENTS"--specs=${i} "
done

docker-compose run -e VCAP_SERVICES=$VCAP_SERVICES -e VCAP_APPLICATION=$VCAP_APPLICATION fs-intake-frontend yarn e2e:ci --environment docker $ARGUMENTS;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

kill -int $serverid
exit $e2ereturncode
