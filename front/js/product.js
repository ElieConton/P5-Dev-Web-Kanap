let t = new URL(window.location.href)
let o = t.searchParams.get('id')
console.log(o)

let u = 'http://localhost:3000/api/products/' + o
console.log(u)
