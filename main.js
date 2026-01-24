import { Game } from "./Game.js";
import { UI } from "./UI.js";

let game = new Game();
const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

function init() {
    playerBoardDOM.textContent = "";
    computerBoardDOM.textContent = "";
    game.initGame(); // handles random ship placement
    refreshUI();
    setupEventListeners();
}

function refreshUI() {
    UI.renderGrid(game.board1, playerBoardDOM, false);
    UI.renderGrid(game.board2, computerBoardDOM, true);
}

function setupEventListeners() {
    computerBoardDOM.addEventListener("click", (event) => {
        if (game.gameOver || game.activePlayer !== game.player1) return;

        // prevent strings from entering game logic
        const x = Number(event.target.dataset.x);
        const y = Number(event.target.dataset.y);
        
        if (isNaN(x) || isNaN(y)) return; // safety check for clicking gaps

        const result = game.playRound(x, y);
        if (result) UI.updateStatus(result);
        refreshUI();
        if (result === "Player wins!") {
            UI.showGameOver("player");
            UI.setupRestart(() => {
                game = new Game();
                init();
            });
        }

        // refresh UI again after computer's delay
        if (!game.gameOver) {
            setTimeout(() => {
                refreshUI();
                if (game.gameOver) {
                    UI.showGameOver("computer");
                    UI.setupRestart(() => {
                        game = new Game();
                        init();
                    });
                } else {
                    UI.updateStatus("Your Turn");
                }
            }, 700);
        }
    });
}

init();