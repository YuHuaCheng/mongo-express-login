const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null,
    collection: 'auth'
};

exports.state = state;

exports.connect = function(url, done) {
    if (state.db) return done();

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err);
        state.db = db;
        done()
    })
};

exports.get = function() {
    return state.db
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err) {
            state.db = null;
            state.mode = null;
            done(err)
        })
    }
};
