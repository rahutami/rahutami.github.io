// Defining and assigning value

// Default max score and starting p1 and p2 score
let maxScore = 5;
let p1Score = 0;
let p2Score = 0;

// Default names
let p1Name = "Player 1";
let p2Name = "Player 2";

// Displayed players' scores
let displayedP1Score = document.getElementById('p1-score');
let displayedP2Score = document.getElementById('p2-score');

// Add score buttons
let p1Button = document.getElementById('add-player1');
let p2Button = document.getElementById('add-player2');

// Change score to win button
let getTo = document.getElementById('get-to');

// Reset button
let resetBtn = document.getElementById('reset-btn');

// Change player name button
let nameSubmit = document.getElementById("change-name");

// Change score button
let changeScore = document.getElementById('change-score');

// Even listeners
p1Button.addEventListener('click', addScoreOne);
p2Button.addEventListener('click', addScoreTwo);
resetBtn.addEventListener('click', resetBoard);
nameSubmit.addEventListener('submit', changeNames);
changeScore.addEventListener('submit', changeMaxScore);

// Function called when the reset button is clicked
function resetBoard(e){
    e.preventDefault();
    p1Score = 0;
    displayedP1Score.innerHTML=`<h1>${p1Score}</h1>`;
    p2Score = 0;
    displayedP2Score.innerHTML=`<h1>${p1Score}</h1>`;
    displayedP1Score.classList.remove('win');
    displayedP2Score.classList.remove('win');
    getTo.innerHTML=`Get to ${maxScore} to win!`;

}

// Function called when the "Player 1" button is clicked
function addScoreOne(e){
    e.preventDefault();
    if(p1Score<maxScore && p2Score<maxScore){
        displayedP1Score.innerHTML=`<h1>${++p1Score}</h1>`;
        if(p1Score===maxScore){
            displayedP1Score.classList.add('win');
            getTo.innerHTML = `${p1Name} won!`;
        }
    }
}

// Function called when the "Player 2" button is clicked
function addScoreTwo(e){
    e.preventDefault();
    if(p1Score<maxScore && p2Score<maxScore){
        displayedP2Score.innerHTML=`<h1>${++p2Score}</h1>`;
        if(p2Score===maxScore){
            displayedP2Score.classList.add('win');
            getTo.innerHTML = `${p2Name} won!`;
        }
    }
}

// Function called when change name button clicked
function changeNames(event){
    event.preventDefault();

    // Defining players' name holder
    let p1NameHolder = document.getElementById('p1-name');
    let p2NameHolder = document.getElementById('p2-name');

    // Getting names inputted
    p1Name = document.getElementById('p1-new-name').value;
    p2Name = document.getElementById('p2-new-name').value;

    // In case player only insert one player name
    if (p1Name === ""){
        p1Name = 'Player 1';
    }
    if (p2Name === ""){
        p2Name = 'Player 2';
    }

    // Changing the names displayed
    p1NameHolder.innerHTML=p1Name;
    p2NameHolder.innerHTML=p2Name;


    p1Button.innerHTML = `<button>${p1Name}</button>`;
    p2Button.innerHTML = `<button>${p2Name}</button>`;

}

// Function called when change score button clicked
function changeMaxScore(e){
    e.preventDefault();
    maxScore= Number(document.getElementById('score-to-win').value);
    getTo.innerHTML=`Get to ${maxScore} to win!`;
    resetBoard(e);
}
