const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const bodyParser = require('body-parser');
const collectionName = db.state.collection;

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/new_user', function(req, res) {
    const collection = db.get().collection(collectionName);
    collection.insertOne(req.body, function(err, post) {
        if (err){
            res.send({
                message: 'This username has existed.'
            })
        } else {
            res.send(post);
        }
    });
});

module.exports = router;
