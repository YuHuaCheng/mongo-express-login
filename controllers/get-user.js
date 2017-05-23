const { ID, PASSWORD, SALT } = require('./index');

const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const hashPassword = require('../models/salt_hash_password');
const cors = require('cors');

const collectionName = db.state.collection;
const getSaltHash = hashPassword.sha512;

// CORS
router.use(cors());
router.options('*', cors());


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
    const noMatch = function(res){
        return res.send({
            success: false,
            username: null
        })
    };

    collection.findOne({
        [ID]: userId
    }, function(err, record) {
        if (err) {
            console.log(err);
        } else {
            if (record) {
                const storedSalt = record[PASSWORD][SALT];
                const hashSaltPassword = getSaltHash(password, storedSalt);
                if (JSON.stringify(record[PASSWORD]) === JSON.stringify(hashSaltPassword)) {
                    return res.send({
                        success: true,
                        username: userId
                    })
                } else {
                    noMatch(res)
                }
            }
            else {
                noMatch(res)
            }
        }
    })
});

module.exports = router;
