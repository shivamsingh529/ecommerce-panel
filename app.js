// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed", err));


// Routes
app.get('/', (req, res) => {
    res.render('form'); // Render the form
});

app.post('/add-product', async (req, res) => {
    try {
        const { name, price, description, category, imageUrl } = req.body;
        const product = new Product({ name, price, description, category, imageUrl });
        await product.save();
        res.send('Product added successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to add product');
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
