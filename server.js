const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

const { createStudent, readall } = require('./controllers/studentController');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('./controllers/productController');
const { registerUser, loginUser } = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://nithinmaddu13:Maddu@cluster0.mzdenph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', authMiddleware, (req, res) => {
  res.send("Hi from Express");
});

app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

app.post('/api/students', createStudent);
app.get('/api/students', readall);

app.post('/api/products', authMiddleware, createProduct);
app.get('/api/products', authMiddleware, getAllProducts);
app.get('/api/products/:id', authMiddleware, getProductById);
app.put('/api/products/:id', authMiddleware, updateProduct);
app.delete('/api/products/:id', authMiddleware, deleteProduct);

// For React frontend (optional - production only)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
