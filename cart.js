import { getAllItemsFromCart } from './sessionStorage.js';

//update cart
export function updateCart() {
  var cartValue = document.getElementById("cart-value");
  let quantity = 0;

  const cartItems = getAllItemsFromCart();

  if (!cartItems) {
    return;
  }
  
  const items = Object.values(cartItems);

  for (let index=0; index<items.length; index++) {
    quantity = quantity + items[index];
  }
  cartValue.innerHTML = quantity;

  const cartInput = document.getElementById("cart_items");
  cartInput.value = JSON.stringify(cartItems);
}
  