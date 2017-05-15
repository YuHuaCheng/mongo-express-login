const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const bodyParser = require('body-parser');
const collectionName = db.state.collection;

// CORS
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/new_user', function(req, res) {
    if(req.body._id === "" || req.body._id === undefined){
        res.send({
            message: 'Please specify _id.',
            success: false
        });
    } else {
        const collection = db.get().collection(collectionName);
        collection.insertOne(req.body, function (err) {
            if (err) {
                res.send({
                    message: 'This username has existed.',
                    success: false
                })
            } else {
                res.send({
                    success: true
                });
            }
        });
    }
});

module.exports = router;
