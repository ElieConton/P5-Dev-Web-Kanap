export function getCart() {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  return cart;
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
