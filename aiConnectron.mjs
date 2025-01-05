import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const rows = 6;
const columns = 7;

const board = Array.from({ length: rows }, () => Array(columns).fill(0));

function printBoard() {
    for (let row = 0; row < rows; row++) {
        console.log(board[row].map(x => x ? x : '.').join(' '));
    }
}

 function checkWin(player) {
    // Check rows for win
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] == player && board[row][col + 1] == player && board[row][col + 2] == player && board[row][col + 3] == player) {
                return true;
            }
        }
    }

    // Check columns for win
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][col] == player && board[row + 1][col] == player && board[row + 2][col] == player && board[row + 3][col] == player) {
                return true;
            }
        }
    }

    // Check diagonals for win
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] == player && board[row + 1][col + 1] == player && board[row + 2][col + 2] == player && board[row + 3][col + 3] == player) {
                return true;
            }
        }
    }

    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] == player && board[row - 1][col + 1] == player && board[row - 2][col + 2] == player && board[row - 3][col + 3] == player) {
                return true;
            }
        }
    }

    return false;
}

function evaluateBoard() {
    if (checkWin(1)) return -1;
    if (checkWin(2)) return 1;
    return 0;
}

function minimax(depth, alpha, beta, isMaximizing) {
  let score = evaluateBoard();

  if (score === 1) return 10;
  if (score === -1) return -10;
  if (depth === 0) return 0;

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let col = 0; col < columns; col++) {
          if (board[0][col] === 0) {
              for (let row = 0; row < rows; row++) {
                  if (board[row][col] === 0) {
                      board[row][col] = 2;
                      let newScore = minimax(depth - 1, alpha, beta, false);
                      board[row][col] = 0;
                      bestScore = Math.max(bestScore, newScore);
                      alpha = Math.max(alpha, newScore);
                      if (alpha >= beta) break;
                  }
              }
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let col = 0; col < columns; col++) {
          if (board[0][col] === 0) {
              for (let row = 0; row < rows; row++) {
                  if (board[row][col] === 0) {
                      board[row][col] = 1;
                      let newScore = minimax(depth - 1, alpha, beta, true);
                      board[row][col] = 0;
                      bestScore = Math.min(bestScore, newScore);
                      beta = Math.min(beta, newScore);
                      if (alpha >= beta) break;
                  }
              }
          }
      }
      return bestScore;
  }
}

function bestMove() {
    let bestScore = -Infinity;
    let bestCol = -1;
    for (let col = 0; col < columns; col++) {
        if (board[0][col] === 0) {
            for (let row = 0; row < rows; row++) {
                if (board[row][col] === 0) {
                    board[row][col] = 2;
                    let score = minimax(4, false);
                    board[row][col] = 0;
                    if (score > bestScore) {
                        bestScore = score;
                        bestCol = col;
                    }
                    break;
                }
            }
        }
    }
    return bestCol;
}

function play() {
    printBoard();
    if (checkWin(1)) {
        console.log('Player 1 wins!');
        return;
    }
    if (checkWin(2)) {
        console.log('Player 2 wins!');
        return;
    }
    rl.question('Enter your move (1-7): ', (answer) => {
        let col = parseInt(answer) - 1;
        if (col < 0 || col >= columns || board[0][col] !== 0) {
            console.log('Invalid move!');
            play();
            return;
        }
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === 0) {
                board[row][col] = 1;
                break;
            }
        }
        if (checkWin(1)) {
            printBoard();
            console.log('Player 1 wins!');
            return;
        }
        printBoard();
        if (checkWin(2)) {
            console.log('Player 2 wins!');
            return;
        }
        let bestCol = bestMove();
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][bestCol] === 0) {
                board[row][bestCol] = 2;
                break;
            }
        }
        play();
    });
}

play();

export {checkWin, evaluateBoard, minimax, bestMove};