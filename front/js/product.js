import { getCart, saveCart } from "./utils.js";
//Récupération id produit pour interroger l'API uniquement sur le produit sélectionné
let originalLink = new URL(window.location.href);
let idLink = originalLink.searchParams.get("id");
let productLink = "http://localhost:3000/api/products/" + idLink;

const button = document.querySelector("#addToCart");
button.addEventListener("click", addToCart);




function addToCart() {
  const quantity = parseInt(document.querySelector("#quantity").value);

  const color = document.querySelector("#colors").value;

  const item = {
    id: idLink,
    quantity: quantity,
    color: color,
  };

  if (!quantity || !color) {
    alert("séléctionner quantité et couleur !");
    return;
  }
  const cart = getCart();

  const cartItem = cart.find((p) => p.id === item.id && p.color === item.color);
  if (cartItem) {
    cartItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

main();

/**
 * Crée du contenu text et HTML pour représenter l'objet sélectionné
 * @param {{imageUrl: string, altText: string, name: string, description: string, colors: array of string}} item
 *
 */

function displayItemSelected(item) {
  const image = document.createElement("img");
  document.querySelector("div.item__img").append(image);
  image.src = `${item.imageUrl}`;
  image.alt = `${item.altTxt}`;
  const title = document.querySelector("#title");
  title.innerText = `${item.name}`;
  const price = document.querySelector("#price");
  price.innerText = `${item.price}`;
  const description = document.querySelector("#description");
  description.innerText = `${item.description}`;
  const colorsArray = `${item.colors}`.split(",");
  colorsArray.forEach(function (colorItem) {
    const colors = document.createElement("option");
    document.querySelector("#colors").append(colors);
    colors.innerText = colorItem;
    colors.value = colorItem;
  });
  return;
}

async function main() {
  const r = await fetch(productLink, {
    headers: {
      Accept: "application/json",
    },
  });
  const item = await r.json();
  displayItemSelected(item);
}
