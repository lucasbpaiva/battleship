import { Ship } from "./Ship.js";

export class Gameboard {
    constructor() {
        //board will be 10x10 array where each element will be a 3-element array [0 for water or 1 for ship, a boolean indicating whether the coordinate has already been fired at, reference to the ship object]
        this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [0, false, null]));
        this.ships = [];
    }

    placeShip(length, startPosX, startPosY, orientation) {
        const ship = new Ship(length);
        this.ships.push(ship);
        if (startPosX < 0 || startPosX > 9 || startPosY < 0 || startPosY > 9) {
            throw new Error("Cannot place ship out of bounds");
        }
        if (orientation === 0) { //horizontal
            if (startPosX + length > 10) {
                throw new Error("Cannot place ship out of bounds");
            }
            for (let i = 0; i < length; i++) {
                if (this.board[startPosY][startPosX + i][0] === 1) {
                    throw new Error("Cannot place ship on top of other");
                }
            }
            for (let i = 0; i < length; i++) {
                this.board[startPosY][startPosX + i] = [1, false, ship];
            }  
        } else if (orientation === 1) { //vertical
            if (startPosY + length > 10) {
                throw new Error("Cannot place ship out of bounds");
            }
            for (let i = 0; i < length; i++) {
                if (this.board[startPosY + i][startPosX][0] === 1) {
                    throw new Error("Cannot place ship on top of other");
                }
            }
            for (let i = 0; i < length; i++) {
                this.board[startPosY + i][startPosX] = [1, false, ship];
            }
        }
    }

    receiveAttack(x, y) {
        //if position has not been fired at yet
        if (this.board[y][x][1] === false) {
            this.board[y][x][1] = true;
            //determines whether or not a ship was hit 
            if (this.board[y][x][0] === 1) {
                //send hit to the ship if it was hit
                let ship = this.board[y][x][2];
                ship.hit();
            }
        }
    }

    areAllShipsSunk() {
        // prevent automatic "win" if no ships exist
        if (this.ships.length === 0) return false;
        return this.ships.every((ship) => ship.isSunk());
    }
}