const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');

const collectionName = db.state.collection;

router.get('/all_users', function(req, res) {
    const collection = db.get().collection(collectionName);

    collection.find().toArray(function(err, docs) {
        return res.json(docs)
    })
});

module.exports = router;

router.get('/find_user/:user_id', function(req, res) {
    const collection = db.get().collection(collectionName);
    const userId = req.params.user_id;
    collection.findOne({_id: userId}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            return res.json(doc)
        }
    })
});

module.exports = router;
