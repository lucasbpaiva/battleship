import { Game } from "./Game.js";
import { UI } from "./UI.js";

const game = new Game();
const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

function init() {
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

        // refresh UI again after computer's delay
        if (!game.gameOver) {
            setTimeout(() => {
                refreshUI();
                if (game.gameOver) {
                    UI.updateStatus("Computer wins!");
                }
            }, 600);
        }
    });
}

init();