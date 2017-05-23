const { ID, PASSWORD } = require('./index');

const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const hashPassword = require('../models/salt_hash_password');
const bodyParser = require('body-parser');
const cors = require('cors');

const collectionName = db.state.collection;
const createSaltHash = hashPassword.newSaltHashPassword;

// CORS
router.use(cors());
router.options('*', cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/new_user', function(req, res) {
    if(req.body[ID] === "" || req.body[ID] === undefined){
        res.send({
            message: 'Please specify username.',
            username: null,
            success: false
        });
    } else {
        const collection = db.get().collection(collectionName);
        const requestBody = req.body;
        const hashedRequest = {
            [ID]: requestBody[ID],
            [PASSWORD]: createSaltHash(requestBody[PASSWORD])
        };

        collection.insertOne(hashedRequest, function (err) {
            if (err) {
                res.send({
                    message: 'This username has existed.',
                    username: requestBody[ID],
                    success: false
                })
            } else {
                res.send({
                    message: 'success!',
                    username: requestBody[ID],
                    success: true
                });
            }
        });
    }
});

module.exports = router;
