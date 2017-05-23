const express = require('express');
const app = express();
const db = require('./models/mongodb');

// In docker-compose.yml it will look up the pre-defined environment variable instead
const MONGODB_HOST = process.env.MONGODB_HOST ? process.env.MONGODB_HOST : 'localhost';
const dbUrl = `mongodb://${MONGODB_HOST}:27017/auth`;

// Routes
app.use('/login', require('./controllers/get-user'));
app.use('/create', require('./controllers/create-user'));
app.use('/update', require('./controllers/update-pwd'));


// Connect to Mongo on start
db.connect(dbUrl, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1)
    } else {
        app.listen(3000, function() {
            console.log('Listening on port 3000...')
        })
    }
});