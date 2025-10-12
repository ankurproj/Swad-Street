//Create server
const exprss = require('express');
// const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const app = exprss(); 
app.use(exprss.json());
app.get("/", (req, res) => {
  res.send('Hello World!');
})
app.use('/api/auth', authRoutes);
module.exports = app;