let randomNumber = parseInt(Math.random().toFixed(2) * 100 + 1); //generate random number
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
// this userInput not give value its return the ( <input type="text" id="guessField" class="guessField"> )
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

//create a paragraph
const p = document.createElement('p');
let prevGuess = []
let numGuess = 1
let playGame = true

//check if i available for playing game 
if(playGame){
    submit.addEventListener("click", function(e){
        e.preventDefault() // it stop server to get value
        const guess = parseInt(userInput.value)
        // console.log(guess);
        validateGuess(guess)
    })

}

//function 
function validateGuess(guess){
    if(isNaN(guess)){ //isNaN:- is not a number
        alert('please enter a valid number')
    }else if ( guess < 1){
        alert('please enter greater then 0.')
    }else if( guess > 100){
        alert('plese enter less then 100.')
    }else{
        prevGuess.push(guess)
        if (numGuess === 11){
            displayGuess(guess)
            displayMessage(`game over. Random number was ${randomNumber}`);
            endGame()
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }

}

function checkGuess (guess){
    if(guess === randomNumber){
        displayMessage("you guessed right.");
        endGame()
    }else if(guess < randomNumber){
        displayMessage( "number is too low.");
    }else if(guess > randomNumber){
        displayMessage( "number is too high.");
    }
}

//dom menupulation do here :- clean value / update remaining 
function displayGuess(guess){
    userInput.value = "";
    guessSlot.innerHTML +=`${guess}, `;
    numGuess ++;
    remaining.innerHTML = `${11 - numGuess}`
}

// message in lowOrHi
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;

}

function endGame(){
    userInput.value = ""// this clean he user input 
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id= "newGame">Start new Game </h2>`;
    startOver.appendChild(p)
    playGame = false
    newGame();
    
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random().toFixed(2) * 100 + 1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ""
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
        lowOrHi.innerHTML = ``

    })

}