//variables
const writeData = document.querySelector('#write-data');
const regex = /^[a-z ]*$/;  //expresión re. solo acepta letras no mayúsculas

const encrypt = document.querySelector('#encriptar')
const containerAside = document.querySelector('.container-aside')

eventos()

function eventos() {

    writeData.addEventListener('keyup', alertMensaje)
    encrypt.addEventListener('click', encryptButton)
    containerAside.addEventListener('click', searchButtonCopy)
};


//funciones

function alertMensaje() {

    if( regex.exec(writeData.value) ) {

        document.querySelector('.form_textarea').classList.remove('border-red')
        document.querySelector('#excellent').style = 'display: block'
        document.querySelector('#message').style.color = '#0a3871'
        document.querySelector('#mistake').style = 'display: none'
        
        if( writeData.value == "" ) {

            document.querySelector('#excellent').style = 'display: none'
            document.querySelector('#message')
            .textContent = "Solo letras minúsculas y sin acentos"
        }
        
    } else {
        
        document.querySelector('.form_textarea').classList.add('border-red')
        document.querySelector('#mistake').style = 'display: block'
        document.querySelector('#message').style.color = '#ff0000'
        document.querySelector('#excellent').style = 'display: none'
    }
};

function encryptButton(e) {

    let encriptedMessage = ""

    e.preventDefault()

    //Si no cumple con el formulario
    if ( writeData.value === "" || !regex.exec(writeData.value)) {
        
        let inputAlert = document.querySelector('#message')
        inputAlert.textContent = "Escribe Solo texto"
        inputAlert.style.color = '#ff0000'

        return inputAlert
    }


    //encriptar textos
    for ( let i = 0; i < writeData.value.length; i++ ) {

        switch ( writeData.value[i] ) {

            case 'e':
                encriptedMessage += "enter"
                break;
            case 'i':
                encriptedMessage += "imes"
                break;
            case 'a':
                encriptedMessage += "ai"
                break;
            case 'o':
                encriptedMessage += "ober"
                break;
            case 'u':
                encriptedMessage += "ufat"
                break;
        
            default:
                encriptedMessage += writeData.value[i]
        }
    }

    //Mostrar el mensaje encriptado en la página
    addCopyButton(encriptedMessage)

    writeData.value = ""
    
};

function addCopyButton(text) {

    //resetear html
    containerAside.innerHTML = ""

    //crear boton copiar
    const DIV = document.createElement('div')
    DIV.innerHTML = `
        <p class="message">${text}</p>
        <button class="copy">Copiar</button>
    `
    DIV.classList.add('container-aside__button')

    containerAside.appendChild(DIV)
}

function searchButtonCopy(e) {
    

    if( e.target.classList.contains("copy") ) {
        
        let messageEncripted = document.querySelector('.message').textContent
        document.querySelector('.copy').textContent = "Copiado"

        let textArea = document.createElement('textarea')
        document.body.appendChild(textArea)
        textArea.textContent = messageEncripted

        textArea.select()
        document.execCommand('copy')
        textArea.remove()
    }
}
