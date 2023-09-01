//variables
const inputMessage = document.querySelector('#write-data');
const regex = /^[a-zñ ]*$/;  //expresión regular. solo acepta letras no mayúsculas
const btnEncrypt = document.querySelector('#btn_encriptar');
const btnDecrypt = document.querySelector('#btn_desencriptar')
const btnDelete = document.querySelector('#delete')

//evento
inputMessage.addEventListener('input', validate)
btnEncrypt.addEventListener('click', encryptText)
btnDecrypt.addEventListener('click', decryptText)

//funciones
function validate(e) {

    if( e.target.value.trim() === "" ) {

        showAlert("Ingrese el mensaje", true)
        btnDelete.style.display = 'none'
        return
    }

    if ( !validateMessage(e.target.value) ){

        showAlert("Solo aceptamos letras de la A hasta la Z", true)
        showDeleteButton()
        return
    }

    showAlert("Solo letras minúsculas y sin acentos", false)
    showDeleteButton()

}

function showAlert(message, boolean) {

    if ( boolean ) {
        
        // actualizar el textarea
        document.querySelector('.form__icon').style.color = '#ca6565'
        document.querySelector('.form__message').style.color = '#ca6565'
        inputMessage.style.borderColor = '#ca6565'
        document.querySelector('.form__message').innerText = message

        // actualizar estado de los botones
        statusButtons(0.5, true)
    } else {

        document.querySelector('.form__icon').style.color = '#ffffff'
        document.querySelector('.form__message').style.color = '#ffffff'
        inputMessage.style.borderColor = '#ffffff'
        document.querySelector('.form__message').innerText = message

        statusButtons(1, false)
    }
};

function statusButtons(opacity, boolean) {

    btnEncrypt.style.opacity = opacity
    btnEncrypt.disabled = boolean
    btnDecrypt.style.opacity = opacity
    btnDecrypt.disabled = boolean
} 

function showDeleteButton() {
    
    btnDelete.style.display = 'block'

    btnDelete.addEventListener('click', () => {

        if ( inputMessage.value == "" ) {

            btnDelete.style.display = 'none'

            showAlert("Solo letras minúsculas y sin acentos", true)
        }
        
        inputMessage.value = ""
    })
};

function validateMessage(message) {

    const result = regex.test(message)
    return result
};

// funciones para encriptar y desencriptar

function encryptText(e) {
    
    e.preventDefault()

    let message = ""

    message = inputMessage.value
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat")

    //segunda opción
    /*for (let i = 0; i < inputMessage.value.length; i++) {
        
        switch ( inputMessage.value[i] ) {

            case 'e':
                message += "enter"
                break;
            case 'i':
                message += "imes"
                break;
            case 'a':
                message += "ai"
                break;
            case 'o':
                message += "ober"
                break;
            case 'u':
                message += "ufat"
                break;
        
            default:
                message += inputMessage.value[i]
        }
    }*/

    document.body.appendChild(alertHTML("Mensaje encriptado correctamente", message, "Copiar"))

    inputMessage.value = ""
}

function alertHTML(title, message, nameButton) {
    
    //bloquear scroll
    document.body.style.overflow = 'hidden'

    // Crear alerta y inyectar en el dom
    const alert = document.createElement('ASIDE')

    alert.classList.add('aside')

    alert.innerHTML = `
        <section class="aside__container">
            <i class="fa-solid fa-circle-check"></i>
            <p class="aside__title">${title}</p>
            <h3 class="aside__message">${message}</h3>
            <button class="aside__button">${nameButton}</button>
        </section>
    `

    alert.querySelector('.aside__button').addEventListener('click', (e) => {

        e.preventDefault()

        //copiar el mensage cifrado
        if ( nameButton == "Copiar") {
            
            copyText(message)
        }
        
        btnDelete.style.display = 'none'
        
        statusButtons(0.5, true)

        //eliminar la alerta creada
        alert.remove()
        
        document.body.style.overflow = 'auto'
    })

    return alert
}

