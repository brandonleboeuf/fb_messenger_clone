# create

config/config.json
config/env.json

# instal

npm install -g sequelize-cli
npm i -g pg

# run

psql >

## NOTE by default, psql will use assume that the default username and datagbase name are the same as your machines currently logged in user

## use the bellow commands to create that matching username and database name

## replace all occurrences of 'username'

psql -U postgres;
CREATE USER username WITH ENCRYPTED PASSWORD 'pw';
ALTER USER username WITH SUPERUSER;
CREATE DATABASE username;

CREATE DATABASE chat;
sequelize db:migrate
