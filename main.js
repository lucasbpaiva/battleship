const battleshipGrid = document.querySelectorAll(".battleship-grid");

battleshipGrid.forEach((currentGrid) => {
    for (let i = 0; i < 100; i ++) {
        const square = document.createElement("div");
        currentGrid.appendChild(square);
    }
});