import { getCart, saveCart } from "./utils.js";
const addressRegExp = new RegExp("^[0-9]{1,5}(?:(?:[,. ])[-a-zA-Z]+)+");
const nameOrCityRegExp = new RegExp("^[A-Z][A-Za-zéèê-]+$");
const emailRegExp = new RegExp(
  "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
);
const cart = getCart();
const products = [];
const itemId = [];
const form = document.querySelector(".cart__order__form");

for (let item of cart) {
  itemId.push(item.id);
  const product = await fetchProduct(
    `http://localhost:3000/api/products/${item.id}`
  );
  displayItemsInCart(item, product);
  products.push(product);
}
const productId = itemId;
computeTotal();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !nameOrCityRegExp.test(form.firstName.value) ||
    !nameOrCityRegExp.test(form.lastName.value) ||
    !addressRegExp.test(form.address.value) ||
    !nameOrCityRegExp.test(form.city.value) ||
    !emailRegExp.test(form.email.value)
  ) {
    alert("Formulaire invalide");
    return;
  }

  const contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };

  const postForm = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact: contact, products: productId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  postForm.then(async (r) => {
    try {
      const response = await r.json();
      const urlcommande =
      `./confirmation.html?orderId=${response.orderId}`
      saveCart([]);
      document.location.href = urlcommande;
    } catch (e) {
      console.log(e);
    }
  });
});

form.firstName.addEventListener("change", (e) => {
  validNameOrCity(firstName);
});

form.lastName.addEventListener("change", (e) => {
  validNameOrCity(lastName);
});

form.address.addEventListener("change", (e) => {
  validAddress(address);
});

form.city.addEventListener("change", (e) => {
  validNameOrCity(city);
});

form.email.addEventListener("change", (e) => {
  validEmail(email);
});
/**
 * fetch de chaque produit présent dans le panier pour récuperer les informations
 *
 */
async function fetchProduct(url) {
  const r = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return await r.json();
}

/**
 * fonction pour afficher les produits du panier
 * @param {object} informationFromCart information provenant du panier
 * @param {object} informationFromLink information provenant du lien API
 */
function displayItemsInCart(informationFromCart, informationFromLink) {
  const article = document.createElement("article");
  article.classList = "cart__item";
  article.dataset.id = informationFromCart.id;
  article.dataset.color = informationFromCart.color;
  article.appendChild(makeImage(informationFromLink));
  article.appendChild(
    cartItemContent(informationFromCart, informationFromLink)
  );
  document.querySelector("#cart__items").appendChild(article);
}

/**
 * fonction pour afficher l'image des produits
 * @param {object} product
 * @returns
 */
function makeImage(product) {
  const imageItem = document.createElement("div");
  imageItem.classList = "cart__item__img";
  const img = document.createElement("img");
  img.src = `${product.imageUrl}`;
  img.alt = `${product.altTxt}`;
  imageItem.appendChild(img);
  return imageItem;
}

/**
 * fonction pour afficher le contenu des produits
 * @param {object} productFromCart
 * @param {object} productFromLink
 * @returns
 */
function cartItemContent(productFromCart, productFromLink) {
  const itemContent = document.createElement("div");
  itemContent.classList = "cart__item__content";
  itemContent.appendChild(
    cartItemContentDescription(productFromCart, productFromLink)
  );
  itemContent.appendChild(cartItemContentSettings(productFromCart));
  return itemContent;
}

/**
 * Fonction pour créer la description des produits
 * @param {object} productFromCart
 * @param {object} productFromLink
 * @returns
 */
function cartItemContentDescription(productFromCart, productFromLink) {
  const itemContentDescription = document.createElement("div");
  itemContentDescription.classList = "cart__item__content__description";
  const name = document.createElement("h2");
  name.innerText = `${productFromLink.name}`;
  const color = document.createElement("p");
  color.innerText = `${productFromCart.color}`;
  const price = document.createElement("p");
  price.innerText = `${productFromLink.price} €`;
  itemContentDescription.appendChild(name);
  itemContentDescription.appendChild(color);
  itemContentDescription.appendChild(price);
  return itemContentDescription;
}

