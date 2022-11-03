// Helping functions //
function buildPlayerFieldHTML(name, bindElement, boxId) {
    const playerBox = document.createElement('div');
    playerBox.className = 'player-box';
    playerBox.setAttribute('id', boxId);
    const playerName = document.createElement('span');
    playerName.className = 'player-box__name';
    playerName.innerText = name;
    const playerScore = document.createElement('div');
    playerScore.className = 'player-box__score';
    const playerPunch = document.createElement('div');
    playerPunch.className = 'player-box__punch';

    playerBox.appendChild(playerName);
    playerBox.appendChild(playerScore);
    playerBox.appendChild(playerPunch);

    bindElement.appendChild(playerBox);
}

function getName() {
    while (true) {
        let name = prompt('Enter your name:');
        if (name.length < 4) alert('Your name length should be at least 4 characters. Try again!');
        else return name;
    }
}

function getRandomPunch() {
    return Math.floor(Math.random() * (11 - 1) + 1)
}


function changeScore(boxId, score) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.innerText = score !== null ? score.toString() : '';
}

function changePunch(boxId, punch) {
    const punchEl = document.querySelector(`#${boxId} > .player-box__punch`);
    punchEl.innerText = punch !== null ? punch.toString() : '';
}

function updateData(...playerObjects) {
    playerObjects.forEach(p => {
        changeScore(p.boxId, p.score);
        changePunch(p.boxId, p.punch);
    });
}

function setWinner(boxId) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.classList.add('player-box__score_winner');
}

function setLoser(boxId) {
    const scoreEl = document.querySelector(`#${boxId} > .player-box__score`);
    scoreEl.classList.add('player-box__score_loser');
}


// Creating and appending html elements //
let gamer = { name: getName(), boxId: 'gamer-box', score: 0, punch: null };
let computer = { name: 'Computer', boxId: 'computer-box', score: 0, punch: null };

const content = document.createElement('div');
content.setAttribute('id', 'content');
document.body.appendChild(content);

buildPlayerFieldHTML(gamer.name, content, gamer.boxId);
buildPlayerFieldHTML(computer.name, content, computer.boxId);

const actionButton = document.createElement('div');
actionButton.className = 'action-button';
actionButton.innerText = 'Generate';
content.appendChild(actionButton);

// Add listener to button //
actionButton.addEventListener('click', battle);


// Init scores //
battle();
updateData(gamer, computer);


// Action //
function battle() {
    gamer.punch = getRandomPunch();
    computer.punch = getRandomPunch();

    if (gamer.punch > computer.punch) gamer.score++;
    if (gamer.punch < computer.punch) computer.score++;

    updateData(gamer, computer);

    if (gamer.score === 3 || computer.score === 3) {
        const winner = gamer.score === 3 ? gamer : computer;
        const loser = gamer.score === 3 ? computer : gamer;

        setWinner(winner.boxId);
        setLoser(loser.boxId);

        actionButton.removeEventListener('click', battle);
        actionButton.innerText = 'Try again';
        actionButton.classList.add('action-button_try-again');
        actionButton.addEventListener('click', window.location.reload.bind(window.location));

        alert(winner.name + ' won the battle! Congratulations!');
    }
}
