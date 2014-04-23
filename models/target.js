var target;

var ObjectID = require('mongodb').ObjectID,
    _ = require('underscore');

var COLLECTION = 'target',
    SUCCESS = 200,
    ERROR = 500;

var scheme;

scheme = {
    name: '',
    url: '',
    inspect: '',
    interval: 60,
    viewport: '768,1024',
    description: '',
    userAgent: ''
};

target = {
    add: function (db, body, callback) {

        var ret, entity;

        ret = {
            code: SUCCESS,
            message: 'ok'
        };

        entity = JSON.parse(JSON.stringify(scheme));
        entity = _.extend(entity, body || {});

        db.get(COLLECTION).insert(entity, function (err, docs) {

            if (err) {
                ret.code = err.code ? err.code : ERROR;
                ret.message = '[' + err.name + '] ' + err.err;
            }
            if (callback && typeof callback == 'function') {
                callback(ret);
            }
        });

    },
    get: function (db, callback) {

        var ret = {
            code: SUCCESS,
            message: 'ok'
        };

        db.get(COLLECTION).find({}, {}, function (err, docs) {

            if (err) {
                ret.code = err.code ? err.code : ERROR;
                ret.message = '[' + err.name + '] ' + err.err;
            } else {
                ret.result = {
                    targetList: docs
                };
            }
            if (callback && typeof callback == 'function') {
                callback(ret);
            }
        });
    },
    modify: function (db, id, body, callback) {

        var ret, entity;

        ret = {
            code: SUCCESS,
            message: 'ok'
        };

        entity = JSON.parse(JSON.stringify(scheme));
        entity = _.extend(entity, body || {});
        delete entity._id;

        db.get(COLLECTION).update({
            _id: new ObjectID.createFromHexString(id)
        }, entity, function (err, docs) {

            if (err) {
                ret.code = err.code ? err.code : ERROR;
                ret.message = '[' + err.name + '] ' + err.err;
            }
            if (callback && typeof callback == 'function') {
                callback(ret);
            }
        });
    },
    remove: function (db, id, callback) {

        var ret = {
            code: SUCCESS,
            message: 'ok'
        };

        db.get(COLLECTION).remove({
            _id: new ObjectID.createFromHexString(id)
        }, function (err, docs) {

            if (err) {
                ret.code = err.code ? err.code : ERROR;
                ret.message = '[' + err.name + '] ' + err.err;
            }
            if (callback && typeof callback == 'function') {
                callback(ret);
            }
        });
    }
};

module.exports = target;