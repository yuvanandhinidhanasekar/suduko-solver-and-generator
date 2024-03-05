
const size = 9;
let sudokuBoard = [];

let timerInterval;
let seconds = 0;
let timerRunning = false; // Variable to track whether the timer is running

function initializeBoard() {
    for (let i = 0; i < size; i++) {
        sudokuBoard[i] = [];
        for (let j = 0; j < size; j++) {
            sudokuBoard[i][j] = 0;
        }
    }
}

function displayBoard() {
    const table = document.getElementById('sudokuBoard');
    table.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = sudokuBoard[i][j] === 0 ? '' : sudokuBoard[i][j];

            input.addEventListener('input', function(event) {
                handleUserInput(i, j, event.target.value);
            });
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function handleUserInput(row, col, value) {
    if (!timerRunning) {
        startTimer(); // Start the timer when the user begins entering their solution
        timerRunning = true;
    }

    const intValue = parseInt(value);
    if (!isNaN(intValue) && intValue >= 1 && intValue <= size) {
        sudokuBoard[row][col] = intValue;
    } else {
        sudokuBoard[row][col] = 0;
    }

    displayBoard(); // Update the board whenever the user inputs a value
}

function solveSudoku() {
    startTimer();
    if (solve()) {
        displayBoard();
    } else {
        alert('No solution exists.');
    }
}

function solve() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (sudokuBoard[row][col] === 0) {
                for (let num = 1; num <= size; num++) {
                    if (isValidMove(row, col, num)) {
                        sudokuBoard[row][col] = num;

                        if (solve()) {
                            return true;
                        }

                        sudokuBoard[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValidMove(row, col, num) {
    for (let i = 0; i < size; i++) {
        if (sudokuBoard[row][i] === num || sudokuBoard[i][col] === num || sudokuBoard[Math.floor(row/3)*3 + Math.floor(i/3)][Math.floor(col/3)*3 + i%3] === num) {
            return false;
        }
    }
    return true;
}

function generateSudoku() {
    initializeBoard();
    solve();
    const emptyCells = Math.floor(Math.random() * 20) + 20; // Adjust the number of empty cells as needed

    for (let i = 0; i < emptyCells; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        sudokuBoard[row][col] = 0;
    }

    displayBoard();
}

function startTimer() {
    timerInterval = setInterval(function() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60;
        document.getElementById('timer').innerText = `Timer: ${String(minutes).padStart(2, '0')}:${String(formattedSeconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function toggleTimer() {
    if (timerRunning) {
        stopTimer();
    } else {
        startTimer();
    }

    timerRunning = !timerRunning;
}

function checkUserSolution() {
    stopTimer();
    timerRunning = false; // Stop the timer when the user checks their solution

    // Add your code to check the user's solution here
    const isSolutionCorrect = checkSolution(); // Replace this line with your validation logic

    if (isSolutionCorrect) {
        alert('Congratulations! Your solution is correct.');
    } else {
        alert('Sorry, your solution is incorrect. Please try again.');
    }
}

// Replace this function with your validation logic
function checkSolution() {
    // Implement your logic to check if the user's solution is correct
    // Return true if correct, false otherwise
    // You can compare the user's solution with the actual solution stored in `sudokuBoard`
    // For simplicity, I'll assume a correct solution if the board is filled completely
    return sudokuBoard.every(row => row.every(cell => cell !== 0));
}
function renderBoardWithAnimation(board) {
    const boardContainer = document.getElementById('sudoku-board');
    const cells = boardContainer.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.style.backgroundColor = 'lightblue';
            cell.style.color = 'blue';
            setTimeout(() => {
                cell.textContent = board[Math.floor(index / 9)][index % 9];
                cell.style.backgroundColor = '#fff';
                cell.style.color = '#000';
            }, 500);
        }, index * 50);
    });
}

function renderBoard(board) {
    const boardContainer = document.getElementById('sudoku-board');
    boardContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[i][j];
            boardContainer.appendChild(cell);
        }
    }
}

function copyBoard(board) {
    return board.map(row => [...row]);
}
generateSudoku(); // Automatically generate a puzzle when the page loads