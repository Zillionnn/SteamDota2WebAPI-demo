var express = require('express');
var router = express.Router();
var request=require('request');
let CONSTANTS=require('../Constants/constant');
var logger = require('logger').createLogger('./log/gameItems.log'); // logs to a file

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

var  GetGameItems="http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key="+CONSTANTS.key+"&language=zh";


router.get('/getGameItems',function (req, res, next) {
    console.log("getHeroes");
    request(GetGameItems,function (err, data) {
        if(err){
            console.log(err);
        }else{
            logger.info(data.body);
            res.send(data.body);
        }
    })
});

module.exports = router;
