var express = require('express');
var router = express.Router();
var web3Service = require('../controllers/web3Service');

/* GET home page. */
router.get('/', function(req, res, next) {
    web3Service.getData().then(data => {
        console.log("Dento del contoller", data);
        res.render('index', { title: 'Dashboard Smart Contract', data: data });
    }).catch(err => {
        res.render('error');
    });



});

module.exports = router;
