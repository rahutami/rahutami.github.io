function changeColor(){
    let r = randomNumber();
    let g = randomNumber();
    let b = randomNumber();
    document.body.style.backgroundColor=`rgb(${r},${g},${b})`;
    rgbCode.innerHTML = `rgb(${r},${g},${b})`;
    hexCode.innerHTML = rgbToHex(r,g,b);
}

function randomNumber(){
    return Math.floor(Math.random() * 256);
}

function rgbToHex(r,g,b){
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

function componentToHex(c){
    let hex = c.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
}

let colorBtn = document.getElementById('color-btn');
let isWhite = true;

const rgbCode = document.getElementById('rgb-code');
const hexCode = document.getElementById('hex-code');

colorBtn.addEventListener('click', changeColor);

changeColor();

