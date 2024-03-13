let botonPapelera = document.querySelectorAll('.fa-trash')
let botonLike = document.querySelectorAll('.fa-thumbs-up')

Array.from(botonPapelera).forEach(element => {
    element.addEventListener('click', eliminarFrase)
})

Array.from(botonLike).forEach(element => {
    element.addEventListener('click', sumaLike)
})

async function eliminarFrase() {
    const fraseTexto = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('/eliminarFrase', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'fraseJs': fraseTexto
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function sumaLike() {
    const fraseTexto = this.parentNode.childNodes[1].innerText
    const likesTexto = Number(this.parentNode.childNodes[7].innerText)
    console.log(likesTexto)
    try{
        const response = await fetch('/sumarLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'fraseJs': fraseTexto,
                'likesJs': likesTexto
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
