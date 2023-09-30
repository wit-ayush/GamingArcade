const minesweeperGrid = document.getElementById("minesweeper-grid");
const startButton = document.getElementById("start-button");
const message = document.getElementById("message");

// Define the size of the Minesweeper grid
const gridSize = 10;
const numMines = 20;

let gameStarted = false;
let gridData = [];

// Event listener for the Start Game button
startButton.addEventListener("click", startGame);

// Event listener for clicking a cell in the grid
minesweeperGrid.addEventListener("click", handleCellClick);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        message.textContent = "Clear the minefield!";
        startButton.disabled = true;
        gridData = generateMinesweeperGrid(gridSize, numMines);
        renderMinesweeperGrid(gridData);
    }
}

function handleCellClick(event) {
    if (gameStarted) {
        const cell = event.target;
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");
        const isMine = gridData[row][col] === "M";

        if (isMine) {
            gameOver(false);
        } else {
            revealCell(row, col);
            const isVictory = checkVictory(gridData);
            if (isVictory) {
                gameOver(true);
            }
        }
    }
}

function generateMinesweeperGrid(size, numMines) {
    const grid = new Array(size).fill(null).map(() => new Array(size).fill(0));

    // Place mines randomly on the grid
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (grid[row][col] !== "M") {
            grid[row][col] = "M";
            minesPlaced++;
        }
    }

    // Calculate the number of neighboring mines for each cell
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (grid[row][col] !== "M") {
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                            if (grid[newRow][newCol] === "M") {
                                count++;
                            }
                        }
                    }
                }
                grid[row][col] = count;
            }
        }
    }

    return grid;
}

function renderMinesweeperGrid(grid) {
    minesweeperGrid.innerHTML = "";
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);
            cell.textContent = grid[row][col];
            minesweeperGrid.appendChild(cell);
        }
    }
}

function revealCell(row, col) {
    const cell = minesweeperGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!cell || cell.classList.contains("revealed")) {
        return;
    }

    cell.classList.add("revealed");
    const value = gridData[row][col];
    cell.textContent = value;

    if (value === 0) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = Number(row) + i;
                const newCol = Number(col) + j;
                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

function checkVictory(grid) {
    let unrevealedCount = 0;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = grid[row][col];
            const isRevealed = minesweeperGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.contains("revealed");
            if (cell !== "M" && !isRevealed) {
                unrevealedCount++;
            }
        }
    }
    return unrevealedCount === numMines;
}

function gameOver(isVictory) {
    gameStarted = false;
    startButton.disabled = false;
    if (isVictory) {
        message.textContent = "Congratulations! You cleared the minefield!";
    } else {
        message.textContent = "Game over! You triggered a mine!";
    }
}