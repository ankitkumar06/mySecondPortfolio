


const express = require('express');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
// var indexRouter = require('./routes/newIndex');
var contactRoutes = require("./routes/systemContactData.js");
const cors = require("cors");
require("./connection");
const app = express();
// require('dotenv').config()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: ["http://192.168.2.128:5005", "http://localhost:5004", "http://localhost:3002","http://localhost:3000","http://localhost:3001","https://ankit-developer.netlify.app"], credentials: true, preflightContinue: false, exposedHeaders: ['SET-COOKIE'], methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
// app.use('/', indexRouter);
// app.use('/', contactRoutes);
app.use('/user',contactRoutes);
const PORT = process.env.PORT;

app.listen(PORT || 8000, () => {
    console.log("Server Running on port :", PORT);
});
// app.use("/contact", contactRoutes);

module.exports = app;
