var router = require('express').Router(),
    target = require('../models/target'),
    config = require('../models/config');

var SUCCESS = 200,
    ERROR = 200;

// TARGET - Create
router.post('/target', function (req, res) {

    target.add(req.db, req.body, function (result) {

        res.jsonp(result);
    });
});

// TARGET - Update
router.post('/target/:id', function (req, res) {

    target.modify(req.db, req.params.id, req.body, function (result) {

        res.jsonp(result);
    });
});

// TARGET - Read
router.get('/target', function (req, res) {

    target.get(req.db, function (result) {

        res.jsonp(result);
    });
});

// TARGET - Delete
router.delete('/target/:id', function (req, res) {

    target.remove(req.db, req.params.id, function (result) {

        res.jsonp(result);
    });
});

// Phones
router.get('/misc/phones', function (req, res) {

    res.jsonp({
        code: SUCCESS,
        message: 'ok',
        result: {
            phones: config.getPhones()
        }
    });
});

// Tablets
router.get('/misc/tablets', function (req, res) {

    res.jsonp({
        code: SUCCESS,
        message: 'ok',
        result: {
            phones: config.getTablets()
        }
    });
});

module.exports = router;