var express = require('express');
var router = express.Router();
var web3Service = require('../controllers/web3Service');

/* GET home page. */
router.get('/', function(req, res, next) {
    web3Service.getData().then(data => {
        console.log("Dento del contoller", data);
        res.render('contract', { title: 'Dashboard Smart Contract', data: data });
    }).catch(err => {
        res.render('error');
    });
});

router.get('/keccak256', function(req, res, next) {
    var str = web3Service.keccak256(req.query.str);
    res.json({
        code:str
    });
});

router.post('/simulate', function(req, res, next) {
    console.log(req.body);

    web3Service.simulateVoting(req.body.account, req.body.political).then(data => {
        console.log(data);
        res.json({
            status:true
        });
    }).catch(err => {

        console.log("Error del tipo: " + err);

        if(err === 1) {
            // Expiration date
            res.status(500).json({
                error: "Expirate date"
            });
        } else {
            res.status(500).json({
                error: err.message
            });
        }
    });


});

module.exports = router;
