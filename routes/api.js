var router = require('express').Router(),
    target = require('../models/target');

var COLLECTION = 'target',
    SUCCESS = '200',
    ERROR = '500';

// Create
router.post('/target', function (req, res) {

    target.add(req.db, req.body, function (result) {

        res.jsonp(result);
    });
});

// Update
router.post('/target/:id', function (req, res) {

    target.modify(req.db, req.params.id, req.body, function (result) {

        res.jsonp(result);
    });
});

// Read
router.get('/target/', function (req, res) {

    target.get(req.db, function (result) {

        res.jsonp(result);
    });
});



// Delete
router.delete('/target/:id', function (req, res) {

    target.remove(req.db, req.params.id, function (result) {

        res.jsonp(result);
    });

});

module.exports = router;