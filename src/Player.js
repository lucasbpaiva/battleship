import { Gameboard } from "./Gameboard.js";

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
        this.targetQueue = []; // squares to attack next after a hit
    }

    makeMove(enemyGameboard) {
        let x, y;

        // target mode (pick from queue)
        if (this.targetQueue.length > 0) {
            // parentheses needed for this destructuring assignment
            ({ x, y } = this.targetQueue.shift());
        } else { // hunt mode (random attack)
            ({ x, y } = this.#getRandomCoords(enemyGameboard));
        }

        enemyGameboard.receiveAttack(x, y);

        // if it was a hit, add neighbours to the queue
        if (enemyGameboard.board[y][x][0] === 1) {
            this.#addNeighboursToQueue(x, y, enemyGameboard);
        }
    }

    #getRandomCoords(enemyGameboard) {
        let validMove = false;
        let x, y;

        while (!validMove) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            if (enemyGameboard.board[y][x][1] === false) {
                validMove = true;
            }
        }

        return { x, y };
    }

    #addNeighboursToQueue(x, y, enemyGameboard) {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // up, down, right, left
        directions.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            const withinBounds = nx >= 0 && nx < 10 && ny >= 0 && ny < 10;
            const firedAt = enemyGameboard.board[ny][nx][1];
            const duplicate = this.targetQueue.some(t => t.x === nx && t.y === ny);
            if (withinBounds && !firedAt && !duplicate) {
                this.targetQueue.push({ x: nx, y: ny });
            }
        });
    }
}