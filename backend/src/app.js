//Create server
const exprss = require('express');
const app = exprss();

app.get("/", (req, res) => {
  res.send('Hello World!');
})
module.exports = app;