const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userApi = require('./User/User.api');
const Product = require('./products/products');

// Use body parser to parse incoming requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/miniproject_petAdoption').then(() => {
  console.log('Connected to DB');
});

// Mount the userApi router
app.use('/user', userApi);

// Define a GET route for products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Define a POST route for products
app.post('/products', async (req, res) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

