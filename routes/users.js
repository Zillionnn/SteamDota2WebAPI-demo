var express = require('express');
var router = express.Router();
var request=require('request');
var logger = require('logger').createLogger('./log/user.log'); // logs to a file


let CONSTANTS=require('../Constants/constant');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var  userSummeries='http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+CONSTANTS.key+'&steamids=76561198081585830';
var RecentlyPlayedGames='http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1?key='+CONSTANTS.key+'&steamid=76561198081585830';
let getMatchHistory='http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key='+CONSTANTS.key;
let getMatchDetail='http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key='+CONSTANTS.key+'&match_id=';


router.get('/userinfo',function (req, res, next) {
  //logger.info("userinfo");
    request(userSummeries,function (err, data) {
        if(err){
          logger.info(err);
        }else{
       //   logger.info(data.body);
          res.send(data.body);
        }
    })
});

router.get('/userRecentlyPlayedGames',function (req, res, next) {
    logger.info("userRecentlyPlayedGames");
    request(RecentlyPlayedGames,function (err, data) {
        if(err){
            logger.info(err);
        }else{
            //logger.info(data.body);
            res.send(data.body);
        }
    })
});


//查询的匹配历史
router.post('/getMatchHistory',function (req, res, next) {
    logger.info("getMatchHistory>>");
    let hero_id=parseInt(req.body.hero_id);

    let    min_players=parseInt(req.body.min_players);
        let account_id=parseInt(req.body.account_id);
        let start_at_match_id=parseInt(req.body.start_at_match_id);

  let matches_requested=parseInt(req.body.matches_requested);
    let url=getMatchHistory+'&account_id='+account_id+'&hero_id='+hero_id+'&matches_requested='+matches_requested+'&min_players='+min_players+'&start_at_match_id='+start_at_match_id;
    logger.info(req.body);
    logger.warn("getMatchHistoryByHero url>>",url);
    request(url,function (err, data) {
        if(err){
            logger.info(err);
        }else{
         //  logger.info(data.body);
            res.send(data.body);
        }
    })
});



router.post('/getMatchDetail',function (req, res, next) {
    logger.info("get match detail");
    logger.info(req.body);
    let match_id=parseInt(req.body.match_id);
    let url=getMatchDetail+match_id;
    logger.info(url);
    request(url,function (err,data) {
        if(err){
            logger.info(err);
        }else{
           // logger.info(data.body);
            res.send(data.body);
        }

    });
});
module.exports = router;
