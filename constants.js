const path = require('path');

const DATA_SOURCE_LIST = {
  DATABASE: 0,
  PROXY: 1,
};
const DATA_SOURCE = DATA_SOURCE_LIST.PROXY;

const API_URL = 'http://mysla.dlink.ru:8090';
const PUBLIC_PATH = path.join(__dirname, 'public');
const VIEWS_PATH = path.join(__dirname, 'views');

module.exports = {
  API_URL,
  PUBLIC_PATH,
  VIEWS_PATH,
  DATA_SOURCE,
  DATA_SOURCE_LIST,
};