function copyText(message) {
    
    const textArea = document.createElement('TEXTAREA');
    textArea.textContent = message
    document.body.append(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
};

function decryptText(e) {

    e.preventDefault()
    
    let message = ""

    message = inputMessage.value
    .replaceAll("enter", 'e')
    .replaceAll("imes", 'i')
    .replaceAll("ai", 'a')
    .replaceAll("ober", 'o')
    .replaceAll("ufat", 'u')

    document.body.appendChild(alertHTML("El mensaje es:", message, "Aceptar"))

    inputMessage.value = ""
}

// pageEvents()

// function pageEvents() {

//     inputMessage.addEventListener('keyup', alertMensaje)
//     encrypt.addEventListener('click', encryptButton)
//     containerAside.addEventListener('click', searchButtonCopy)
//     decrypt.addEventListener('click', decryptButton)
// };


// //funciones

// function alertMensaje() {

//     if( regex.exec(inputMessage.value.trim()) ) {

//         document.querySelector('.form_textarea').classList.remove('border-red')
//         document.querySelector('#excellent').style = 'display: block'
//         document.querySelector('#message').style.color = '#0a3871'
//         document.querySelector('#mistake').style = 'display: none'
        
//         inputEmpty()    //quitar el check de excellent
        
//     } else {
        
//         document.querySelector('.form_textarea').classList.add('border-red')
//         document.querySelector('#mistake').style = 'display: block'
//         document.querySelector('#message').style.color = '#ff0000'
//         document.querySelector('#excellent').style = 'display: none'
//     }
// };

// function inputEmpty() {

//     if( inputMessage.value.trim() == "" ) {

//         document.querySelector('#excellent').style = 'display: none'
//         document.querySelector('#message')
//         .textContent = "Solo letras minúsculas y sin acentos"
//     }
// }

// function encryptButton(e) {

//     let encriptedMessage = ""

//     e.preventDefault()

//     //Si no cumple con el formulario
//     if ( inputMessage.value.trim() === "" || !regex.exec(inputMessage.value.trim())) {
        
//         let inputAlert = document.querySelector('#message')
//         inputAlert.textContent = "Escribe solo texto para poder encriptar el mensaje"
//         inputAlert.style.color = '#ff0000'

//         return inputAlert
//     }


//     //encriptar textos
//     for ( let i = 0; i < inputMessage.value.length; i++ ) {

//         switch ( inputMessage.value[i] ) {

//             case 'e':
//                 encriptedMessage += "enter"
//                 break;
//             case 'i':
//                 encriptedMessage += "imes"
//                 break;
//             case 'a':
//                 encriptedMessage += "ai"
//                 break;
//             case 'o':
//                 encriptedMessage += "ober"
//                 break;
//             case 'u':
//                 encriptedMessage += "ufat"
//                 break;
        
//             default:
//                 encriptedMessage += inputMessage.value[i]
//         }
//     }

//     //Mostrar el mensaje encriptado en la página
//     addCopyButton(encriptedMessage)

//     inputMessage.value = ""

//     inputEmpty()
    
// };

// function addCopyButton(text) {

//     //resetear html
//     containerAside.innerHTML = ""

//     //crear boton copiar
//     const DIV = document.createElement('div')
//     DIV.innerHTML = `
//         <p class="message">${text}</p>
//         <button class="copy">Copiar</button>
//     `
//     DIV.classList.add('container-aside__button')

//     containerAside.appendChild(DIV)
// };

// function searchButtonCopy(e) {
    
//     if( e.target.classList.contains("copy") ) {
        
//         let messageEncripted = document.querySelector('.message').textContent.trim()
//         document.querySelector('.copy').textContent = "Copiado"

//         let textArea = document.createElement('textarea')
//         document.body.appendChild(textArea)
//         textArea.textContent = messageEncripted

//         textArea.select()
//         document.execCommand('copy')
//         textArea.remove()
//     }
// };

// function decryptButton(e) {
    
//     e.preventDefault()
    
//     let encryptedMessage = inputMessage.value

//     if ( inputMessage.value.trim() === "" || !regex.exec(inputMessage.value.trim())) {
        
//         let inputAlert = document.querySelector('#message')
//         inputAlert.textContent = "No hay mensaje o no cumple con la referencia"
//         inputAlert.style.color = '#ff0000'

//         return inputAlert
//     }

//     encryptedMessage = encryptedMessage
//     .replaceAll("enter", 'e')
//     .replaceAll("imes", 'i')
//     .replaceAll("ai", 'a')
//     .replaceAll("ober", 'o')
//     .replaceAll("ufat", 'u')

//     addCopyButton(encryptedMessage)

//     inputMessage.value.trim() = ""

//     inputEmpty()
// };
