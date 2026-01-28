import { Game } from "./Game.js";
import { Gameboard } from "./Gameboard.js";
import { UI } from "./UI.js";

let game = new Game();
let ui = new UI();
const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

let currentOrientation = "horizontal";
const shipInventory = document.querySelector(".ship-inventory");
const rotateBtn = document.getElementById("rotate-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

rotateBtn.addEventListener("click", () => {
    currentOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
    shipInventory.classList.toggle("vertical");
});

function autoPlacePlayerShips() {
    game.board1 = new Gameboard();
    playerBoardDOM.textContent = "";
    game.board1.placeShipsRandomly();
}

shuffleBtn.addEventListener("click", () => {
    shipInventory.textContent = "";
    autoPlacePlayerShips();
    refreshUI();
});

startBtn.addEventListener("click", () => {
    document.querySelector(".ship-placement").classList.add("hidden");
    document.querySelector(".computer-side").classList.remove("hidden");
    const shipSquares = playerBoardDOM.querySelectorAll(".ship");
    if (shipSquares.length !== 17) {
        // not all ships placed, default to random placement
        autoPlacePlayerShips();
    }
    init();
});

ui.renderGrid(game.board1, playerBoardDOM);
ui.setupDragEventListeners((name, length, x, y) => {
    const orientation = currentOrientation === "horizontal" ? 0 : 1;
    const successfullyPlaced = game.board1.placeShip(length, x, y, orientation);

    if (successfullyPlaced) {
        ui.renderGrid(game.board1, playerBoardDOM);
        document.querySelector(`[data-name="${name}"]`).remove();
    }
});

function init() {
    playerBoardDOM.textContent = "";
    computerBoardDOM.textContent = "";
    game.initGame(); // handles random ship placement
    refreshUI();
    setupEventListeners();
}

function refreshUI() {
    ui.renderGrid(game.board1, playerBoardDOM, false);
    ui.renderGrid(game.board2, computerBoardDOM, true);
}

function setupEventListeners() {
    computerBoardDOM.addEventListener("click", (event) => {
        if (game.gameOver || game.activePlayer !== game.player1) return;

        // prevent strings from entering game logic
        const x = Number(event.target.dataset.x);
        const y = Number(event.target.dataset.y);
        
        if (isNaN(x) || isNaN(y)) return; // safety check for clicking gaps

        const result = game.playRound(x, y);
        if (result) ui.updateStatus(result);
        refreshUI();
        if (result === "Player wins!") {
            ui.showGameOver("player");
            ui.setupRestart();
        }

        // refresh UI again after computer's delay
        if (!game.gameOver) {
            setTimeout(() => {
                refreshUI();
                if (game.gameOver) {
                    ui.showGameOver("computer");
                    ui.setupRestart();
                } else {
                    ui.updateStatus("Your Turn");
                }
            }, 700);
        }
    });
}