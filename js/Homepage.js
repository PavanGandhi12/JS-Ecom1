

const data = [
    {
        id: 1,
        name: "Fire Boltt Ninja 2",
        img: "https://m.media-amazon.com/images/I/617eiZeFtNL._SL1500_.jpg",
        amt: 1599,
        seller: "Boltt Store",
        catagory: "Watch",
    },

    {
        id: 2,
        name: "Noise Pulse Go",
        img: "https://m.media-amazon.com/images/I/61akt30bJsL._SL1500_.jpg",
        amt: 1300,
        seller: "Noise Store",
        catagory: "Watch",
    },

    {
        id: 3,
        name: "boAt Xtend Pro",
        img: "https://m.media-amazon.com/images/I/61ZuL8CUigL._SL1500_.jpg",
        amt: 2799,
        seller: "Rajesh Watchs",
        catagory: "Watch",
    },
    {
        id: 4,
        name: "Lenovo Tab M8",
        img: "https://m.media-amazon.com/images/I/71SvqTFPXJL._SL1500_.jpg",
        amt: 9270,
        seller: "Stonehenge Retail",
        catagory: "Tablets",
    },
    {
        id: 5,
        name: "Honor PAD X8",
        img: "https://m.media-amazon.com/images/I/710G-VKcgtL._SL1500_.jpg",
        amt: 12999,
        seller: "Honor india",
        catagory: "Tablets",
    },

    {
        id: 6,
        name: "IKALL N9 ",
        img: "https://m.media-amazon.com/images/I/7185GL6hPlL._SL1500_.jpg",
        amt: 3999,
        seller: "IKALL Store",
        catagory: "Tablets",
    },

    {
        id: 7,
        name: "Oppo Pad Air",
        img: "https://m.media-amazon.com/images/I/513FD4w8hGL._SL1500_.jpg",
        amt: 15999,
        seller: "Oppo Store",
        catagory: "Tablets",
    },
    {
        id: 8,
        name: "Acer EK220Q",
        img: "https://m.media-amazon.com/images/I/8150iUXkc5L._SL1500_.jpg",
        amt: 6249,
        seller: "Accer Store",
        catagory: "Monitors",
    },
    {
        id: 9,
        name: "Samsung 24",
        img: "https://m.media-amazon.com/images/I/81TjRLHaz1L._SL1500_.jpg",
        amt: 9799,
        seller: "Samsung Store",
        catagory: "Monitors",
    },

    {
        id: 10,
        name: "ZEBRONICS AC32FHD ",
        img: "https://m.media-amazon.com/images/I/813Y1TIZwfL._SL1500_.jpg",
        amt: 12799,
        seller: "ZEBRONICS Store",
        catagory: "Monitors",
    },
];





const productsContainer = document.querySelector(".products");
const categoryList = document.querySelector(".category-list");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");
const txtSearch = document.querySelector("#txtSearch");

function displayProducts(products) {

    if (products.length > 0) {
        const productDetails = products
            .map(
                (product) => `
        <div class="product" data-id="${product.id}">
          <div class="img">
            <img src="${product.img}" alt="${product.name}" />
          </div>
          <div class="product-details">
            <span class="name">${product.name}</span>
            <span class="amt">Rs.${product.amt}</span>
            <span class="seller">${product.seller}</span>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `
            )
            .join("");

        productsContainer.innerHTML = productDetails;

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productElement = button.parentElement.parentElement;
    const productId = parseInt(productElement.dataset.id);
    const selectedProduct = data.find((product) => product.id === productId);
    addToCart(selectedProduct);
    showCartNotification();
  });
});

if (data.length === 0) {
  productsContainer.innerHTML = "<h3>No Products Available</h3>";
}

}}
function setCategories() {
    const allCategories = data.map((product) => product.catagory);
    console.log(allCategories);
    const catagories = [
        "All",
        ...allCategories.filter((product, index) => {
            return allCategories.indexOf(product) === index;
        }),
    ];
    //console.log(catagories);
    categoryList.innerHTML = catagories.map((catagory) => `<li>${catagory}</li>`).join("");

    categoryList.addEventListener("click", (e) => {
        const selectedCatagory = e.target.textContent;
        selectedCatagory === "All" ? displayProducts(data) : displayProducts(data.filter((product) => product.catagory == selectedCatagory));
    });
}

categoryList.addEventListener("click", (e) => {
    const selectedCategory = e.target.textContent;
    selectedCategory === "All"
        ? displayProducts(data)
        : displayProducts(data.filter((product) => product.category === selectedCategory));
});

function setPrices() {
    const priceList = data.map((product) => product.amt);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceValue.textContent = "Rs." + maxPrice;

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "Rs." + e.target.value;
        displayProducts(data.filter((product) => product.amt <= e.target.value));   
    });
}

function addToCart(product) {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    var existingProduct = cartItems.find(function (item) {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
}

function showCartNotification() {
    var cartNotification = document.getElementById("cart-notification");
    cartNotification.style.display = "block";
    cartNotification.style.marginLeft = "40px";
}

txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        displayProducts(data.filter((product) => product.name.toLowerCase().includes(value)));
    } else {
        displayProducts(data);
    }
});

displayProducts(data);
setCategories();
setPrices();

