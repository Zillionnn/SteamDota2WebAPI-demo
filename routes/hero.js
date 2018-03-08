var express = require('express');
var router = express.Router();
var request=require('request');
let CONSTANTS=require('../Constants/constant');
var logger = require('logger').createLogger('./log/hero.log'); // logs to a file

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var  getHeroes='http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key='+CONSTANTS.key+"&&language=zh";


router.get('/getHeroes',function (req, res, next) {
  console.log("getHeroes");
    request(getHeroes,function (err, data) {
        if(err){
          console.log(err);
        }else{
          logger.info(data.body);
          res.send(data.body);
        }
    })
});

module.exports = router;
