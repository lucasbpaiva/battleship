import { Game } from "../src/Game.js";

test("playRound updates the enemy board and switches turns", () => {
    const game = new Game();
    game.initGame();

    // player1 attacks computer board at (0, 0)
    game.playRound(0, 0);

    // computer board should record the attack
    expect(game.board2.board[0][0][1]).toBe(true);

    // active player should change to computer
    expect(game.activePlayer).toBe(game.player2);
});

test("computerTurn attacks the human board", () => {
    jest.useFakeTimers();
    const game = new Game();
    game.initGame();
    game.playRound(0, 0);
    jest.runAllTimers();

    // check if any cell on the human board was hit
    const humanBoard = game.board1.board;
    const wasHit = humanBoard.flat().some(cell => cell[1] === true);
    expect(wasHit).toBe(true);

    // active player should change to player1
    expect(game.activePlayer).toBe(game.player1);
});