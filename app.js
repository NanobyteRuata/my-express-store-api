const express = require('express');
const products_route = require('./lib/routes/product_route');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/mystore', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.use('/api/products', products_route);

app.listen(port, () => {
  console.log(`MyStore app listening at http://localhost:${port}`);
});