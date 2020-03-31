
let Chatbot = function() {
    this.chatbots = new Map();
    // let variables = new Map();  

    this.today = new Date();
    this.todayStr = this.today.toLocaleDateString();
    /**
     * variables {key: [value]}
     */
    // variables.set("hi", ["こんにちわ"])

    /**
     * Chatbot {key: [value]}
     */
    this.chatbots.set("こんにちわ", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"]);
    this.chatbots.set("こんばんわ", ["ふぉっふぉっふぉ。こんばんわ👴"]);
    this.chatbots.set("やあ", ["ふぉっふぉっふぉ。やあやあ👴"]);
    this.chatbots.set("今日はなんにち", [`${this.todayStr}日じゃろ?`]);
}

/**
 * Get reply from chatbot (random)
 * @param {*} key
 * @return {string} 
 */
Chatbot.prototype.getReply = function(str) {
    let array = [];
    this.chatbotschatbots.forEach((vals, key) => {
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
 * 
 * @param {*} max 
 */
getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = Chatbot;
