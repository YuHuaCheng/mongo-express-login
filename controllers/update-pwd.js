const express = require('express');
const router = express.Router();
const db = require('../models/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const collectionName = db.state.collection;

// CORS
router.use(cors());
router.options('*', cors());

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/update_pwd', function(req, res) {
    const collection = db.get().collection(collectionName);
    const userId = req.body._id;
    const newPwd = req.body.password;

    collection.updateOne({_id: userId}, {$set:{password: newPwd}}, function(err, post) {
        if (err){
            console.log(err)
        } else if (post.matchedCount === 0) {
            res.send({
                message: `Username ${userId} not found.`
            });
        } else {
            res.send({
                message: 'Success'
            })
        }
    });
});

module.exports = router;
