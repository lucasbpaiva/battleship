import { Gameboard } from "../src/Gameboard.js";

let gameboard;
beforeEach(() => {
    gameboard = new Gameboard();
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

test("Cannot place ship out of bounds (horizontal overflow)", () => {
    expect(() => gameboard.placeShip(3, 9 , 0, 0)).toThrow();
});

test("Cannot place ship out of bounds (vertical overflow)", () => {
    expect(() => gameboard.placeShip(3, 0 , 9, 1)).toThrow();
});

test("Cannot place ship out of bounds (negative posX)", () => {
    expect(() => gameboard.placeShip(3, -1 , 0, 0)).toThrow();
    expect(() => gameboard.placeShip(3, -1 , 0, 1)).toThrow();
});

test("Cannot place ship out of bounds (negative posY)", () => {
    expect(() => gameboard.placeShip(3, 0 , -1, 0)).toThrow();
    expect(() => gameboard.placeShip(3, 0 , -1, 1)).toThrow();
});

test("Cannot place ship out of bounds (big posX)", () => {
    expect(() => gameboard.placeShip(3, 10 , 0, 0)).toThrow();
    expect(() => gameboard.placeShip(3, 10 , 0, 1)).toThrow();
});

test("Cannot place ship out of bounds (big posY)", () => {
    expect(() => gameboard.placeShip(3, 0 , 10, 0)).toThrow();
    expect(() => gameboard.placeShip(3, 0 , 10, 1)).toThrow();
});

test("Cannot place ship on top of other ship", () => {
    gameboard.placeShip(3, 0, 0, 0);
    expect(() => gameboard.placeShip(3, 0, 0, 1)).toThrow();
});