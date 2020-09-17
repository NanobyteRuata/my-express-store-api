const express = require('express');
const router = require('./lib/routes/router');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./lib/models/user_model');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mystore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    }
    res.locals.loggedInUser = await User.findById(userId); next();
  } else {
    next();
  }
});

app.use('/api/', router);

app.listen(port, () => {
  console.log(`MyStore app listening at http://localhost:${port}`);
});