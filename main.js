// let cartCounter=document.getElementById('cartCounter');
// let counter=0;
// document.querySelectorAll(".addCart").forEach(el=>{
//     el.addEventListener("click",()=>{
//     counter+=1;
//     cartCounter.innerHTML=counter; 

//     })
// })

// let mens=document.getElementById("mens")
// let cartpage=document.getElementById("cartpage")
// let mendiv=document.querySelector(".mendiv")

document.addEventListener("DOMContentLoaded", () => {
    let cartCounter=document.getElementById('cartCounter');
    let counter=0;
    document.querySelectorAll(".addCart").forEach(el=>{
    el.addEventListener("click",()=>{
    counter+=1;
    cartCounter.innerHTML=counter; 

    })
})

let mens=document.getElementById("mens")
let cartpage=document.getElementById("cartpage")
let mendiv=document.querySelector(".mendiv")

  const buttons = document.querySelectorAll(".addCart");
  const cartPage = document.getElementById("cartpage");
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCart = document.getElementById("closeCart");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    const cart = getCart();
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Cart is empty</p>";
      cartTotal.innerText = "$0.00";
      return;
    }

    cart.forEach((item, index) => {
      const priceNumber = parseFloat(item.price.replace("$", ""));
      total += priceNumber * item.qty;

      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" width="80">
          <div class="cart-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>

            <div class="qty-controls">
              <button onclick="decreaseQty(${index})">−</button>
              <span>${item.qty}</span>
              <button onclick="increaseQty(${index})">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
              Remove
            </button>
          </div>
        </div>
      `;
    });

    cartTotal.innerText = "$" + total.toFixed(2);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      const card = button.closest(".product-card");

      const product = {
        name: card.querySelector(".product-title").innerText,
        price: card.querySelector(".product-price").innerText,
        image: card.querySelector("img").src,
        qty: 1
      };

      let cart = getCart();
      const existing = cart.find(item => item.name === product.name);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push(product);
      }

      saveCart(cart);
      cartPage.style.display = "block";
      renderCart();
      cartPage.scrollIntoView({ behavior: "smooth" });
    });
  });

  closeCart.addEventListener("click", () => {
    cartPage.style.display = "none";
  });

  window.increaseQty = function (index) {
    let cart = getCart();
    cart[index].qty += 1;
    saveCart(cart);
    renderCart();
  };

  window.decreaseQty = function (index) {
    let cart = getCart();
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    }
    saveCart(cart);
    renderCart();
  };

  window.removeItem = function (index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  };

  renderCart();
});

