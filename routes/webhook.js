const Chatbot = require('../chatbot/chatbot');
const chatbot = new Chatbot();
const conf = require('config');
const _ = require('underscore');

const express = require('express');
const router = express.Router();

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN || conf.line.channelAccessToken,
  channelSecret: process.env.SECRET_KEY || conf.line.channelSecret
};

const line = require('@line/bot-sdk');
const client = new line.Client(config);

/* GET home page. */
console.log(config);
// router.post('/', line.middleware(config), (req, res) => {
router.post('/', (req, res) => {
  console.log(req.body.events);
  req.body.events.forEach(event => {
    handleEvent(event).then((result) => {
      console.log(result);
      res.json(result)
    })
    .catch((err) => {
       console.log(`ERROR: ${err.status} ${err.message}`);
       res.json(err);
    });
  });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  let reply;
  let message = event.message.text;
  let result = await chatbot.functions(message);
  console.log('INFO: Get reply from chatbot functions', reply);

  if (!_.isEmpty(result)) {
    // リストの場合、最初のもののみ表示
    reply = _.isArray(result) ? result[0] : result;
  } else if(chatbot.has(message)) {
    reply = chatbot.getReply(message);
  } else {
    reply = 'はて？？';
  }

  console.log('send message: \n', reply);
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: reply
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
