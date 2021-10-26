import { getItemKey } from "./utility.js";
import { getAllItemsFromCart } from './sessionStorage.js';

// price logic starts here...
export function getTotalPrice(){
  let totalPriceInCents = 0;
  let finalDollars = 0;
  let finalCents = 0;

  const cartItems = getAllItemsFromCart();
  if (!cartItems) {
    return;
  }

  const items = Object.entries(cartItems);

  for(let index=0; index<items.length; index++){
    totalPriceInCents = totalPriceInCents + items[index][1] * (getItemKey('dollars', items[index][0])*100+getItemKey('cents', items[index][0]));
  }
  finalDollars = Math.floor(totalPriceInCents / 100);
  finalCents = totalPriceInCents % 100;

  return {
    finalDollars,
    finalCents
  };
}