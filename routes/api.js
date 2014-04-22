var router = require('express').express.Router(),
	target = require('target'),
    ObjectID = require('mongodb').ObjectID;

var COLLECTION = 'target',
    SUCCESS = '200',
    ERROR = '500';

router.post('/target', function (req, res) {

    var db = req.db,
        collection = db.get(COLLECTION),
        entity;

    entity = {
        url: req.body.url,
        inspect: req.body.inspect,
        interval: parseInt(req.body.interval ? req.body.interval : 60, 10)
    };

    if (!entity.url) {
        res.jsonp({
            code: ERROR,
            message: 'url is required.'
        });
    } else if (!entity.inspect) {
        res.jsonp({
            code: ERROR,
            message: 'inspect is required.'
        });
    }

    collection.insert(entity, function (err, docs) {

        if (err) {
            res.jsonp({
                code: ERROR,
                message: err
            });
        } else {
            res.jsonp({
                code: SUCCESS,
                message: 'ok'
            });
        }
    });

});

router.get('/target/getList.json', function (req, res) {

    var db = req.db,
        collection = db.get(COLLECTION);

    collection.find({}, {}, function (err, docs) {

        res.jsonp({
            code: SUCCESS,
            message: 'ok',
            result: {
                targetList: docs
            }
        });
    });
});

router.delete('/target/:id', function (req, res) {

    var db = req.db,
        collection = db.get(COLLECTION),
        entity;

        //console.log(req.params.id);
	//{_id: employee_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)}

	try {
    collection.remove({
    	_id: new ObjectID.createFromHexString(req.params.id)
    }, function (err, docs) {

        if (err) {
            res.jsonp({
                code: ERROR,
                message: err
            });
        } else {
            res.jsonp({
                code: SUCCESS,
                message: 'ok'
            });
        }
    });  
    } catch (err) {
    	console.log(err);
    }      

        //console.log(JSON.stringify(req));


});

module.exports = router;