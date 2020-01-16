const rp = require('request-promise-native');

const { API_URL } = require('../constants');

async function proxyGet(token, uri, options = {}) {
  return await rp({
    method: 'GET',
    uri,
    headers: {
      'Token': token,
    },
  });
}

async function login(username, password) {
  const uri = `${API_URL}/login`;
  return await rp({
    method: 'POST',
    uri,
    body: { username, password },
    json: true,
  });
}

// Информация о данном устройстве из лога
async function getDeviceInfo(token, isPrev, mac, timestamp) {
  const paramPrev = isPrev ? '/prev' : '';
  const uri = `${API_URL}/info${paramPrev}/${mac}/${timestamp}`;
  return await proxyGet(token, uri);
}

// Общее количество устройств в базе.
async function getTotalDevicesInfo(token) {
  const uri = `${API_URL}/totalDevices`;
  return await proxyGet(token, uri);
}

// Общий список устройств с названием модели, версией прошивки и MAC-адресом.
async function getFirmwareInfo(token) {
  const uri = `${API_URL}/firmware`;
  return await proxyGet(token, uri);
}

// Информация об активных днях устройства.
async function getActiveDay(token, mac) {
  const uri = `${API_URL}/activeday/${mac}`;
  return await proxyGet(token, uri);
}

// Количество отчетов пришедших в последний час.
async function getLastHourLogs(token, timestamp) {
  const uri = `${API_URL}/logs/lasthour/${timestamp}`;
  return await proxyGet(token, uri);
}

// Информация о предыдущем/следующем логе.
// type = 'prev' | 'next'
async function getLogInfo(token, type, mac, timestamp) {
  const uri = `${API_URL}/logs/info/${type}/${mac}/${timestamp}`;
  return await proxyGet(token, uri);
}

// Список timestamp'ов, в которые прилетали логи от устройства за указанный день.
async function getTimestampsLogs(token, mac, day, month, year) {
  const uri = `${API_URL}/logs/timestamps/${mac}/${day}/${month}/${year}`;
  return await proxyGet(token, uri);
}


module.exports = {
  login,
  getDeviceInfo,
  getTotalDevicesInfo,
  getFirmwareInfo,
  getActiveDay,
  getLastHourLogs,
  getLogInfo,
  getTimestampsLogs,
};
