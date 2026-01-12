import { Player, ComputerPlayer } from "./Player.js";
import { Gameboard } from "./Gameboard.js";

test("Player can attack enemy gameboard", () => {
    const enemyBoard = new Gameboard();
    const player = new Player("Human");

    player.attack(enemyBoard, 2, 2);
    expect(enemyBoard.board[2][2][1]).toBe(true);
});

test("Computer makes a random legal move", () => {
    const enemyBoard = new Gameboard();
    const computer = new ComputerPlayer();

    computer.randomAttack(enemyBoard);

    // We don't know WHERE it hit, but we know SOMEWHERE was hit.
    // We can flatten the board array and check if any cell contains 'true' (was fired at)
    const wasHit = enemyBoard.board.flat().some(cell => cell[1] === true);
    expect(wasHit).toBe(true);
});