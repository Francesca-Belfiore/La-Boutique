function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}, prezzo totale: ${(cartPrice.reduce((sum, current) => sum + current) + parseFloat(localStoragePrice)).toFixed(2)} $`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {

    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartPrice.push(parseFloat(textPrice));
    let total = cartPrice.reduce((sum, current) => sum + current);

    localStorage.setItem("totCartPrice", total);

    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    
    modal.style.bottom = "10px";
    setTimeout(() => {
      modal.style.bottom = "-100px";
    }, 2500)

    localStorage.setItem("totCartitems", JSON.stringify(cartList));
    localStorage.setItem("totCartPrice", (cartPrice.reduce((sum, current) => sum + current) + parseFloat(localStoragePrice)).toFixed(2));

    renderCart();
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  const alphBtn = document.querySelector(".alphBtn");
  alphBtn.addEventListener("click", () => {
    productsList.sort((a, b) => a.title.localeCompare(b.title));
    wrapperProducts.innerHTML = "";
    renderProducts(data);
  });

  const priceUpBtn = document.querySelector(".priceUpBtn");
  priceUpBtn.addEventListener("click", () => {
    productsList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    wrapperProducts.innerHTML = "";
    renderProducts(data);
  });

  const priceDownBtn = document.querySelector(".priceDownBtn");
  priceDownBtn.addEventListener("click", () => {
    productsList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    wrapperProducts.innerHTML = "";
    renderProducts(data);
  });

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];
let cartPrice = [];

if (localStorage.getItem("totCartPrice") === null) {
  localStorage.setItem("totCartPrice", 0);
}

const localStorageTot = localStorage.getItem("totCartitems");
let localStoragePrice = localStorage.getItem("totCartPrice");

const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");
const modal = document.querySelector(".modal");

// Flusso generale
let parsedTotCardItemsLen = JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}, prezzo totale: ${parseFloat(localStoragePrice).toFixed(2)} $`;
getProductsList();

// Svuota carrello
clearCartBtn.addEventListener("click", () => {

  cartList.length = 0;
  localStorage.removeItem("totCartitems");

  cartPrice = [0];
  localStoragePrice = 0;
  localStorage.removeItem("totCartPrice");
  setCartProductsNum();

  document.querySelector(".showCart").innerHTML = `Il carrello è vuoto...`;
});

// Cambia recensione
const reviewArr = [
  {avatar: "https://img.icons8.com/cotton/50/000000/smiling-face-icon.png", message: "Ottimi prodotti e un servizio cordiale e veloce: fantastico!"},
  {avatar: "https://img.icons8.com/cotton/50/000000/zany-face-icon.png", message: "Finalmente un negozio gestito veramente bene. Ormai compro solo qui!"},
  {avatar: "https://img.icons8.com/cotton/50/000000/winking-face-icon.png", message: "Offerte e prodotti di qualità, con le offerte si risparmia davvero!"}
];

function cycleReview() {

  reviewArr.forEach((review, i) => {
    setTimeout(() => {
      document.querySelector(".review").innerHTML = `<img src="${review.avatar}"><p>${review.message}</p>`;
    }, i * 3000);
  });
}

cycleReview();
setInterval(cycleReview, 9000);

// Mostra carrello
cartBtn.addEventListener("click", () => {
  document.querySelector(".showCart").classList.toggle("invisible");

  renderCart();
});

// Render carrello
function renderCart() {
  let articles = JSON.parse(localStorage.getItem("totCartitems")||0);
  const articleNames = [];

  for (articles of articles) {
    articleNames.push(articles.title);
  }

  document.querySelector(".showCart").innerHTML = `<p>Articoli:</><p>${articleNames.join("<br><br>")}</p><hr><p>Prezzo: ${parseFloat(localStoragePrice).toFixed(2)} $</p>`;
}