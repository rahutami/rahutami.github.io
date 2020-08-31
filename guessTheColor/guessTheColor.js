let newBtn = document.getElementById('new-btn');
let rgbCode = document.getElementById('rgb-code');
let boxes = document.querySelectorAll('div.box');
let correctness = document.getElementById('correctness');
let choices = document.getElementById('choices');

let ansCode = 'rgb(0,0,0)';

let ansChoice;

generateNewCode();

newBtn.addEventListener('click', generateNewCode);
for(let i=0; i<boxes.length; i++){
    boxes[i].addEventListener('click', checkAnswer);
}

function generateNewCode(){

    ansCode = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    rgbCode.innerHTML=ansCode;
    ansChoice = Number(Math.floor(Math.random()*6));
    correctness.style.color='#a5d6e4';
    choices.classList.remove('clicked');

    for (let i=0; i<boxes.length; i++){
        changeColor(boxes[i], i);
        boxes[i].classList.remove('correct-ans');

    }

    console.log(ansCode);
}

function randomColor(){
    return Math.floor(Math.random()*266);
}

function changeColor(box, index){
    if(index===ansChoice){
        box.style.background = ansCode;
    } else {
        box.style.background = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    }
}

function checkAnswer(e){
    e.preventDefault();
    if(choices.classList.contains('clicked')){
        // nothing
    }else if(e.target===boxes[ansChoice]){
        correctness.innerHTML="Correct!";
        correctness.style.color='green';
        choices.classList.add('clicked');
    } else {
        correctness.innerHTML="Wrong!";
        correctness.style.color='red';
        choices.classList.add('clicked');
    }
    boxes[ansChoice].classList.add('correct-ans');

}