let botonPapelera = document.querySelectorAll('.fa-trash')

Array.from(botonPapelera).forEach(element => {
    element.addEventListener('click', eliminarFrase)
})

async function eliminarFrase() {
    const fraseTexto = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('/eliminarFrase', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'fraseJS': fraseTexto
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
