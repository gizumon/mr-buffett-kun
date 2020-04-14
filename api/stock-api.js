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
StockApi.prototype.getDayliy = function(code) {
  return axios.get(this.uri, {
    params: {
      action: 'dayliyReport',
      param: code
    }
  });
}

/**
 * Get reply from chatbot (random)
 * @param {*} key
 * @return {string} 
 */
StockApi.prototype.getDetail = function(code) {
  return axios.get(this.uri, {
    params: {
      action: 'detail',
      param: code
    }
  });
}

StockApi.prototype.getAll = function() {
  return axios.get(this.uri, {
    params: {
      action: 'all'
    }
  });
}

StockApi.prototype.getSummary = function(code = 'all') {
  return axios.get(this.uri, {
    params: {
      action: 'summary',
      param: code
    }
  });
}

StockApi.prototype.getCodes = function() {
  return axios.get(this.uri, {
    params: {
      action: 'codes'
    }
  });
}

StockApi.prototype.getFiscalPeriod = function() {
  return axios.get(this.uri, {
    params: {
      action: 'fiscalPeriod'
    }
  });
}

module.exports = StockApi;
