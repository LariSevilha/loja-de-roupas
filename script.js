const products = [
  { id: 1, name: "Bolsa rosa pequena", price: 50, image: "./prods/bols1.png" },
  {
    id: 2,
    name: "Bolsa couro branco",
    price: 90.0,
    image: "./prods/bols2.jpg",
  },
  {
    id: 3,
    name: "Bolsa pequena azul",
    price: 45.9,
    image: "./prods/bols3.png",
  },
  { id: 4, name: "Anel em X", price: 29.9, image: "./prods/anel2.jpg" },
  {
    id: 5,
    name: "Anel em pedras e brilhantes",
    price: 95.0,
    image: "./prods/anel3.png",
  },
  {
    id: 6,
    name: "Anel casal borboleta",
    price: 89.9,
    image: "./prods/anel4.jpg",
  },
  { id: 7, name: "Brinco de pato", price: 19.9, image: "./prods/brin2.jpg" },
  { id: 8, name: "Brinco de flor", price: 10.9, image: "./prods/brin4.png" },
  { id: 9, name: "Colar de cobra", price: 45.9, image: "./prods/colar2.jpg" },
  {
    id: 10,
    name: "Colar de borboleta",
    price: 49.9,
    image: "./prods/colar4.jpg",
  },
  {
    id: 11,
    name: "Vestido colorido quadriculado",
    price: 99.9,
    image: "./prods/rou1.jpg",
  },
  { id: 12, name: "Vestido abacaxi", price: 85.9, image: "./prods/rou2.jpg" },
  {
    id: 13,
    name: "Vestido plus size rosa",
    price: 88.9,
    image: "./prods/rou3.jpg",
  },
  { id: 14, name: "Vestido azul", price: 114.9, image: "./prods/rou4.png" },
  { id: 15, name: "Chinelo Branco ", price: 45.9, image: "./prods/sap1.jpg" },
  {
    id: 16,
    name: "Sapato salto alto vermelho",
    price: 290.9,
    image: "./prods/sap2.jpg",
  },
  {
    id: 17,
    name: "Salto alto borboleta",
    price: 315.9,
    image: "./prods/sap3.png",
  },
  { id: 18, name: "Short couro fake", price: 59.9, image: "./prods/shor1.jpg" },
  {
    id: 19,
    name: "Short jeans desfiado",
    price: 35.9,
    image: "./prods/shor3.jpg",
  },
  { id: 20, name: "Short jeans", price: 45.9, image: "./prods/shor4.jpg" },
];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(`${product.name} - R$ ${product.price.toFixed(2)}`);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartFromStorage();
  displaySuccessMessage(`${product.name} foi adicionado ao carrinho.`);
}

function addToFavorites(productId) {
  const product = products.find((p) => p.id === productId);
  const favoritesItems =
    JSON.parse(localStorage.getItem("favoritesItems")) || [];
  favoritesItems.push(`${product.name} - R$ ${product.price.toFixed(2)}`);
  localStorage.setItem("favoritesItems", JSON.stringify(favoritesItems));
  loadFavoritesFromStorage();
  displaySuccessMessage(`${product.name} foi adicionado aos favoritos.`);
}

function displaySuccessMessage(message) {
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert-container";

  const alertCard = document.createElement("div");
  alertCard.className = "alert-card";

  const alertText = document.createElement("p");
  alertText.className = "alert-text";
  alertText.textContent = message;

  alertCard.appendChild(alertText);
  alertContainer.appendChild(alertCard);

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}

function loadCartFromStorage() {
  const cartList = document.getElementById("cartList");
  if (!cartList) {
    console.error("Elemento não encontrado.");
    return;
  }

  cartList.innerHTML = "";

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  for (let i = 0; i < cartItems.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = cartItems[i];

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.className = "deleteButton";
    deleteButton.onclick = function () {
      removeFromCart(i);
    };

    listItem.appendChild(deleteButton);
    cartList.appendChild(listItem);
  }
}

function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartFromStorage();
}

function loadFavoritesFromStorage() {
  const favoritesList = document.getElementById("favoritesListPage");
  if (!favoritesList) {
    console.error("Elemento não encontrado");
    return;
  }

  favoritesList.innerHTML = "";

  const favoritesItems =
    JSON.parse(localStorage.getItem("favoritesItems")) || [];
  for (let i = 0; i < favoritesItems.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = favoritesItems[i];

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = function () {
      removeFromFavorites(i);
    };

    listItem.appendChild(deleteButton);
    favoritesList.appendChild(listItem);
  }
}

function removeFromFavorites(index) {
  const favoritesItems =
    JSON.parse(localStorage.getItem("favoritesItems")) || [];
  favoritesItems.splice(index, 1);
  localStorage.setItem("favoritesItems", JSON.stringify(favoritesItems));
  loadFavoritesFromStorage();
}

function saveUserName() {
  var userName = document.getElementById("userNameInput").value;
  localStorage.setItem("userName", userName);
  updateUserName();
}

function updateUserName() {
  var userName = localStorage.getItem("userName");
  if (userName) {
    document.getElementById("userName").textContent = "Olá, " + userName + "!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateUserName();
});

function calcularTotalCarrinho() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let total = 0;
  
    for (let i = 0; i < cartItems.length; i++) {
      const priceString = cartItems[i].split(" - R$ ")[1];
      const itemPrice = parseFloat(priceString);
  
      total += itemPrice;
    }
  
    return total.toFixed(2);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    updateUserName();
    loadCartFromStorage();
    const totalCarrinho = calcularTotalCarrinho();
    document.getElementById("totalCarrinho").textContent = `Total: R$ ${totalCarrinho}`;
  });
  