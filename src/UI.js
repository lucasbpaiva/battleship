export class UI {
    static renderGrid(gameboard, grid, isEnemy = false) {
        grid.textContent = ""; // clear existing grid
        for (let i = 0; i < 100; i ++) {
            const square = document.createElement("div");
            const x = i % 10;
            const y = Math.floor(i / 10);
            square.dataset.x = x;
            square.dataset.y = y;

            const cell = gameboard.board[y][x];
            const isShip = cell[0] === 1;
            const firedAt = cell[1];

            if (firedAt && isShip) {
                square.classList.add("hit");
            } else if (firedAt) {
                square.classList.add("miss");
            } else if (isShip && !isEnemy) {
                // only show ships on the player's own board
                square.classList.add("ship");
            }

            grid.appendChild(square);
        }
    }

    static updateStatus(message) {
        const infoText = document.querySelector(".info-text");
        infoText.textContent = message;
    }
}