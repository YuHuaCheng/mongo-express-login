const express = require('express');
const app = express();
const db = require('./models/mongodb');
const dbUrl = 'mongodb://localhost:27017/auth';

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