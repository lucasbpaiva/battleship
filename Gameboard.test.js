import { Gameboard } from "./Gameboard.js";

beforeEach(() => {
    let gameboard = new Gameboard();
});

test("Ships can be placed horizontally", () => {
    gameboard.placeShip(3, 2, 5, 0);
    expect(gameboard.board[5][2][0]).toBe(1);
    expect(gameboard.board[5][3][0]).toBe(1);
    expect(gameboard.board[5][4][0]).toBe(1);
});

test("Ships can be placed vertically", () => {
    gameboard.placeShip(5, 7, 2, 1);
    expect(gameboard.board[2][7][0]).toBe(1);
    expect(gameboard.board[3][7][0]).toBe(1);
    expect(gameboard.board[4][7][0]).toBe(1);
    expect(gameboard.board[5][7][0]).toBe(1);
    expect(gameboard.board[6][7][0]).toBe(1);
});

test("Gameboard reports that all ships are sunk", () => {
    gameboard.placeShip(2, 5, 1, 0);
    gameboard.receiveAttack(5, 1);
    gameboard.receiveAttack(6, 1);
    expect(gameboard.areAllShipsSunk()).toBe(true);
});

test("Gameboard reports false if not all ships are sunk", () => {
    gameboard.placeShip(2, 1, 5, 0);
    gameboard.placeShip(3, 5, 4, 1);
    gameboard.receiveAttack(1, 5);
    gameboard.receiveAttack(2, 5);
    expect(gameboard.areAllShipsSunk()).toBe(false);
});