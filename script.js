let numCards = 0;

//Validates number inputted by user
while (numCards < 4 || numCards > 14 || numCards % 2 !== 0) {
    numCards = prompt("insira número par de cartas de 4 a 14");
}