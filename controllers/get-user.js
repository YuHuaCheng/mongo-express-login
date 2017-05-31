const { ID, PASSWORD, SALT } = require('./index');

const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const hashPassword = require('../models/salt_hash_password');
const bodyParser = require('body-parser');
const cors = require('cors');

const collectionName = db.state.collection;
const getSaltHash = hashPassword.sha512;

// CORS
router.use(cors());
router.options('*', cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/all_users', function(req, res) {
    const collection = db.get().collection(collectionName);

    collection.find().toArray(function(err, docs) {
        return res.json(docs)
    })
});

module.exports = router;

router.post('/find_user', function(req, res) {
    const collection = db.get().collection(collectionName);
    const userId = req.body[ID];
    const password = req.body[PASSWORD];
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
