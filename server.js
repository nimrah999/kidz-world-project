import { createRequire } from "module";
const require = createRequire(import.meta.url);

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('.'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

import items from './items.js';
import { getItemKey } from "./utility.js";


const YOUR_DOMAIN = 'http://localhost:4243';

function createLineItems (itemsToPurchase) {
  const getUnitAmount = (itemid) => {
    const item = items.find((i) => i.itemid === itemid);
    return ((item.dollars * 100) + item.cents);
  };

  const line_items = Object.entries(itemsToPurchase).map((item) => {
    return {
         price_data: {
          currency: 'usd',
          product_data: {
            name: getItemKey('name', item[0]),
            images: ['http://i1.faceprep.in/prograd-junior/book1.png'],
            // images: [getItemKey('imageSrc', item[0])]
          },
          unit_amount: getUnitAmount(item[0]),
        },
        quantity: item[1],
      }
  });
  return line_items;
} 

app.post('/create-checkout-session', async (req, res) => {
  const itemsToPurchase = JSON.parse(req.body.cart);
  const line_items = createLineItems(itemsToPurchase);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/failure.html`,
  });

  res.redirect(303, session.url)
});

app.listen(4243, () => console.log('Running on port 4243'));