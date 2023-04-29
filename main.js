//variables
const inputMessage = document.querySelector('#write-data');
const regex = /^[a-z ]*$/;  //expresión re. solo acepta letras no mayúsculas

const encrypt = document.querySelector('#encriptar')
const containerAside = document.querySelector('.container-aside')
const decrypt = document.querySelector('#desencriptar')

pageEvents()

function pageEvents() {

    inputMessage.addEventListener('keyup', alertMensaje)
    encrypt.addEventListener('click', encryptButton)
    containerAside.addEventListener('click', searchButtonCopy)
    decrypt.addEventListener('click', decryptButton)
};


//funciones

function alertMensaje() {

    if( regex.exec(inputMessage.value) ) {

        document.querySelector('.form_textarea').classList.remove('border-red')
        document.querySelector('#excellent').style = 'display: block'
        document.querySelector('#message').style.color = '#0a3871'
        document.querySelector('#mistake').style = 'display: none'
        
        inputEmpty()    //quitar el check de excellent
        
    } else {
        
        document.querySelector('.form_textarea').classList.add('border-red')
        document.querySelector('#mistake').style = 'display: block'
        document.querySelector('#message').style.color = '#ff0000'
        document.querySelector('#excellent').style = 'display: none'
    }
};

function inputEmpty() {

    if( inputMessage.value == "" ) {

        document.querySelector('#excellent').style = 'display: none'
        document.querySelector('#message')
        .textContent = "Solo letras minúsculas y sin acentos"
    }
}

function encryptButton(e) {

    let encriptedMessage = ""

    e.preventDefault()

    //Si no cumple con el formulario
    if ( inputMessage.value === "" || !regex.exec(inputMessage.value)) {
        
        let inputAlert = document.querySelector('#message')
        inputAlert.textContent = "Escribe solo texto para poder encriptar el mensaje"
        inputAlert.style.color = '#ff0000'

        return inputAlert
    }


    //encriptar textos
    for ( let i = 0; i < inputMessage.value.length; i++ ) {

        switch ( inputMessage.value[i] ) {

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
                encriptedMessage += inputMessage.value[i]
        }
    }

    //Mostrar el mensaje encriptado en la página
    addCopyButton(encriptedMessage)

    inputMessage.value = ""

    inputEmpty()
    
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
};

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
};

function decryptButton(e) {
    
    e.preventDefault()
    
    let encryptedMessage = inputMessage.value

    if ( inputMessage.value === "" || !regex.exec(inputMessage.value)) {
        
        let inputAlert = document.querySelector('#message')
        inputAlert.textContent = "No hay mensaje o no cumple con la referencia"
        inputAlert.style.color = '#ff0000'

        return inputAlert
    }

    encryptedMessage = encryptedMessage
    .replaceAll("enter", 'e')
    .replaceAll("imes", 'i')
    .replaceAll("ai", 'a')
    .replaceAll("ober", 'o')
    .replaceAll("ufat", 'u')

    addCopyButton(encryptedMessage)

    inputMessage.value = ""

    inputEmpty()
};
