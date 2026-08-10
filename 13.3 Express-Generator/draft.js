const fs = require("fs");

setTimeout(() => console.log("Hello from timer-01"));

setImmediate(() => console.log("Hello from Immediate Function.-02"));

//console.log("Hello from Top-Level");
fs.readFile("./data.json", (err, data) => {
  if (err) {
    // handle error
    console.log(err);
    return;
  }
  // no errors, process data
  console.log(data);
});
