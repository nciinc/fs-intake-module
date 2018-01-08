#!/bin/sh
docker-compose run fs-intake-frontend yarn run e2e:ci --specs=e2e/unauthenticated/check-authentication.e2e-spec.ts;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

kill -int $serverid
exit $e2ereturncode
