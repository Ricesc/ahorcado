let palabra;
let errores = 0;
let aciertos = 0;

const palabras = ['progaramar','gobierno','adivinar','murcielago','esquizofrenia','bicarbonato','caramelos','hamburguesa','mermelada','reliquia','extraño'];

const btn = id('play');
const imagen = id('imagen');
const btn_letras = document.querySelectorAll('#letras button');

btn.addEventListener('click', iniciar );

function id(str){
    return document.getElementById(str);
}

function obtener_random(num_min,num_max){
    const amplitud_valores = num_max - num_min;
    const valor_random = Math.floor(Math.random() * amplitud_valores)
    + num_min;
    return valor_random;
}

function iniciar(event){
    id('titulo').innerHTML= "Adivina la palabra!"
    id('resultado').innerHTML = "";
    imagen.src = `./img/ahorcado0.png`;
    btn.disabled = true;
    errores = 0;
    aciertos = 0;

    const parrafo = id('adivinar');
    parrafo.innerHTML = '';

    const cant_palabras = palabras.length;
    const valor_random = obtener_random( 0,cant_palabras);
    
    palabra = palabras[valor_random];
    console.log(palabra);
    const cant_letras = palabra.length;

    for(let i = 0; i < btn_letras.length ; i++){
        btn_letras[i].disabled = false;
    }

    for( let i = 0; i < cant_letras; i++){
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
}

for(let i = 0; i < btn_letras.length ; i++){
    btn_letras[i].addEventListener('click', click_letras);
}

function click_letras(event){
    const spans = document.querySelectorAll('#adivinar span')
    const button = event.target;
    button.disabled = true;
    const letra = button.innerHTML;
    const word = palabra.toUpperCase();

    let acerto = false;
    for( let i = 0; i < word.length; i++){
        if( letra == word[i]){
            spans[i].innerHTML = letra
            aciertos++;
            acerto = true;
        } 
    }
    if( acerto == false ){
        errores++;
        const sourse = `./img/ahorcado${errores}.png`;
        imagen.src = sourse;    
    }

    if( errores == 7 ){
        id('resultado').innerHTML = "Perdiste la respuesta era: " + palabra.toUpperCase();
        game_over();
    }else if( aciertos == palabra.length ){
        id('resultado').innerHTML = "GANASTE!!";
        game_over();
    }
    console.log("la letra " + letra + " en la palabra " + word + " ¿existe? "+ acerto);
}

function game_over(){
    for(let i = 0; i < btn_letras.length ; i++){
        btn_letras[i].disabled = true;
    }
    btn.disabled = false;
}

game_over();