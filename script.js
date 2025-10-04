    const scrollAmount = 800; 
    document.getElementById("scroll-up").addEventListener("click", () => {
      window.scrollBy({
        top: -scrollAmount,
        left: 0,
        behavior: "smooth"
      });
    });
    document.getElementById("scroll-down").addEventListener("click", () => {
      window.scrollBy({
        top: scrollAmount,
        left: 0,
        behavior: "smooth"
      });
    });
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let item = cart.find(product => product.name === name);

  if (item) {
    item.quantity += 1; 
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  if (cartItems) {
    cartItems.innerHTML = "";

    cart.forEach(item => {
      let li = document.createElement("li");
      li.classList.add("order-item"); // flex style
      li.innerHTML = `
        <span class="item-name">${item.name} (x${item.quantity})</span>
        <span class="item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    const cartTotal = document.getElementById("cart-total");
    if (cartTotal) cartTotal.textContent = total.toLocaleString();
  }
}

window.onload = function () {
  updateCartCount();
  loadCart();
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseInt(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  if (cartItemsContainer && cartTotalElement) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  if (cartItemsContainer && cartTotalElement) {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item"); // flex style
        itemDiv.innerHTML = `
          <span class="item-name">${item.name} (x${item.quantity})</span>
          <span class="item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
      });
    }

    cartTotalElement.textContent = total.toLocaleString();
  }
}

    renderCheckout();

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        renderCheckout();
        updateCartCount();
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const proceedBtn = document.getElementById("proceed-checkout");

  if (proceedBtn) {
    proceedBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      let summary = "📦 Order Summary:\n\n";
      let total = 0;

      cart.forEach(item => {
        summary += `${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}\n`;
        total += item.price * item.quantity;
      });

      summary += `\nTotal: ₦${total.toLocaleString()}\n\nSend me your account number.`;
      
      const encodedMessage = encodeURIComponent(summary);
      const phoneNumber = "2348052470223"; 
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");
    });
  }
});