let numCards = 0;
var isItTheSecondCard = false;
let card1 = null;
let card2 = null;
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
        setTimeout(cardFront.classList.toggle("hide"),1000);
        setTimeout(cardBack.classList.toggle("hide"),1000);
}

function playCard(card) {
    
    if (isItTheSecondCard) { 
        turnCard(card);
        card2 = card;
        isItTheSecondCard = false;
        if (!card1.isEqualNode(card2)) {
            setTimeout(() =>{  
                turnCard(card1);
                turnCard(card2);
            }, 1000);  
        }else {
            card1.removeAttribute("onclick");
            card2.removeAttribute("onclick");
        }
    } else { 
            turnCard(card);
            card1 = card;
            isItTheSecondCard = true;
    }

}

function startGame() {
    
    //Validates number inputted by user
    while (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
        numCards = prompt("insira número par de cartas de 4 a 14");
    }

    generateDeck();
}