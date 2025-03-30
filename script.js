// Game state
let selectedPowers = [];
let currentCardIndex = 0;

// Generate the 6 magic cards
function generateCards() {
    const cards = [];
    const powersOf2 = [1, 2, 4, 8, 16, 32];
    
    powersOf2.forEach(power => {
        const card = [];
        for (let num = 1; num < 64; num++) {
            if (num & power) card.push(num);
        }
        cards.push({ power, numbers: card });
    });
    return cards;
}

// Show current screen
function showScreen(html) {
    document.getElementById('game-container').innerHTML = html;
}

// Welcome screen
function showWelcome() {
    selectedPowers = [];
    currentCardIndex = 0;
    
    showScreen(`
        <h1>Magic Number Trick</h1>
        <p>Think of a number between 1 and 63</p>
        <div class="instructions">
            <p>I will show you 6 cards one by one.</p>
            <p>For each card, click YES if your number appears on it,</p>
            <p>or NO if it doesn't.</p>
        </div>
        <button onclick="startGame()" class="btn btn-begin">Begin</button>
    `);
}

// Start the game
function startGame() {
    currentCardIndex = 0;
    showCard();
}

// Show current card
function showCard() {
    const cards = generateCards();
    
    if (currentCardIndex >= cards.length) {
        showResult();
        return;
    }
    
    const { power, numbers } = cards[currentCardIndex];
    let numbersHTML = '';
    
    // Split into rows of 8 numbers
    for (let i = 0; i < numbers.length; i += 8) {
        const row = numbers.slice(i, i + 8);
        numbersHTML += `<div class="card-row">${
            row.map(num => `<span class="card-number">${num}</span>`).join('')
        }</div>`;
    }
    
    showScreen(`
        <h1>Card ${currentCardIndex + 1}</h1>
        <p>Does your number appear below?</p>
        <div class="card">${numbersHTML}</div>
        <div class="btn-group">
            <button onclick="handleResponse(true, ${power})" class="btn btn-yes">YES</button>
            <button onclick="handleResponse(false, ${power})" class="btn btn-no">NO</button>
        </div>
    `);
}

// Handle user response
function handleResponse(isYes, power) {
    if (isYes) {
        selectedPowers.push(power);
    }
    currentCardIndex++;
    showCard();
}

// Show final result
function showResult() {
    const guessedNumber = selectedPowers.reduce((sum, power) => sum + power, 0);
    
    showScreen(`
        <h1>Your Number is:</h1>
        <div class="result-number">${guessedNumber}</div>
        <button onclick="showWelcome()" class="btn btn-restart">Play Again</button>
    `);
}

// Initialize game
showWelcome();