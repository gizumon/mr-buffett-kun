const Chatbot = require('../chatbot/chatbot');
const chatbot = new Chatbot();
const conf = require('config');

const express = require('express');
const router = express.Router();

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};

const line = require('@line/bot-sdk');
const client = new line.Client(config);

/* GET home page. */
console.log(config);
router.post('/', line.middleware(config), (req, res) => {
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

  let message = '';
  if(chatbot.has(event.message.text)){
    message = chatbot.getReply(event.message.text); //待ってねってメッセージだけ先に処理
    // getNodeVer(event.source.userId); //スクレイピング処理が終わったらプッシュメッセージ
  } else {
    message = 'はて？？';
  }
  console.log('send message', message);
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
