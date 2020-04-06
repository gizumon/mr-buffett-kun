const _ = require('underscore');
const StockApi = require('../api/stock-api');
const stockApi = new StockApi();

let Chatbot = function() {
    // this.chatbots = new Map();
    this.chatbots = {};
    // let variables = new Map();  

    this.today = new Date();
    this.todayStr = this.today.getMonth() + '月' + this.today.getDate() + '日';

    this.triggers = {
        dayliy: ['dayliy', '今日の株'],
        all: ['all', '全部'],
        summary: ['summary', 'まとめ']
    }
    /**
     * chatbots {key: [value]}
     */
    this.chatbots = {
        "こんにちわ": ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"],
        "こんにちは": ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"],
        "はろー": ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ👴"],
        "こんばんわ": ["ふぉっふぉっふぉ。こんばんわ👴"],
        "こんばんは": ["ふぉっふぉっふぉ。こんばんわ👴"],
        "やあ": ["ふぉっふぉっふぉ。やあやあ👴"],
        "元気": ["腰が痛いぞ。。", "そこそこかのう。", "すこぶる元気じゃぞい"],
        "疲れた": ["お疲れお疲れ👴", "わしもじゃ"],
        "何日": [`${this.todayStr}じゃろ?`]
    };

    /**
     * Chatbot {key: [value]}
     */
    // this.chatbots.set("こんにちわ", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"]);
    // this.chatbots.set("こんにちは", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ"]);
    // this.chatbots.set("はろー", ["ふぉっふぉっふぉ。こんにちわ👴", "やあやあ👴"]);
    // this.chatbots.set("こんばんわ", ["ふぉっふぉっふぉ。こんばんわ👴"]);
    // this.chatbots.set("こんばんは", ["ふぉっふぉっふぉ。こんばんわ👴"]);
    // this.chatbots.set("やあ", ["ふぉっふぉっふぉ。やあやあ👴"]);
    // this.chatbots.set("元気", ["腰が痛いぞ。。", "そこそこかのう。", "すこぶる元気じゃぞい"]);
    // this.chatbots.set("疲れた", ["お疲れお疲れ👴", "わしもじゃ"]);
    // this.chatbots.set("何日", [`${this.todayStr}じゃろ?`]);
}

/**
 * Get reply from chatbot (random)
 * @param {*} key
 * @return {string} 
 */
Chatbot.prototype.getReply = function(str) {
    let array = [];
    Object.keys(this.chatbots).forEach((key) => {
        if (str.includes(key)){ array = this.chatbots[key];};
    });
    if (_.isArray(array)) {
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
    Object.keys(this.chatbots).forEach((key) => {
        if (str.includes(key)){ hasKey = true;};
    });
    return hasKey;
}

/**
 * 
 */
Chatbot.prototype.functions = function(str) {
    console.log(str);
    let hasDetail = (str.search(/[0-9]{4}/) > 0);
    let hasDayliy = this.triggers.dayliy.some((key) => str.includes(key));
    let hasAll = this.triggers.all.some((key) => str.includes(key));
    let hasSummary = this.triggers.summary.some((key) => str.includes(key));
    
    console.log(hasDetail, hasDayliy, hasAll, hasSummary);
    if (hasDetail) {
        const codes = str.match(/\d{4}/);
        const message = getDetail(codes[0]);
        return message;
    } else if (hasDayliy) {
        const message = getDayliy();
        return message;
    } else if (hasAll) {
        const message = getAll();
        return message;
    } else if (hasSummary) {
        const message = getSummary();
        return message;
    }
    return '';
}

/**
 * Get random index value from 0 to max - 1
 * @param {*} max 
 */
let getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let getDetail = function(code) {
    const message = stockApi.getDetail(code).then(res => {
        return res.data;
    });
    console.log(message);
    return message;
}

let getDayliy = function() {
    const message = stockApi.getDayliy().then(res => {
        return res.data;
    });
    console.log(message);
    return message;
}

let getAll = function() {
    const message = stockApi.getAll().then(res => {
        return res.data;
    });
    console.log(message);
    return message;
}

let getSummary = function() {
    const message = stockApi.getAll().then(res => {
        return res.data;
    });
    console.log(message);
    return message;
}

module.exports = Chatbot;
