import Bot from '../chatbot/reply';
const conf = require('config');

const express = require('express');
const router = express.Router();

const config = {
  channelAccessToken: conf.line.ACCESS_TOKEN,
  channelSecret: conf.line.SECRET_KEY
};

const line = require('@line/bot-sdk');
const client = new line.Client(config);

/* GET home page. */
router.get('/', line.middleware(config), (req, res) => {
  // res.render('index', { title: 'Express' });
  console.log(req.body.events);
  Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let message = ''
  if(Bot.has(event.message.text)){
    message = Bot.get(event.message.text); //待ってねってメッセージだけ先に処理
    getNodeVer(event.source.userId); //スクレイピング処理が終わったらプッシュメッセージ
  }else{
    message = 'はて？？';
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: message
  });
}

// const getNodeVer = async (userId) => {
//     const res = await axios.get('http://weather.livedoor.com/forecast/webservice/json/v1?city=400040');
//     const item = res.data;

//     await client.pushMessage(userId, {
//         type: 'text',
//         text: item.description.text,
//     });
// }

module.exports = router;
