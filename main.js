//variables
const writeData = document.querySelector('#write-data');
const regex = /^[a-z ]*$/;  //expresión re. solo acepta letras no mayúsculas

writeData.addEventListener('keyup', alertMensaje);

//funciones

function alertMensaje() {

    if( regex.exec(writeData.value) ) {

        document.querySelector('.form_textarea').classList.remove('border-red')
        document.querySelector('#excellent').style = 'display: block'
        document.querySelector('#message').style.color = '#0a3871'
        document.querySelector('#mistake').style = 'display: none'
        
        if( writeData.value == "" ) {

            document.querySelector('#excellent').style = 'display: none'
        }
        
    } else {
        
        document.querySelector('.form_textarea').classList.add('border-red')
        document.querySelector('#mistake').style = 'display: block'
        document.querySelector('#message').style.color = '#ff0000'
        document.querySelector('#excellent').style = 'display: none'
    }
};