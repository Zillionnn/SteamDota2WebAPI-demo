var express = require('express');
var router = express.Router();
var request=require('request');
let logger=require('logger').createLogger('user.log');


let CONSTANTS=require('../Constants/constant');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var  userSummeries='http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+CONSTANTS.key+'&steamids=76561198081585830';
var RecentlyPlayedGames='http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1?key='+CONSTANTS.key+'&steamid=76561198081585830';
let getMatchHistory='http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key='+CONSTANTS.key+'&account_id=76561198081585830&hero_id=74';
let getMatchDetail='http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key='+CONSTANTS.key+'&match_id=';


router.get('/userinfo',function (req, res, next) {
  console.log("userinfo");
    request(userSummeries,function (err, data) {
        if(err){
          console.log(err);
        }else{
          console.log(data.body);
          res.send(data.body);
        }
    })
});

router.get('/userRecentlyPlayedGames',function (req, res, next) {
    console.log("userRecentlyPlayedGames");
    request(RecentlyPlayedGames,function (err, data) {
        if(err){
            console.log(err);
        }else{
            console.log(data.body);
            res.send(data.body);
        }
    })
});


//查询AM的匹配历史
router.get('/getMatchHistoryByHero',function (req, res, next) {
    console.log("getMatchHistoryByHeroAntimage");
    request(getMatchHistory,function (err, data) {
        if(err){
            console.log(err);
        }else{
           // console.log(data.body);
            res.send(data.body);
        }
    })
});



router.post('/getMatchDetail',function (req, res, next) {
    console.log("get match detail");
    console.log(req.body);
    let match_id=parseInt(req.body.match_id);
    let url=getMatchDetail+match_id;
    console.log(url);
    request(url,function (err,data) {
        if(err){
            console.log(err);
        }else{
            console.log(data.body);
            res.send(data.body);
        }

    });
});
module.exports = router;
