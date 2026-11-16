import { list } from "./cart.js";
const cart = {};
const codes = {
  NikeLover9000: 0.75,
  ILOVESHOESAAAAAAAHHHHHHHH: 0.25,
  JustinSmellsGood_Kachow: 0,
  goycmiester: 2,
};

function addToCart(cart, item) {
  if (item.stock >= 1) {
    if (Object.values(cart).includes(item)) {
      item.count += 1;
      item.stock -= 1;
    } else {
      cart[item.name] = item;
      item.count = 1;
      item.stock -= 1;
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
function inject(item, container) {
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="card" data-item="${item.idnum}">
        <h1 class = "chead"> ${item.brand}: ${item.name}</h1>
        <img class = "cimg" src = ${item.img}> <img>
        <h2 class ="cprice">$${item.price}</h2>
        <button class = "buy" >Add to cart</button>
      </div>`,
  );
}
list.forEach((shoe) => inject(shoe, document.querySelector(".cards")));
const buttons = document.querySelectorAll(".buy");
buttons.forEach((button) =>
  button.addEventListener("click", function (event) {
    addToCart(
      cart,
      list[event.target.closest(".card").getAttribute("data-item")],
    );
    console.log(cart);
  }),
);


const cartView = document.getElementById("cart");

const vc = document.getElementById("vc");
vc.addEventListener("click", function () {
  cartView.style.display = "flex";
  createCart(cart, cartView);
});

const ec = document.getElementById("ec");
ec.addEventListener("click", function () {
  cartView.style.display = "none";
});

function createCart(cart, container) {
  Object.values(cart).forEach((item) => {
    inject(item, container);
  });
}
