const originalLink = new URL(window.location.href);
const orderId = originalLink.searchParams.get("orderId");


document.querySelector('#orderId').innerText =  orderId