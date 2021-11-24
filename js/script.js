// let myCart = [];
// let cartPrice = [];

function setCartProductsNum () {
  return (cartProductsNum.textContent = `Numero prodotti: ${cartList.length + parseInt(localStorageTot)}`);
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    // myCart.push(productTitle);
    // cartPrice.push(parseFloat(textPrice));
    // let total = cartPrice.reduce((sum, current) => sum + current);
    // console.log("Cart:", myCart.join("; "), "- Price:", total, "$");

    cartList.push(
      productList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.length}`);
    localStorage.setItem("totCartitems", (cartList.length + parseInt(localStorageTot)));
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
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productList = data;

  // Per aggiungere una quantità al prodotto
  // productList = data.map((product) => {
  //   product.quantity = 0;
  //   return product
  // });

  return renderProducts(data);
}

let productList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

//per il carrello
let cartList = [];

if (localStorage.getItem("totCartitems") === null) {
  localStorage.setItem("totCartitems", 0);
}

let localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCart = document.querySelector(".clearCart");

//flusso genrale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
getProductsList();

clearCart.addEventListener("click", () => {
  cartList.length = 0;
  localStorageTot = 0;
  localStorage.setItem("totCartitems", 0);
  setCartProductsNum();
});