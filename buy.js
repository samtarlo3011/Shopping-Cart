import { list } from "./cart.js";
const cart = [];
function sortBrand(brand, list) {
  let finB = [];
  for (const i of list) {
    if (i.brand === brand) {
      finB.push(i);
    }
  }
  return finB;
}
function sortSize(size, list) {
  let finS = [];
  for (const i of list) {
    if (i.size === size) {
      finS.push(i);
    }
  }
  return finS;
}
function sortPrice(PM, PL, list) {
  let finP = [];
  for (const i of list) {
    if (i.price >= PL && i.price <= PM) {
      finP.push(i);
    }
  }
  return finP;
}
function addToCart(cart, item) {
  cart.push(item);
}
function removeFromCart(cart, item) {
  cart.pop(item);
}
