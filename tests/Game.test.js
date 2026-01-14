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

test("human cannot make a move during computer's turn", () => {
    const game = new Game();
    game.playRound(0, 0); // first move switches active player to player2
    const initialBoardState = JSON.stringify(game.board2.board);
    game.playRound(1, 1); // attempt second move immediately
    // board should not have changed because it wasn't player1's turn
    expect(JSON.stringify(game.board2.board)).toBe(initialBoardState);
});

test("game ends when all enemy ships are sunk", () => {
    const game = new Game();
    game.board2.placeShip(1, 0, 0, 0);
    const result = game.playRound(0, 0); //sink the only ship
    expect(game.gameOver).toBe(true);
    expect(result).toBe("Player wins!");
});

test("player does not lose turn when attacking the same spot twice", () => {
    const game = new Game();
    game.playRound(0, 0);
    game.activePlayer = game.player1; // manually reset turn for the sake of the test
    game.playRound(0, 0); // repeat move
    // active player should not switch to player2
    expect(game.activePlayer).toBe(game.player1);
});

test("resetting game clears boards and resets state", () => {
    const game = new Game();
    game.board1.placeShip(3, 0, 0, 0);
    game.playRound(0, 0);
    game.reset();
    expect(game.gameOver).toBe(false);
    expect(game.activePlayer).toBe(game.player1);
    expect(game.board1.ships.length).toBe(0);
});