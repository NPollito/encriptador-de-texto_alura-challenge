//variables
const inputMessage = document.querySelector('#write-data');
const regex = /^[a-zñ ]*$/;  //expresión regular. solo acepta letras (no mayúsculas)
const btnEncrypt = document.querySelector('#btn_encriptar');
const btnDecrypt = document.querySelector('#btn_desencriptar')
const btnDelete = document.querySelector('#delete')
const tableBody = document.querySelector('.table__body')

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
let id = 1

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

    // Inyectar el mensaje en el historial
    tableBody.appendChild(recordHTML(id, message))
    
    document.body.appendChild(alertHTML("Mensaje encriptado correctamente", message, "Copiar"))

    id++
    
    inputMessage.value = ""
}

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
            <span class="close" title="Cerrar"><i class="fa-solid fa-xmark"></i></span>
        </section>
    `

    alert.querySelector('.aside__button').addEventListener('click', (e) => {

        e.preventDefault()

        //copiar el mensage cifrado
        if ( nameButton == "Copiar") {
            
            copyText(message)
        }

        //eliminar la alerta creada
        alert.remove()

        document.body.style.overflow = 'auto'
        
    })

    //cerrar la ventana de alerta
    alert.querySelector('.close').addEventListener('click', () => {

        alert.remove()

        document.body.style.overflow = 'auto'
    })


    btnDelete.style.display = 'none'
    statusButtons(0.5, true)

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

// tab historial

function recordHTML(id, message) {

    const tr = document.createElement('TR')
    
    tr.innerHTML = `
        <td>${id}</td>
        <td>${message}</td>
        <td><i class="fa-regular fa-clone" title="Copiar"></i></td>
        <td><i class="fa-solid fa-trash" title="Borrar"></i></td>
    `

    //copiar mensaje
    tr.querySelector('.fa-clone').addEventListener('click', () => copyText(message))

    //eliminar mensaje
    tr.querySelector('.fa-trash').addEventListener('click', () => tr.remove())
    
    return tr
}