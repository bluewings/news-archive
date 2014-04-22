var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {

    res.render('admin/index', {
        title: 'test',
        stylesheets: ['/stylesheets/news-archive.css'],
        javascripts: [
            '/javascripts/main.js']
    });
});

router.get('/api/target/getList.json', function (req, res) {

    /*var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });*/	
    res.jsonp({
    	wow: '111'
    });
});

module.exports = router;