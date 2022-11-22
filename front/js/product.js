
//Récupération id produit pour interroger l'API uniquement sur le produit sélectionné 
let originalLink = new URL(window.location.href)
let idLink = originalLink.searchParams.get('id')
let productLink = 'http://localhost:3000/api/products/' + idLink




/**
 * Crée du contenu text et HTML pour représenter l'objet sélectionné
 * @param {{imageUrl: string, altText: string, name: string, description: string, colors: array of string}} item 
 * 
 */


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
    return
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

 //essai récupération donnée item

//initialisation variable
 let productQuantity = 0
 let productStorage = {}
 let colorItem = document.querySelector("#colors").options[document.querySelector('#colors').selectedIndex].text
 let itemOnCart = {}
 let itemOnCartJson = JSON.stringify({})
 
 /**
  * A chaque changement de couleur dans le select #colors attribue le texte de l'option séléctionné par l'utilisateur
  */
 function OnColorChange () {
     colorItem = colorItemEvent.options[document.querySelector('#colors').selectedIndex].text
     console.log(colorItem)
     itemOnCart = {
        id : idLink,
        quantity : productQuantity,
        color : colorItem
     }
     console.log(itemOnCart)
 }
 
 /**
  * A chaque changement de quantité dans le input #quantity attribue le nombre séléctionné par l'utilisateur
  */
 function OnQuantityChange () {
     productQuantity = parseInt(productQuantityEvent.value)
     console.log(productQuantity)
     itemOnCart = {
        id : idLink,
        quantity : productQuantity,
        color : colorItem
     }
     console.log(itemOnCart)
 }
 
 let colorItemEvent = document.querySelector("#colors")
 colorItemEvent.addEventListener('change', OnColorChange)
 
 let productQuantityEvent = document.querySelector('#quantity')
 productQuantityEvent.addEventListener('change', OnQuantityChange)
 
 
 
 //essai localStorage

function itemLocalStorage () {
    let itemOnCartJson = JSON.stringify(itemOnCart)
    localStorage.setItem("item", itemOnCartJson)
}

const button = document.querySelector('#addToCart')
button.addEventListener('click', itemLocalStorage)