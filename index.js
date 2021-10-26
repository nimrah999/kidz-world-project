import { updateCart } from './cart.js';
import { addItemToCart } from './sessionStorage.js';
import { getTotalPrice } from './price.js';
import { getUpdateWhatsappLink } from './whatsapp.js';

var shareButton = document.getElementById("share");
var addButtons = document.getElementsByClassName("button");

window.onload = updateCart;


//link add button, invoke update cart and add item to local storage

for(let i=0; i<addButtons.length; i++){
  addButtons[i].onclick=(e) => {
    addItemToCart(e.currentTarget.dataset.itemid);
    updateCart();
  };
}

shareButton.onclick = () => {
  const totalPrice = getTotalPrice();
  const whatsappLink = getUpdateWhatsappLink(totalPrice);
  if (whatsappLink) {
    window.open(whatsappLink, "_blank");
  } else {
    alert('No item added to cart!');
  }
};