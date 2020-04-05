const _ = require('underscore');
const axios = require('axios').default;
const conf = require('config');

let StockApi = function() {
    this.uri = conf.stock.uri;
}

/**
 * Get reply from chatbot (random)
 * @param {*} key
 * @return {string} 
 */
StockApi.prototype.getDetail = function(code) {
    axios.get(this.uri, {
      params: {
        action: 'detail',
        param: code
      }
    });
}

StockApi.prototype.getAll = function() {
    axios.get(this.uri, {
      params: {
        action: 'all'
      }
    });
}

StockApi.prototype.getSummary = function(code = 'all') {
    axios.get(this.uri, {
      params: {
        action: 'summary',
        param: code
      }
    });
}

module.exports = StockApi;
