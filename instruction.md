# Instruction

## Installing dependencies

npm i -g create-nx-workspace \
npm i -D @nrwl/angular @nrwl/nest

## Generating Apps

create-nx-workspace `workspace name` --preset=empty \
npm run nx -- g @nrwl/angular:app {app name} --strict --routing --style=scss \
npm run nx -- add @nguniversal/express-engine --clientProject=`app name` \
npm run nx -- g @nrwl/nest:app anomzone-api --frontendProject=`app name` \
npm run nx -- g @nrwl/workspace:lib `lib name`

## Angular universal

npm run nx -- add @nguniversal/express-engine --clientProject=`project name`

## Running e2e Test

npm run e2e -- anomzone-e2e --watch

## Creating With Name

create-nx-workspace anomzone --preset=empty \
npm run nx -- g @nrwl/angular:app anomzone --strict --routing --style=scss --prefix=app && \
npm run nx -- g @nrwl/nest:app anomzone-api --frontendProject=anomzone && \
npm run nx -- g @nrwl/workspace:lib util && \
npm run nx -- g @nrwl/workspace:lib typeorm && \
npm run nx -- g @nrwl/workspace:lib config && \
npm run nx -- g @nrwl/workspace:lib middleware &&\
npm run nx -- g @nrwl/workspace:lib ngxs && \
npm run nx -- g @nrwl/workspace:lib ng-util

## Angular Deps

npm i -S primeng primeflex primeicons @angular/cdk @ngxs/store @ngxs/websocket-plugin @fortawesome/fontawesome-free

## Nest Deps

npm i -S @nestjs/serve-static joi @nestjs/typeorm typeorm pg csurf cookie-parser compression class-validator class-transformer argon2 helmet @nestjs/websockets @nestjs/platform-ws @nestjs/config heroku-ssl-redirect ip-address express-rate-limit rate-limit-redis faker uuid ws ws-rate-limit

npm i -D cross-env @types/rate-limit-redis @types/express-rate-limit @types/ws @types/csurf @types/cookie-parser @types/compression @types/ws

## Combined Deps

npm i -S primeng primeflex primeicons @angular/cdk @ngxs/store @ngxs/websocket-plugin @fortawesome/fontawesome-free @nestjs/serve-static joi @nestjs/typeorm typeorm pg csurf cookie-parser compression class-validator class-transformer argon2 helmet @nestjs/websockets @nestjs/platform-ws @nestjs/config heroku-ssl-redirect ip-address express-rate-limit rate-limit-redis faker &&
npm i -D @nrwl/angular @nrwl/nest cross-env @types/rate-limit-redis @types/express-rate-limit @types/ws @types/csurf @types/cookie-parser @types/compression uuid ws-rate-limit

## Check Docker

sudo docker ps -al
sudo docker images
sudo docker volume ls

## Remove images

sudo docker rmi `image id`

## Clear Docker

sudo docker system prune -a --volumes
sudo docker container prune
sudo docker image prune
sudo docker volume prune

## Generating

npm run nx -- g service ./core/util/toast --project=anomzone
npm run nx -- g service ./websocket/websocketFacade --project=ngxs
npm run nx -- g @nrwl/nest:pipe ./app/core/pipes/websocket-validation --project=anomzone-api
npm run nx -- g service ./websocket/websocketForm --project=ngxs

## Angular scss importing

html 에서는
    `<img src="assets/img/population.svg" alt="population icon" />`
이런식으로

scss 에서는
    url("~/assets/img/japan.jpg");
이런식으로

## Heroku Deploy

sudo bash docker-compose.sh up prod --build --no-start && \
sudo docker tag anomzone:prod registry.heroku.com/anomzone/web && \
sudo docker push registry.heroku.com/anomzone/web && \
heroku container:release web -a anomzone

## Postgres local setup

sudo -u postgres psql
ALTER USER postgres PASSWORD '1';

## Run Angular in dev server in mobile

ip a
find '''up default qlen 1000'''
ip address '''inet 192.168.1.72 '''
ng serve --host 192.168.1.72

## Updating Git

git remote add origin https://github.com/thesoundfromthesky/anomzone-nestjs.git
git remote -v
git log --oneline
git add . && /
git commit -m "first commit" && /
git push origin
