const express = require('express');
const app = express();
const port = 8080;

// Array de productos
const products = [
  { id: 1, title: 'product 1', price: 100, code: "P1", description: "description of product 1", stock: 12, category: "ropas", thumbnails:"image1.jpg", status: true},

  { id: 2, title: 'product 2', price: 200, code: "P2", description: "description of product 2", stock: 21, category: "ropas", thumbnails:"image2.jpg", status: true},

  { id: 3, title: 'product 3', price: 300, code: "P3", description: "description of product 3", stock: 5, category: "ropas", thumbnails:"image3.jpg", status: true},

  { id: 4, title: 'product 4', price: 400, code: "P4", description: "description of product 4", stock: 11, category: "ropas", thumbnails:"image4.jpg", status: true},

  { id: 5, title: 'product 5', price: 500, code: "P5", description: "description of product 5", stock: 50, category: "ropas", thumbnails:"image5.jpg", status: true},

  { id: 6, title: 'product 6', price: 600, code: "P6", description: "description of product 6", stock: 16, category: "ropas", thumbnails:"image6.jpg", status: true}
];

// Array de carros de compra
const carts = [
  { id: 1, products: [1, 2], total: 300 },
  { id: 2, products: [3], total: 300 }
];

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
