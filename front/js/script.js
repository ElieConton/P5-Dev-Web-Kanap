/**
 *  Crée un élément HTML qui représentera un objet en vente
 * @param {{id: string, imageUrl: string, altText: string, name: string, description: string}} item 
 * @returns 
 */

function createArticle(item) {
    const article = document.createElement('a')
        article.setAttribute('href', `./product.html?id=${item._id}`)
        article.innerHTML = `<article>
        <img src="${item.imageUrl}" alt="${item.altTxt}">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
        </article>
    `
    return article
}

async function main () {
    const wrapper = document.querySelector('#items')
    const r = await fetch('http://localhost:3000/api/products' , {
        headers: {
        Accept: 'application/json'
        }
    })
    const items = await r.json()
    for (let item of items) {
    wrapper.append(createArticle(item))
    }
}
 main()


