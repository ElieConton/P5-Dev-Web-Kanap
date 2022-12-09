import { getCart, saveCart } from "./utils.js";
let cart = getCart();
let totalQuantity = 0;
let totalPrice = 0;

for (let item of cart) {
  const product = await fetchProduct(
    `http://localhost:3000/api/products/${item.id}`
  );
  displayItemsInCart(item, product);
  totalQuantity = totalQuantity + item.quantity;
  totalPrice = totalPrice + product.price * item.quantity;
  document.querySelector("#totalQuantity").innerText = totalQuantity;
  document.querySelector("#totalPrice").innerText = totalPrice;
}

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
 * @param {*} informationFromCart
 * @param {*} informationFromLink
 */
function displayItemsInCart(informationFromCart, informationFromLink) {
  const article = document.createElement("article");
  article.classList = "cart__item";
  article.dataset.id = informationFromCart.id;
  article.dataset.color = informationFromCart.color;
  article.appendChild(makeImage(informationFromLink));
  article.appendChild(cartItemContent(informationFromCart, informationFromLink ));
  document.querySelector("#cart__items").appendChild(article);

}
 /* const div3 = document.createElement("div");
  div2.appendChild(div3);
  div3.classList = "cart__item__content__description";
  const h2 = document.createElement("h2");
  div3.appendChild(h2);
  h2.innerText = `${informationFromLink.name}`;
  const p = document.createElement("p");
  div3.appendChild(p);
  p.innerText = informationFromCart.color;
  const p1 = document.createElement("p");
  div3.appendChild(p1);
  p1.innerText = `${informationFromLink.price} €`;
  const div4 = document.createElement("div");
  div2.appendChild(div4);
  div4.classList = "cart__item__content__settings";
  const div5 = document.createElement("div");
  div4.appendChild(div5);
  div5.classList = "cart__item__content__settings__quantity";
  const p2 = document.createElement("p");
  div5.appendChild(p2);
  p2.innerText = `Qté: `;
  const input = document.createElement("input");
  input.addEventListener("change", (e) => {
    console.log(e);
  });
  div5.appendChild(input);
  input.type = "number";
  input.classList = "itemQuantity";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = `${informationFromCart.quantity}`;
  const div6 = document.createElement("div");
  div4.appendChild(div6);
  div6.classList = "cart__item__content__settings__delete";
  const p3 = document.createElement("p");
  div4.appendChild(p3);
  p3.classList = "deleteItem";
  p3.innerText = "Supprimer";
}*/

function makeImage(product) {
  const imageItem = document.createElement("div");
  imageItem.classList = "cart__item__img";
  const img = document.createElement("img");
  img.src = `${product.imageUrl}`;
  img.alt = `${product.altTxt}`;
  imageItem.appendChild(img);
  return imageItem;
}

function cartItemContent(productFromCart, productFromLink) {
  const itemContent = document.createElement("div");
  itemContent.classList = "cart__item__content"
  itemContent.appendChild(cartItemContentDescription(productFromLink))
  itemContent.appendChild(cartItemContentSettings(productFromCart))
  return itemContent
}

function cartItemContentDescription(product) {
  const itemContentDescription = document.createElement("div")
  itemContentDescription.classList = "cart__item__content__description"
  const name = document.createElement("h2")
  name.innerText = `${product.name}`
  const color = document.createElement("p")
  color.innerText = `${product.color}`
  const price = document.createElement("p")
  price.innerText = `${product.price}`
  itemContentDescription.appendChild(name)
  itemContentDescription.appendChild(color)
  itemContentDescription.appendChild(price)
  return itemContentDescription
}

function cartItemContentSettings(product) {
  const itemContentSettings = document.createElement("div")
  itemContentSettings.classList = "cart__item__content__settings"
  const itemContentSettingsQuantity = document.createElement("div")
  itemContentSettingsQuantity.classList = "cart__item__content__settings__quantity"
  const quantity = document.createElement("p")
  quantity.innerText = "Qté : "
  const input = document.createElement("input")
  input.addEventListener("change", (e) => {
    console.log(e);
  });
  input.type = "number";
  input.classList = "itemQuantity";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = `${product.quantity}`;
  const itemContentSettingsDelete = document.createElement("div")
  itemContentSettingsDelete.classList = "cart__item__content__settings__delete"
  const itemDelete = document.createElement("p")
  itemDelete.innerText = "Supprimer"
  itemContentSettings.appendChild(itemContentSettingsQuantity)
  itemContentSettings.appendChild(itemContentSettingsDelete)
  itemContentSettingsQuantity.appendChild(quantity)
  itemContentSettingsQuantity.appendChild(input)
  itemContentSettingsDelete.appendChild(itemDelete)
  return itemContentSettings
}