export class UI {
    renderGrid(gameboard, grid, isEnemy = false) {
        if (grid.children.length === 0) {
            for (let i = 0; i < 100; i ++) {
                const square = document.createElement("div");
                square.dataset.x = i % 10;
                square.dataset.y = Math.floor(i / 10);
                grid.appendChild(square);
            }
        }

        const squares = grid.querySelectorAll("div");
        squares.forEach(square => {
            const x = Number(square.dataset.x);
            const y = Number(square.dataset.y);
            const cell = gameboard.board[y][x];
            const isShip = cell[0] === 1;
            const firedAt = cell[1];

            if (firedAt && isShip && !square.classList.contains("hit")) {
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
        });
    }

    updateStatus(message) {
        const infoText = document.querySelector(".info-text");
        infoText.textContent = message;
    }

    showGameOver(winner) {
        const modal = document.getElementById("game-over-modal");
        const message = document.getElementById("result-message");

        modal.classList.remove("hidden");
        message.textContent = winner === "player" ? "You Win!" : "Game Over";
        message.style.color = winner === "player" ? "#ffffff" : "var(--hit-color)";
    }

    setupRestart(handler) {
        const restartBtn = document.getElementById("restart-btn");
        const modal = document.getElementById("game-over-modal");

        restartBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
            handler();
        });
    }

    setupDragEventListeners(onShipDrop) {
        const playerGrid = document.getElementById("player-board");
        const ships = document.querySelectorAll(".ship-container");

        ships.forEach(ship => {
            ship.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("shipName", event.target.dataset.name);
                event.dataTransfer.setData("shipLength", event.target.dataset.length);
            });
        });

        playerGrid.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        playerGrid.addEventListener("drop", (event) => {
            event.preventDefault();
            const shipName = event.dataTransfer.getData("shipName");
            const shipLength = event.dataTransfer.getData("shipLength");

            const x = Number(event.target.dataset.x);
            const y = Number(event.target.dataset.y);

            onShipDrop(shipName, shipLength, x, y);
        });
    }
}