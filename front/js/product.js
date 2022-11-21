let originalLink = new URL(window.location.href)
let idLink = originalLink.searchParams.get('id')
let productLink = 'http://localhost:3000/api/products/' + idLink




function displayItemSelected (item) {
    const image = document.createElement('img')
        document.querySelector('div.item__img').append(image)
        image.src = `${item.imageUrl}`
        image.alt = `${item.altTxt}`
    const title = document.querySelector('#title')
        title.innerText = `${item.name}` 
    const price = document.querySelector('#price')
        price.innerText = `${item.price}`
    const description = document.querySelector('#description')
        description.innerText = `${item.description}`
    const colors = `${item.colors}`
    const colorsArray = colors.split(',')
    const colorWrapper = document.querySelector('#colors')
    colorsArray.forEach(function(colorItem){
        const optionColor = new Option (colorItem, colorItem)
        colorWrapper.options[colorWrapper.options.length] = optionColor 
    })
}

async function main () {
    const r = await fetch(productLink , {
        headers: {
        Accept: 'application/json'
        }
    })
    const item = await r.json()
    displayItemSelected(item)
}
 main()

 