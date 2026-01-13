import { Gameboard } from "./Gameboard";

export class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }

    attack(enemyGameboard, x, y) {
        if (enemyGameboard.board[y][x][1] === false) {
            enemyGameboard.receiveAttack(x, y);
        }
    }
}

export class ComputerPlayer extends Player {
    constructor() {
        super("Computer");
    }

    randomAttack(enemyGameboard) {
        let validMove = false;
        let x, y;

        while (!validMove) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            if (enemyGameboard.board[y][x][1] === false) {
                validMove = true;
            }
        }

        enemyGameboard.receiveAttack(x, y);
    }
}