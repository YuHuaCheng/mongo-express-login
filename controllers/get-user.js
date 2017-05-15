const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');

const collectionName = db.state.collection;

// // CORS
// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.get('/all_users', function(req, res) {
    const collection = db.get().collection(collectionName);

    collection.find().toArray(function(err, docs) {
        return res.json(docs)
    })
});

module.exports = router;

router.get('/find_user/:user_id/:password', function(req, res) {
    const collection = db.get().collection(collectionName);
    const userId = req.params.user_id;
    const password = req.params.password;
    collection.findOne({_id: userId, password: password}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc) {
                return res.send({
                    success: true,
                    username: userId
                })
            }
            else {
                return res.send({
                    success: false,
                    username: null
                })
            }
        }
    })
});

module.exports = router;
