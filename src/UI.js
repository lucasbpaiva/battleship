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
            } 

            // only show ships on the player's own board or ones that have been sunk
            if (isShip && (!isEnemy || cell[2].isSunk())) { 
                square.classList.add("ship");

                // helper to check if a coord is of the same ship
                const isSameShip = (x, y) => {
                    if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
                    const neighbour = gameboard.board[y][x];
                    const isShip = neighbour[0] === 1;
                    const isSame = neighbour[2] === cell[2];
                    return isShip && isSame;
                };
                
                if (isSameShip(x - 1, y)) square.classList.add("ship-has-left");
                if (isSameShip(x + 1, y)) square.classList.add("ship-has-right");
                if (isSameShip(x, y - 1)) square.classList.add("ship-has-top");
                if (isSameShip(x, y + 1)) square.classList.add("ship-has-bottom");
            }

            grid.appendChild(square);
        }
    }

    static updateStatus(message) {
        const infoText = document.querySelector(".info-text");
        infoText.textContent = message;
    }
}