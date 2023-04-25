const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userApi = require('./User/User.api');
const Product = require('./products/products');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.6:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Use body parser to parse incoming requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://user1:root@cluster0.oldheqr.mongodb.net/miniproject_petAdoption').then(() => {
  console.log('Connected to DB');
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

