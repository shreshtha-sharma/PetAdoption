const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userApi = require('./User/User.api');
const Product = require('./products/products');
const cors = require('cors'); // Import the cors package

app.use(cors()); // Enable CORS for all routes run 

const router = express.Router();


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

// Express application
app.use("/products", router);




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

// Get product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ p_id: id });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    // Find the product by ID and update it
    const updatedProduct = await Product.findOneAndUpdate({ p_id: id }, payload, {
      new: true, // Return the updated product
    });

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

