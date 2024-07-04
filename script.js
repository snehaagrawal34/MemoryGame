const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let shuffledCards = [];
let selectedCards = [];
let matchedCards = [];

document.addEventListener('DOMContentLoaded', () => {
    shuffleCards();
    createGameBoard();
});

function shuffleCards() {
    shuffledCards = cards.sort(() => 0.5 - Math.random());
}

function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        selectedCards.push(this);
        if (selectedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Congratulations! You found all matches!'), 300);
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }
    selectedCards = [];
}
