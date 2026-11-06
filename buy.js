import { list } from "./cart.js";
const cart = {};
const codes = {
  NikeLover9000: 0.75,
  ILOVESHOESAAAAAAAHHHHHHHH: 0.25,
  JustinSmellsGood_Kachow: 0,
  goycmiester: 2,
};
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
      cart[item].count += 1;
    } else {
      cart[item] = item;
      item.count = 1;
    }
  } else {
    return "None in stock";
  }
}
function removeFromCart(cart, item) {
  cart[item].count -= 1;
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
  if (code in codes) {
    price = price * codes[code];
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
function inject(item) {
  const container = document.querySelector(".cards");
  container.insertAdjacentHTML(
    "beforeend",
    `<div class = card >
        <h1 class = "chead"> headerheaderheaderheader</h1>
        <h2 class ="cprice">prciepicrecpirc3epcirpceicprip3eicpirpiepic</h2>
        <button class = "buy">buybubybubybubybubybubyubybubybubybu</button>
      </div>`,
  );
}
list.foreach((shoe) => inject(shoe));
