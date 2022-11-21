/**
 *  Crée un élément HTML qui représentera un objet en vente
 * @param {{id: string, imageUrl: string, altText: string, name: string, description: string}} item 
 * @returns 
 */

function createNewItem(item) {
    const anchor = document.createElement('a')
        anchor.setAttribute('href', `./product.html?id=${item._id}`)
    const article = document.createElement('article')
        anchor.appendChild(article)
    const image = document.createElement('img')
        article.appendChild(image)
        image.src = `${item.imageUrl}`
        image.alt = `${item.altTxt}`
    const itemName = document.createElement('h3')
        article.appendChild(itemName)
        itemName.className = 'productName'
        itemName.innerText = `${item.name}`
    const description = document.createElement('p')
        article.appendChild(description)
        description.className = 'productDescription'
        description.innerText = `${item.description}`

    return anchor
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
    wrapper.append(createNewItem(item))
    }
}
 main()


