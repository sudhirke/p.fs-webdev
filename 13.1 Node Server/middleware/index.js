const fs = require("fs");

function logRequest(filename) {
  return (req, res, next) => {
    const logEntry = `\n${req.method} ${req.url} - ${new Date().toISOString()}`;
    fs.appendFile(filename, logEntry, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
    next();
  };
}

module.exports = { logRequest };
