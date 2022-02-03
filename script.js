let numCards = 0;
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
        main.innerHTML += `<div class="card" onclick="turnCard(this)">
                                <div class="front-card">
                                    <img src="assets/front.png">
                                </div>
                                <div class="back-card hide">
                                <img src="${shuffledDeck[i]}">
                                </div>
                            </div>
                        `
    }
}

function turnCard(card) {

    let cardBack = card.querySelector(".back-card");
    let cardFront = card.querySelector(".front-card");

    cardFront.classList.add("hide")
    cardBack.classList.remove("hide");

}

function startGame() {
    
    //Validates number inputted by user
    while (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
        numCards = prompt("insira número par de cartas de 4 a 14");
    }

    generateDeck();
}