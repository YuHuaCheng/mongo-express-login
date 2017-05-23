# MongoDB Login Info Express App
 
#### This is a MongoDB express app that provides GET/POST/PUT method, to manipulate user login information, like username (_id) and password.    
 
### Getting Started

#### 1. Download mongodb image from 
    
https://github.com/dockerfile/mongodb

#### 2. Run w/ persistent/shared directory

    docker run -d -p 27017:27017 -v <db-dir>:/data/db dockerfile/mongodb
        
#### 3. Start mongodb express app
    npm install -g nodemon
    npm install
    npm start
    
### Usage

##### By default, the app listens on ` localhost:3000`. Here are some api you can perform

#### 1. Show all the users info

    http://localhost:3000/login/all_users
    
#### 2. User info lookup

    http://localhost:3000/login/find_user/:user_id/:password