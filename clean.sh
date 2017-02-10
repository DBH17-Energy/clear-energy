#!/bin/bash
BASENAME=`basename "$PWD"`

docker-compose stop
docker-compose rm -f
docker rm -f -v $(docker ps -a | grep $BASENAME | awk '{print $1}') 2>/dev/null
docker rmi $(docker images -qf 'dangling=true') 2>/dev/null
exit 0