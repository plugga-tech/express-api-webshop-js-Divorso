var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const port = 3015;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/users');

var app = express();

// import { getUsersWithoutPasswords } from './frontend/JS_modules/getUsers.js';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/users_data.json`)
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/products_data.json`)
);
const orderCart = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/cart_data.json`)
);

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/api/users/add', (req, res) => {
  const newID = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newID }, req.body);
  if (users.push(newUser)) {
    res.send(`Successfully added to users`);
  } else {
    res.send(`User was not added`);
  }
  fs.writeFile(
    `${__dirname}/backend/users_data.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json(users.newUser);
    }
  );
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user && user.password === password) {
    return res.status(200).send('Exists, you may login');
  } else {
    return res.status(401).send('Invalid email or password');
  }
});

app.get('/api/products', async (req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  console.log(product);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('product not found');
  }
});

app.post('/api/products/add', (req, res) => {
  const newID = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newID }, req.body);
  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/backend/products_data.json`,
    JSON.stringify(products),
    (err) => {
      res.status(201).json(products.newProduct);
    }
  );
});

app.post('/api/orders/add', async (req, res) => {
  const userID = parseInt(req.body.userID);
  const user = users.find((user) => user.id === userID);

  const productsOrdered = req.body.products.map((product) => {
    const productID = parseInt(product.productId);
    const quantity = parseInt(product.quantity);
    const foundProduct = products.find((p) => p.id === productID);

    return foundProduct ? { ...foundProduct, quantity } : null;
  });

  const newOrder = {
    user: user,
    products: productsOrdered,
  };
  console.log(newOrder);
  orderCart.push(newOrder);

  fs.writeFile(
    `${__dirname}/backend/cart_data.json`,
    JSON.stringify(orderCart),
    (err) => {
      res.status(201).json(orderCart.newOrder);
    }
  );

  res.status(201).send('Order added successfully');
});

app.get('/api/orders/all/', async (req, res) => {
  console.log('orders in cart');
  res.status(200).json(orderCart);
});

app.listen(port, () => {
  console.log('hello server is running on port ' + port);
});

module.exports = app;
