 const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors');

const { createStudent, readall } = require('./controllers/studentController');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('./controllers/productController');

app.use(express.json());
app.use(cors('https://fakestoreapi.com/products'));

mongoose.connect('mongodb+srv://nithinmaddu13:Maddu@cluster0.mzdenph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.end("hi from express");
});


// Student APIs
app.post('/api/students', createStudent);
app.get('/api/students', readall);

// Product APIs
app.post('/api/products', createProduct);
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.listen(port, () => {
  console.log('server is running');
});
