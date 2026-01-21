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
        this.currentHits = []; // track hits on the current ship
    }

    makeMove(enemyGameboard) {
        let coords = this.targetQueue.length > 0 ? this.targetQueue.shift() : this.#getRandomCoords(enemyGameboard);

        const result = enemyGameboard.receiveAttack(coords.x, coords.y);

        if (result.type === "hit") {
            if (result.sunk) {
                // ship is sunk, clear memory and return to random guessing
                this.targetQueue = [];
                this.currentHits = [];
            } else {
                // if not sunk, refine search
                this.currentHits.push(coords);
                this.#refineTargetQueue(enemyGameboard);
            }
        }
    }

    #refineTargetQueue(enemyGameboard) {
        this.targetQueue = []; // clear old neighbours to prioritize axis

        if (this.currentHits.length === 1) {
            // first hit, still need to check all 4 directions
            this.#addNeighboursToQueue(this.currentHits[0].x, this.currentHits[0].y, enemyGameboard);
        } else {
            // if there are 2 or more hits we found the axis
            const isHorizontal = this.currentHits[0].y === this.currentHits[1].y;

            const Xs = this.currentHits.map(coord => coord.x);
            const Ys = this.currentHits.map(coord => coord.y);

            // try both ends in the correct axis
            if (isHorizontal) {
                this.#addIfValid(Math.min(...Xs) - 1, Ys[0], enemyGameboard);
                this.#addIfValid(Math.max(...Xs) + 1, Ys[0], enemyGameboard);
            } else { // vertical
                this.#addIfValid(Xs[0], Math.min(...Ys) - 1, enemyGameboard);
                this.#addIfValid(Xs[0], Math.max(...Ys) + 1, enemyGameboard);
            }
        }
    }

    #getRandomCoords(enemyGameboard) {
        let validMove = false;
        let x, y;

        while (!validMove) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            const visited = enemyGameboard.board[y][x][1];

            if (!visited) {
                validMove = true;
            }
        }

        return { x, y };
    }

    #addIfValid(x, y, enemyGameboard) {
        const withinBounds = x >= 0 && x < 10 && y >= 0 && y < 10;
        // check if withinBounds BEFORE trying to access row and cell
        if (withinBounds) {
            const cell = enemyGameboard.board[y][x];
            if (cell && cell[1] === false) { // not fired at yet
                this.targetQueue.push({ x, y });
            }
        }
    }

    #addNeighboursToQueue(x, y, enemyGameboard) {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // up, down, right, left
        directions.forEach(([dx, dy]) => {
            this.#addIfValid(x + dx, y + dy, enemyGameboard)
        });
    }
}