const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

const totalCartValue = (newItemPrice, cartTotal) => {
  let total = newItemPrice + cartTotal;
  return total;
};

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartValue(newItemPrice, cartTotal).toString());
});

const membershipDiscount = (cartTotal, isMember) => {
  if (isMember) {
    return cartTotal - (cartTotal * 10) / 100;
  } else {
    return cartTotal;
  }
};

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseInt(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(membershipDiscount(cartTotal, isMember).toString());
});

const calculateTax = (cartTotal) => {
  let result = (cartTotal * 5) / 100;
  return result;
};

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

const estimateDelivery = (shippingMethod, distance) => {
  let result;
  if (shippingMethod === 'express') {
    return (result = distance / 100);
  } else {
    return (result = distance / 50);
  }
};

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());
});

const shippingCost = (weight, distance) => {
  let result = weight * distance * 0.1;
  return result;
};

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance).toString());
});

const loyaltyPoints = (purchaseAmount) => {
  let result = purchaseAmount * 2;
  return result;
};

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
