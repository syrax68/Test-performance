//routes.js
//initialize express router
let router = require('express').Router();
var webcastController = require('../webcast/webcast.controller');
//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

router.route('/webcast')
    .get(webcastController.index)
    .post(webcastController.add);

router.route('/webcast/:webcast_id')
    .put(webcastController.update)
    .get(webcastController.view)
//Export API router
module.exports = router;