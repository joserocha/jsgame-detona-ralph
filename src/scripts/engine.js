const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        start: document.querySelector("#btn-start"),
        panels: document.querySelectorAll(".panel-row"),
        resultBox: document.querySelector("#result"),
        resultLastGame: document.querySelector("#text-score-result"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 15,
        startedGame: false,
    },
    actions: {
        timerId: setInterval(moveEnemy, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function setupGame() {
    state.view.resultBox.setAttribute('style', 'display: none');
    state.view.start.setAttribute('style', 'display: block');
    state.view.panels.forEach((panel) => {
        panel.setAttribute('style', 'display: none');
    });
}

function playGame() {
    state.view.resultBox.setAttribute('style', 'display: none');
    state.view.start.setAttribute('style', 'display: none');
    state.view.panels.forEach((panel) => {
        panel.setAttribute('style', 'display: block');
    });

    state.values.startedGame = true;
    addBoxColision();
}

function restartGame() {
    state.values.currentTime = 15;
    state.values.result = 0;

    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;

    state.actions.timerId = setInterval(moveEnemy, 1000),
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    playGame();
}

function stopGame() {
    state.view.resultBox.setAttribute('style', 'display: flex');
    state.view.start.setAttribute('style', 'display: none');
    state.view.panels.forEach((panel) => {
        panel.setAttribute('style', 'display: none');
    });
    state.values.startedGame = false;
}

function countDown() {
    if (state.values.startedGame === true) {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
    
        if (state.values.currentTime <= 0) {
            state.view.resultLastGame.innerHTML = state.values.result;
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            stopGame();
        }
    }
}

function moveEnemy() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addBoxColision() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

// Init
setupGame()