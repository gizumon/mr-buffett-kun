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
        dayliy: ['dayliy', 'でいりー', 'デイリー', '本日の株', '今日', '日報'],
        all: ['all', '全部', '全て'],
        detail: [], // 数値4桁で別判定
        summary: ['summary', 'まとめ', 'さまりー', 'サマリー'],
        codes: ['codes', '銘柄', '一覧', '一覧', 'コード', '何持ってる', 'なに持ってる？', 'なにもってる？'],
        fiscalPeriod: ['fiscalPeriod', '決算'],
        help: ['help', 'ヘルプ', 'へるぷ', 'どうやって', '使い方', 'つかいかた', 'How']
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

    this.helpText = `ふぉっふぉっふぉ。こんにちわ👴\n` +
                    `使い方を教えるんじゃ。\n` + 
                    `わしができることは今のところこれだけじゃなあ。\n` +
                    `①日報だせちゃう (日報)\n` + 
                    `②買ってる全株だせちゃう (全部)\n` + 
                    `③各株価の詳細だせちゃう([銘柄code])\n` + 
                    `④買ってる銘柄一覧だせちゃう (銘柄)\n` + 
                    `⑤買ってる株の決算日一覧だせちゃう (決算)\n` + 
                    `⑥買ってる株の集計だせちゃう(サマリー)\n`;
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
Chatbot.prototype.functions = async function(str) {
    console.log(str);
    let results = [];
    const codeRegexp = /\d{4}/;
    const hasDetail = codeRegexp.test(str);
    const hasDayliy = this.triggers.dayliy.some((key) => str.includes(key));
    const hasAll = this.triggers.all.some((key) => str.includes(key));
    const hasSummary = this.triggers.summary.some((key) => str.includes(key));
    const hasCodes = this.triggers.codes.some((key) => str.includes(key));
    const hasFiscalPeriod = this.triggers.fiscalPeriod.some((key) => str.includes(key));
    const hasHelp = this.triggers.help.some((key) => str.includes(key));
    
    console.log(hasDetail, hasDayliy, hasAll, hasSummary, hasCodes);
    if (hasDetail) {
        const codes = codeRegexp.exec(str);
        results = await getDetail(codes[0]);
    } else if (hasDayliy) {
        results = await getDayliy();
    } else if (hasAll) {
        results = await getAll();
    } else if (hasSummary) {
        const codes = codeRegexp.exec(str);
        results = await getSummary(codes ? codes[0]: null);
    } else if (hasCodes) {
        results = await getCodes();
    } else if (hasFiscalPeriod) {
        results = await getFiscalPeriod();
    } else if (hasHelp) {
        results = [this.helpText];
    }
    console.log(results);
    if (_.isArray(results)) {
        message = results.join('\n');
    } else {
        message = results;
    }
    return message;
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
    }).catch((err) => {
        return ['失敗。。。']
    });
    console.log(message);
    return message;
}

let getDayliy = function() {
    return stockApi.getDayliy().then(res => {
        return res.data;
    }).catch((err) => {
        console.log('ERROR:', err);
        return ['失敗。。。', err.status, err.message]
    });
}

let getAll = function() {
    return stockApi.getAll().then(res => {
        return res.data;
    }).catch((err) => {
        return ['失敗。。。', err.status, err.message]
    });
}

let getSummary = function() {
    return stockApi.getSummary().then(res => {
        return res.data;
    }).catch((err) => {
        return ['失敗。。。', err.status, err.message]
    });
}

let getCodes = function() {
    return stockApi.getCodes().then(res => {
        return res.data;
    }).catch((err) => {
        return ['失敗。。。', err.status, err.message]
    });
}

let getFiscalPeriod = function() {
    return stockApi.getFiscalPeriod().then(res => {
        return res.data;
    }).catch((err) => {
        return ['失敗。。。', err.status, err.message]
    });
}

module.exports = Chatbot;