/**
 * Fonction pour créer les paramètres des produits
 * @param {object} productFromCart
 * @param {object} productFromLink
 * @returns
 */
function cartItemContentSettings(productFromCart) {
  const itemContentSettings = document.createElement("div");
  itemContentSettings.classList = "cart__item__content__settings";
  const itemContentSettingsQuantity = document.createElement("div");
  itemContentSettingsQuantity.classList =
    "cart__item__content__settings__quantity";
  const quantity = document.createElement("p");
  quantity.innerText = "Qté : ";
  const input = document.createElement("input");
  input.addEventListener("change", (e) => {
    const itemArticle = itemContentSettings.closest("article");
    const cartItem = cart.find(
      (p) =>
        p.id === itemArticle.dataset.id && p.color === itemArticle.dataset.color
    );
    cart[cart.indexOf(cartItem)].quantity = parseInt(input.value);
    saveCart(cart);
    computeTotal();
  });
  input.type = "number";
  input.classList = "itemQuantity";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = `${productFromCart.quantity}`;
  const itemContentSettingsDelete = document.createElement("div");
  itemContentSettingsDelete.classList = "cart__item__content__settings__delete";
  const itemDelete = document.createElement("p");
  itemDelete.innerText = "Supprimer";
  itemDelete.addEventListener("click", (e) => {
    const itemArticle = itemContentSettings.closest("article");
    itemArticle.remove();
    const cartItem = cart.find(
      (p) =>
        p.id === itemArticle.dataset.id && p.color === itemArticle.dataset.color
    );
    cart.splice(cart.indexOf(cartItem), 1);
    saveCart(cart);
    computeTotal();
  });
  itemContentSettings.appendChild(itemContentSettingsQuantity);
  itemContentSettings.appendChild(itemContentSettingsDelete);
  itemContentSettingsQuantity.appendChild(quantity);
  itemContentSettingsQuantity.appendChild(input);
  itemContentSettingsDelete.appendChild(itemDelete);
  return itemContentSettings;
}

/**
 * Fonction pour calculer et afficher la quantité totale de produit et le prix total
 */
function computeTotal() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector("#totalQuantity").innerText = totalQuantity;

  const totalPrice = cart.reduce((total, item) => {
    const cartItem = products.find((p) => p._id === item.id);
    const itemPrice = cartItem.price;
    return total + itemPrice * item.quantity;
  }, 0);
  document.querySelector("#totalPrice").innerText = totalPrice;
}

/**
 * Fonction pour valider l'email dans le formulaire
 * @param {string} email
 */
function validEmail(email) {
  let testEmail = emailRegExp.test(email.value);
  if (!testEmail) {
    document.querySelector("#emailErrorMsg").innerText =
      "Adresse Email invalide";
  } else {
    document.querySelector("#emailErrorMsg").innerText = "";
  }
}

/**
 * Fonction pour valider les noms ou les noms de ville dans le formulaire
 * @param {string} nameOrCity
 */
function validNameOrCity(nameOrCity) {
  let testNameOrcity = nameOrCityRegExp.test(nameOrCity.value);
  if (!testNameOrcity) {
    document.querySelector(
      `#${nameOrCity.name}ErrorMsg`
    ).innerText = `Champ invalide`;
  } else {
    document.querySelector(`#${nameOrCity.name}ErrorMsg`).innerText = "";
  }
}

/**
 * Fonction pour valider l'adresse dans le formulaire
 * @param {string} address
 */
function validAddress(address) {
  let testAddress = addressRegExp.test(address.value);
  if (!testAddress) {
    document.querySelector("#addressErrorMsg").innerText = `Adresse invalide`;
  } else {
    document.querySelector("#addressErrorMsg").innerText = "";
  }
}
