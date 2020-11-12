#!/usr/bin/env bash
bash stop-db.sh

if [ $2 = "dev" ]; then
    mode="development"
elif [ $2 = "debug" ]; then
    mode="development"
elif [ $2 = "local" ]; then
    mode="local"
elif [ $2 = "prod" ]; then
    mode="production"
fi

docker-compose --env-file ./.env.${mode} -f docker-compose.yml -f docker-compose.${2}.yml ${1} ${3} ${4}
