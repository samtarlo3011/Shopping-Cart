import { list } from "./cart.js";
const cart = {};
const codes = {
  NikeLover9000: 0.75,
  ILOVESHOESAAAAAAAHHHHHHHH: 0.25,
  JustinSmellsGood_Kachow: 0,
  goycmiester: 2,
};
const cI = document.getElementById("cart_items")
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
function removeFromCart(item) {
  item.count -= 1;
  item.stock += 1;
  if (item.count === 0) {
    delete cart[item.name];
  }
  document.getElementById("cart").innerHTML =
    `<button id = "ec"> Exit Cart</button>
    <div id = "cart_items">
        
    </div>
    <p id = "total">${price(cart)}</p>
    <button id = "co"> Checkout</button>`;

  createCart(cart, cI);
}
function price(cart) {
  let p = 0;
  for (const [key, value] of Object.entries(cart)) {
    p += value.price * value.count;
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
function injectC(item, container) {
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="ccard" data-item="${item.name}">
        <h1 class = "cchead"> ${item.brand}: ${item.name}</h1>
        <img class = "ccimg" src = ${item.img}> <img>
        <h2 class ="ccount">Count:${item.count}</h2>
        <button class = "remove" >Remove From Cart</button>
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
  }),
);

const cartView = document.getElementById("cart");

const vc = document.getElementById("vc");
vc.addEventListener("click", function () {
  cartView.style.display = "flex";
  cI.style.display = "flex";
  createCart(cart, cI);
});

function createCart(cart, container) {
  const p = document.getElementById("total");
  p.innerHTML = price(cart);
  const ec = document.getElementById("ec");
  ec.addEventListener("click", function () {
    cartView.querySelectorAll(".ccard").forEach((el) => {
      el.remove();
    });
    cartView.style.display = "none";
    cI.style.display = "none";
  });
  Object.values(cart).forEach((item) => {
    injectC(item, container);
  });
  const remove = document.querySelectorAll(".remove");
  remove.forEach((button) =>
    button.addEventListener("click", function (event) {
      const itemName = event.target.closest(".ccard").getAttribute("data-item");
      removeFromCart(cart[itemName]);
    }),
  );
}
