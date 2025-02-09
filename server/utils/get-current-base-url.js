const { initDB: db } = require('../db/db.js');
const getCurrentActiveSession = require('./get-current-active-session.js');

function getCurrentBaseUrl() {
  const currentActiveSessionId = getCurrentActiveSession();
  if (!currentActiveSession) {
    return null;
  }

  const currentActiveSession = db.data.session.find(s => s.id == currentActiveSessionId);
  if (!currentActiveSession || !currentActiveSession.baseUrl) {
    return null;
  }

  return currentActiveSession.baseUrl;
}

module.exports = getCurrentBaseUrl