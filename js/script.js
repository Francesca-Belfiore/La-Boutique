// let myCart = [];
// let cartPrice = [];

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", () => {
    // myCart.push(productTitle);
    // cartPrice.push(parseFloat(textPrice));
    // let total = cartPrice.reduce((sum, current) => sum + current);
    // console.log("Cart:", myCart.join("; "), "- Price:", total, "$");

    cartList.push(
      productList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    alert(`Prodotto aggiunto al carrello, numero prodotti: ${cartList.lenght}`);
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
  // productList = data.map((product) => {
  //   product.quantity = 0;
  //   return product
  // });
  // productList = [...data, {}]


  return renderProducts(data);
}

const wrapperProducts = document.querySelector(".wrapper__products");
// const cartBtn= documnt.querySelector(".cartBtn");

const cartList= [];
let productList = [];

getProductsList();