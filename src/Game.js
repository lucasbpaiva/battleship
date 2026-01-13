import { Gameboard } from "./Gameboard.js";
import { Player, ComputerPlayer } from "./Player.js";

class Game {
    constructor() {
        this.player1 = new Player("Human");
        this.player2 = new ComputerPlayer();

        this.board1 = new Gameboard();
        this.board2 = new Gameboard();

        this.activePlayer = this.player1.name;
        this.gameOver = false;
    }

    initGame() {
        // 1. Place ships for both boards (manually or randomly)
        // 2. Render the initial UI
    }

    playRound(x, y) {

    }

    #computerTurn() {}
}