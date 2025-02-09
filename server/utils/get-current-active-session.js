const { initDB: db } = require('../db/db.js');


function getCurrentActiveSession() {
  const metadata = db.data.metadata;
  if (!metadata.currentSessionId) {
    return null;
  }
  return metadata.currentSessionId;
}

module.exports =  getCurrentActiveSession