import { Gameboard } from "./Gameboard.js";

test("Ships can be placed horizontally", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 2, 5, 0);
    console.log(gameboard.board);
    expect(gameboard.board[5][2][0]).toBe(1);
    expect(gameboard.board[5][3][0]).toBe(1);
    expect(gameboard.board[5][4][0]).toBe(1);
});

test("Ships can be placed vertically", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(5, 7, 2, 1);
    console.log(gameboard.board);
    expect(gameboard.board[2][7][0]).toBe(1);
    expect(gameboard.board[3][7][0]).toBe(1);
    expect(gameboard.board[4][7][0]).toBe(1);
    expect(gameboard.board[5][7][0]).toBe(1);
    expect(gameboard.board[6][7][0]).toBe(1);
});