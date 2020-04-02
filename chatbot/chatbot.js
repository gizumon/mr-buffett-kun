
let Chatbot = function() {
    this.chatbots = new Map();
    // let variables = new Map();  

    this.today = new Date();
    this.todayStr = this.today.getMonth() + '月' + this.today.getDate() + '日';
    /**
     * variables {key: [value]}
     */
    // variables.set("hi", ["こんにちわ"])

    /**
     * Chatbot {key: [value]}
     */
    this.chatbots.set("こんにちわ", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"]);
    this.chatbots.set("こんにちは", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"]);
    this.chatbots.set("はろー", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ👴"]);
    this.chatbots.set("こんばんわ", ["ふぉっふぉっふぉ。こんばんわ👴"]);
    this.chatbots.set("こんばんは", ["ふぉっふぉっふぉ。こんばんわ👴"]);
    this.chatbots.set("やあ", ["ふぉっふぉっふぉ。やあやあ👴"]);
    this.chatbots.set("元気", ["腰が痛いぞ。。", "そこそこかのう。", "すこぶる元気じゃぞい"]);
    this.chatbots.set("疲れた", ["お疲れお疲れ👴", "わしもじゃ"]);
    this.chatbots.set("何日", [`${this.todayStr}じゃろ?`]);
}

/**
 * Get reply from chatbot (random)
 * @param {*} key
 * @return {string} 
 */
Chatbot.prototype.getReply = function(str) {
    let array = [];
    this.chatbots.forEach((vals, key) => {
        if (str.includes(key)){ array = vals;};
    });
    if (Array.isArray(array)) {
        return array[getRandomInt(array.length)];       
    }
}

/**
 * Incluedes key in search string
 * @param {*} str
 * @return {boolean} 
 */
Chatbot.prototype.has = function(str) {
    let hasKey = false;
    this.chatbots.forEach((val, key) => {
        if (str.includes(key)){ hasKey = true;};
    });
    return hasKey;
}

/**
 * Get random index value from 0 to max - 1
 * @param {*} max 
 */
getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Chatbot;
