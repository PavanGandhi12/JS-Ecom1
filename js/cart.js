
var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
var cartItemsList = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total");

function renderCartItems() {
  cartItemsList.innerHTML = "";

  cartItems.forEach(function (product) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = product.img;
    img.alt = "Product Image";
    li.appendChild(img);
    var nameSpan = document.createElement("span");
    nameSpan.textContent = product.name;      
    li.appendChild(nameSpan);

    var quantityContainer = document.createElement("div");
    quantityContainer.style.display = "flex";
    quantityContainer.style.alignItems = "center";

    var decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", function () {
      updateQuantity(product, product.quantity - 1);
    });
    quantityContainer.appendChild(decreaseButton);

    var quantitySpan = document.createElement("span");
    quantitySpan.textContent = product.quantity;
    quantityContainer.appendChild(quantitySpan);

    var increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", function () {
      updateQuantity(product, product.quantity + 1);
    });
    quantityContainer.appendChild(increaseButton);

    li.appendChild(quantityContainer);

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeFromCart(product);
    });
    li.appendChild(removeButton);

    cartItemsList.appendChild(li);
  });
}


function updateQuantity(product, quantity) {
  if (quantity < 1) {
    removeFromCart(product);
    return;
  }

  product.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCartItems();
  updateCartTotal();
}


function removeFromCart(product) {
  cartItems = cartItems.filter(function (item) {
    return item.id !== product.id;
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCartItems();
  updateCartTotal();
}


function updateCartTotal() {
  var total = cartItems.reduce(function (sum, product) {
    return sum + product.amt * product.quantity;
  }, 0);

  cartTotal.textContent = "Total: ₹" + total;
}

renderCartItems();
updateCartTotal();





