import { Gameboard } from "./Gameboard.js";
import { Player, ComputerPlayer } from "./Player.js";

export class Game {
    constructor() {
        this.#initialize();
    }

    #initialize() {
        this.player1 = new Player("Human");
        this.player2 = new ComputerPlayer();

        this.board1 = this.player1.board;
        this.board2 = this.player2.board;

        this.activePlayer = this.player1;
        this.gameOver = false;
    }

    initGame() {
        // randomize the computer's board
        this.board2.placeShipsRandomly();

        // randomize player1's board while the UI functionality for placing ships is not implemented
        this.board1.placeShipsRandomly();
    }

    playRound(x, y) {
        if (this.gameOver || this.activePlayer !== this.player1) return;

        // try to attack computer board and record whether it is a valid move
        const isValidMove = this.board2.receiveAttack(x, y);
        if (!isValidMove) return; // exit if not valid to prevent losing a turn

        if (this.board2.areAllShipsSunk()) {
            this.gameOver = true;
            return "Player wins!";
        }

        // switch to Computer's turn
        this.activePlayer = this.player2;
        setTimeout(() => this.#computerTurn(), 500) // small delay for realism
    }

    #computerTurn() {
        this.player2.randomAttack(this.board1);

        if (this.board1.areAllShipsSunk()) {
            this.gameOver = true;
            return "Computer wins!";
        }

        // switch to Player's turn
        this.activePlayer = this.player1;
    }

    reset() {
        this.#initialize();
    }
 }