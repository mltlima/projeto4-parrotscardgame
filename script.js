let numCards = 0;
var isItTheSecondCard = false;
let card1 = null;
let card2 = null;
let gameLocked = false;
let cardsTurnedRight = 0;
let cardsTurned = 0;
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


function shuffle() {

    deck.sort(comparator);

    for (let i = 0; i < numCards/2; i++) {
        shuffledDeck.push(deck[i]);
        shuffledDeck.push(deck[i]);
    }

    shuffledDeck.sort(comparator);
    
}

function comparator() { 
	return Math.random() - 0.5; 
}

function generateDeck() {

    const main = document.querySelector("main");
    shuffle()

    for (let i = 0; i < numCards ; i++) {
        main.innerHTML += `<div class="card" onclick="playCard(this)">
                                <div class="front-card">
                                    <img src="assets/front.png">
                                </div>
                                <div class="back-card hide">
                                <img class="toCompare"src="${shuffledDeck[i]}">
                                </div>
                            </div>
                        `
    }
}

function turnCard(card) {

    let cardBack = card.querySelector(".back-card");
    let cardFront = card.querySelector(".front-card");
        card.classList.toggle("flip");
        cardFront.classList.toggle("hide");
        cardBack.classList.toggle("hide");
}

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
            setTimeout(() =>{  
                turnCard(card1);
                turnCard(card2);
                gameLocked = false;
            }, 1000);  
        }else {
            card1.removeAttribute("onclick");
            card2.removeAttribute("onclick");
            cardsTurnedRight ++;
            checkEndGame();
        }
    } else if(!gameLocked){ 
            turnCard(card);
            card1 = card;
            isItTheSecondCard = true;
            cardsTurned ++;
    }

}

function checkEndGame() {
    if (cardsTurnedRight === numCards/2) {
        alert(`Você ganhou em ${cardsTurned} jogadas`);
    }
}

function startGame() {
    
    //Validates number inputted by user
    while (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
        numCards = prompt("insira número par de cartas de 4 a 14");
    }

    generateDeck();
}