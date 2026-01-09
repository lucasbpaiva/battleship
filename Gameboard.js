import { Ship } from "./Ship.js";

export class Gameboard {
    constructor() {
        //board will be 10x10 array where each element will be a 2-element array [0 for water or 1 for ship, a boolean indicating whether the coordinate has been fired at]
        this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => [0, false]));
    }

    placeShip(length, startPosX, startPosY, orientation) {
        if (orientation === 0) { //horizontal
            for (let i = 0; i < length; i++) {
                this.board[startPosY][startPosX + i][0] = 1;
            }  
        } else if (orientation === 1) { //vertical
            for (let i = 0; i < length; i++) {
                this.board[startPosY + i][startPosX][0] = 1;
            }
        }
    }
}