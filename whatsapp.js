//adding whatsapp API 

import { getAllItemsFromCart } from "./sessionStorage.js";
import { getItemKey } from "./utility.js";

export function getUpdateWhatsappLink(totalPrice) {
    let whatsappLink = "https://api.whatsapp.com/send?phone=+919911330489&text=Order%20details";

    const cartItems = getAllItemsFromCart();
    if (!cartItems) {
      return;
    }

    const items = Object.entries(cartItems);

    for (let index=0; index<items.length; index++) {
      whatsappLink += "%0A" + getItemKey('name', items[index][0]) + "%20" + items[index][1];
    }
    
    whatsappLink += "%0A" + "Total%20Price:%20$" + totalPrice.finalDollars + "%20" + totalPrice.finalCents + "c";
    return whatsappLink;
};