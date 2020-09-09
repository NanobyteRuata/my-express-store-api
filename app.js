const express = require('express');
const product_route = require('./lib/routes/product_route')
const category_route = require('./lib/routes/category_route')
const brand_route = require('./lib/routes/brand_route')
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

app.use('/api/products', product_route);
app.use('/api/categories', category_route);
app.use('/api/brands', brand_route);

app.listen(port, () => {
  console.log(`MyStore app listening at http://localhost:${port}`);
});