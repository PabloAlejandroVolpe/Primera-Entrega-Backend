const express = require('express');
const app = express();
const port = 8080;

// Array de productos

const products = require('./utilities/products.json');

// Array de carros de compra

const carts = require('./utilities/carts.json')

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  res.send(products);
});

// Ruta para obtener un producto por su ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) res.status(404).send('Product not found');
  res.send(product);
});

// Ruta para obtener todos los carros de compra
app.get('/carts', (req, res) => {
  res.send(carts);
});

// Ruta para obtener un carro de compra por su ID
app.get('/carts/:id', (req, res) => {
  const cart = carts.find(c => c.id === parseInt(req.params.id));
  if (!cart) res.status(404).send('Cart not found');
  res.send(cart);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Ruta DELETE para eliminar un producto por ID
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  
  // Buscar el índice del producto en el array por ID
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    // Eliminar el producto del array
    products.splice(index, 1);
    res.send(`Producto con ID ${id} eliminado.`);
  } else {
    res.status(404).send(`Producto con ID ${id} no encontrado.`);
  }
});


// Ruta PUT para actualizar un producto por ID
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  
  // Buscar el índice del producto en el array por ID
  const index = products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    // Actualizar el producto en el array
    products[index] = { id, title, price };
    res.send(`Producto con ID ${id} actualizado.`);
  } else {
    res.status(404).send(`Producto con ID ${id} no encontrado.`);
  }
});


// Ruta POST para crear un nuevo producto
app.post('/products', (req, res) => {
  const { title, price } = req.body;
  
  // Generar un nuevo ID para el producto
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  
  // Crear el objeto del nuevo producto
  const newProduct = { id, title, price };
  
  // Agregar el nuevo producto al array
  products.push(newProduct);
  
  res.send(`Producto con ID ${id} creado.`);
});
