# 🚢 Battleship: A TDD Approach

This is my take on the classic game Battleship. This was made as a capstone project for the JavaScript course on The Odin Project curriculum and the main goals of the project were to solidify my knowledge of **Vanilla JavaScript**, **Modular Design** and **Test-Driven Development (TDD)**. You can play the game [here](https://lucasbpaiva.github.io/battleship/).

![Demo of the battleship game](./src/images/demo.png)

## 🎮 Key Features

* **Dynamic Ship Placement:** A fully interactive drag-and-drop system for positioning your fleet.

* **Smart AI Opponent:** A computer player that makes random moves until it finds a target, at which point it begins a targeted search of adjacent squares, identifies the orientation of the ship after getting 2 hits and only tries squares in that direction. It also tries random squares in a checkerboard pattern to find a new target faster.

* **Responsive UI:** A grid-based layout that adapts to different screen sizes using CSS variables and Grid.

* **Collision Detection:** solid logic to prevent ships from overlapping or going out of bounds during placement.

## 🛠️ Tech Stack

* **Language:** JavaScript (ES6+ Modules)

* **Environment:** Node.js/npm

* **Testing:** Jest

* **Styling:** CSS3 (Custom properties, Flexbox/Grid)

I also took this as an opportunity to build an application with clear separation of concerns so I tried to keep the logic of the game entirely decoupled from the UI, ensuring the game could be played entirely in the console before starting to build the UI. To achieve this the project was built inside out using **Jest**. By writing unit tests first I was able to plan the construction of the backend step by step, thinking in terms of what behavior was expected for each method and it also gave me confidence that the new features I was creating weren't breaking the game.

Besides getting used to the TDD approach, implementing the ship placement feature using the native **HTML5 Drag and Drop API** presented a significant learning curve. The main challenge was getting the dragover event listener effect to work correctly, creating a "ghost shadow" effect when the player hovers over the grid and changing the color of the squares to indicate if it was a valid square to place the ship.