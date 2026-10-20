import { list } from "./cart.js";
const cart = {};
const codes = [
  {
    name: "NikeLover9000",
    dc: 0.75,
  },
  { name: "ILOVESHOESAAAAAAAHHHHHHHH", dc: 0.25 },
  { name: "JustinSmellsGood_Kachow", dc: 0 },
  { name: "goycmiester", dc: 2 },
];
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
  if (item.stock >= 1) {
    if (cart.includes(item)) {
      cart.item.count += 1;
    } else {
      cart.item = item;
      item.count = 1;
    }
  } else {
    return "None in stock";
  }
}
function removeFromCart(cart, item) {
  cart.item.count -= 1;
  item.stock += 1;
}
function price(cart) {
  let p = 0;
  for (const i of cart) {
    p += i.price;
  }
  return p;
}
function checkout(price, cart, money, code, codes) {
  if (codes.includes(code)) {
    price = price * code.dc;
  }
  if (money < price) {
    return "insufficient funds";
  } else {
    for (const i of cart) {
      i.count = 0;
      i.stock -= i.count;
    }
  }
}
