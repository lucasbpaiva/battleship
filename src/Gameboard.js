import { Ship } from "./Ship.js";

export class Gameboard {
    constructor() {
        //board will be 10x10 array where each element will be a 3-element array [0 for water or 1 for ship, a boolean indicating whether the coordinate has already been fired at, reference to the ship object]
        this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [0, false, null]));
        this.ships = [];
    }

    #isWithinBounds(x, y) {
        // checks if a coordinate is within the 10x10 grid
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    #isAreaClear(length, x, y, orientation) {
        // check a 1-cell buffer around the intended ship placement
        const startX = x - 1;
        const endX = orientation === 0 ? x + length : x + 1;
        const startY = y - 1;
        const endY = orientation === 1 ? y + length : y + 1;

        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j<= endY; j++) {
                // if coordinate is on the board...
                if (this.#isWithinBounds(i, j)) {
                    // ...and contains a ship
                    if (this.board[j][i][0] === 1) {
                        return false; // area not clear
                    }
                }
            }
        }
        return true;
    }

    placeShip(length, startPosX, startPosY, orientation) {
        if (!this.#isWithinBounds(startPosX, startPosY)) {
            throw new Error("Cannot place ship out of bounds");
        }
        if (orientation === 0 && startPosX + length > 10) {
            throw new Error("Cannot place ship out of bounds");
        }
        if (orientation === 1 && startPosY + length > 10) {
            throw new Error("Cannot place ship out of bounds");
        }

        // check for overlaps and adjacency
        if (!this.#isAreaClear(length,startPosX, startPosY, orientation)) {
            throw new Error("Invalid placement: too close to another ship");
        }

        const ship = new Ship(length);
        this.ships.push(ship);
        for (let i = 0; i < length; i++) {
            const x = orientation === 0 ? startPosX + i : startPosX;
            const y = orientation === 1 ? startPosY + i : startPosY;
            this.board[y][x] = [1, false, ship];
        }
    }

    placeShipsRandomly() {
        const shipLengths = [5, 4, 3, 3, 2]; // standard battleship fleet
        for (const length of shipLengths) {
            let placed = false;
            while (!placed) {
                const orientation = Math.floor(Math.random() * 2);
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                try {
                    this.placeShip(length, x, y, orientation);
                    placed = true;
                } catch (error) {
                    continue;
                }
            }
        }
    }

    receiveAttack(x, y) {
        // if position has not been fired at yet
        if (this.board[y][x][1] === false) {
            this.board[y][x][1] = true;
            // determines whether or not a ship was hit 
            if (this.board[y][x][0] === 1) {
                // send hit to the ship if it was hit
                let ship = this.board[y][x][2];
                ship.hit();
            }
            return true; // attack was valid
        }
        return false; // repeated attack
    }

    areAllShipsSunk() {
        // prevent automatic "win" if no ships exist
        if (this.ships.length === 0) return false;
        return this.ships.every((ship) => ship.isSunk());
    }
}