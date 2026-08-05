const fs = require("fs");

/* fs.writeFileSync("./hello.txt", "Hello NODE-JS World", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File written successfully");
  }
});

fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
}); */

console.log("1..");
fs.readFile("./hello.txt", "utf-8", (err, results) => {
  console.log(results);
});
//console.log(data);
console.log("2..");
