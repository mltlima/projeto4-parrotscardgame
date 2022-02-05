let numCards = 0;
var isItTheSecondCard = false;
let card1 = null;
let card2 = null;
let gameLocked = false;
let cardsTurnedRight = 0;
let cardsTurned = 0;
const stopwatch = document.querySelector(".stopwatch");
let interval = null;
let seconds = 0;
let minutes = 0;
const deck = [
    "assets/bobrossparrot.gif",
    "assets/explodyparrot.gif",
    "assets/fiestaparrot.gif",
    "assets/metalparrot.gif",
    "assets/revertitparrot.gif",
    "assets/tripletsparrot.gif",
    "assets/unicornparrot.gif"
];
const shuffledDeck = [];

/**
 * Start the stopwatch clock
 * once the seconds get to 60 the minutes are incremented and the 
 * seconds get back to 0
 */
function startClock() {   
    interval = setInterval(() => {
        seconds++;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (seconds == 60) {
            seconds = "00";
            minutes++;
        }
        if (minutes < 10) {
            stopwatch.innerHTML = `0${minutes}:${seconds}`
        } else {
            stopwatch.innerHTML = `${minutes}:${seconds}`
        }
    },1000) 
} startClock();

/**
 * Shuffle the initial deck and then get the number of cards inputted by
 * the user
 */
function shuffle() {

    deck.sort(comparator);

    for (let i = 0; i < numCards/2; i++) {
        shuffledDeck.push(deck[i]);
        shuffledDeck.push(deck[i]);
    }

    shuffledDeck.sort(comparator);
    
}

/**
 * Function to generate a random number
 * @returns random number
 */
function comparator() { 
	return Math.random() - 0.5; 
}

/**
 * Creates a random deck and then uses DOM to create the cards in html
 */
function generateDeck() {

    const main = document.querySelector("main");
    shuffle()

    for (let i = 0; i < numCards ; i++) {
        main.innerHTML += `<div class="card" onclick="playCard(this)" data-identifier="card">
                                <div class="front-card" data-identifier="front-face">
                                    <img src="assets/front.png">
                                </div>
                                <div class="back-card hide" data-identifier="back-face">
                                <img class="toCompare"src="${shuffledDeck[i]}">
                                </div>
                            </div>
                        `
    }
}


/**
 * Turns a card clicked by the user
 * @param {*} card card to be turned
 */
function turnCard(card) {

    let cardBack = card.querySelector(".back-card");
    let cardFront = card.querySelector(".front-card");
        card.classList.toggle("flip");
        cardFront.classList.toggle("hide");
        cardBack.classList.toggle("hide");
}

/**
 * Validate card clicked by the user, checks if the game is locked (User clicked on the second card)
 * if not turns the card unlocks the possibility to turn the second card to be compared. If the user
 * clicked on the same card input is not accepted, otherwise, the second card is turned and then compared
 * @param {*} card card clicked by the user
 */
function playCard(card) {
    
    if (isItTheSecondCard) { 
        //Keep waiting for user to click in a card
        //different than the first clicked
        if (card.isEqualNode(card1)) return;
        
        turnCard(card);
        card2 = card;
        isItTheSecondCard = false;
        cardsTurned;

        if (!card1.isEqualNode(card2)) {
            gameLocked = true;
            setTimeout(() =>{  // 1 second to turn the cards back if they are not equal
                turnCard(card1);
                turnCard(card2);
                gameLocked = false;
            }, 1000);  
        }else { // cards are equal, so user cannot click then anymore
            card1.removeAttribute("onclick");
            card2.removeAttribute("onclick");
            cardsTurnedRight ++;
            checkEndGame();
        }
    } else if(!gameLocked){ //Fist card to be turned
            turnCard(card);
            card1 = card;
            isItTheSecondCard = true;
            cardsTurned ++;
    }

}

/**
 * Verifies if the all the cards are turned
 */
function checkEndGame() {
    if (cardsTurnedRight === numCards/2) {
        clearInterval(interval);
        alert(`Você ganhou em ${cardsTurned} jogadas e com o tempo de: ${minutes}:${seconds} `);

        let newGame = prompt("Gostaria de reiniciar a partida?").toUpperCase();
        if (newGame === "SIM") {
            window.location.reload()
        }
    }
}

/**
 * Function to start the memory game
 */
function startGame() {
    
    //Validates number inputted by user
    while (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
        numCards = prompt("insira número par de cartas de 4 a 14");
    }

    generateDeck();
}