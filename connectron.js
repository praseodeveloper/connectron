import readlineSync from 'readline-sync';

export default class Connectron {
  static EMPTY_CELL_CONTENT = "O";

  constructor(rows, columns, playerCount, lineLength) {
    this.gridRows = rows; // 6 - 100
    this.gridColumns = columns; // 6 - 100
    this.grid = this.#createGrid(this.gridRows, this.gridColumns);
    this.numberOfPlayers = playerCount; // 0 - 10
    this.desiredLengthOfLine = lineLength; // 4 - 10
    this.numberOfTurns = (this.gridRows * this.gridColumns) / (this.numberOfPlayers === 1 ? 2 : this.numberOfPlayers);
    this.pointsTable = {};
  }

  //##################  Private methods  ##################

  #createGrid = (rows, columns) => {
    const outerArray = new Array(rows);
    for (let i = 0; i < rows; i++) {
      outerArray[i] = new Array(columns).fill(Connectron.EMPTY_CELL_CONTENT);
    }
    return outerArray;
  };

  #strategize = () => {
    // Implement a strategy to place the counter
    // For now, just place the counter in the first available column
    for (let rowIndex = this.gridRows - 1; rowIndex >= 0; rowIndex--) {
      for (let columnIndex = 0; columnIndex < this.gridColumns; columnIndex++) {
        if (this.grid[rowIndex][columnIndex] === Connectron.EMPTY_CELL_CONTENT) {
          return columnIndex;
        }
      }
    }
    return -1;
  }

  #findWinner = () => {
    let winningPoints = 0;
    let winners = [];
    Object.keys(this.pointsTable). //
      forEach( (player) => {
        if(this.pointsTable[player] > winningPoints) {
          winningPoints = this.pointsTable[player];
          // Clear all winners
          winners.splice(0);
          winners[0] = player;
        } else if(this.pointsTable[player] === winningPoints) {
          winners.push(player);
        }
      });

    if(winners.length === 1) {
      console.log(`Player ${winners[0]} wins with ${winningPoints} point(s)`);
    } else if(winners.length > 1) {
      console.log(`It's a tie between players ${winners.join(', ')} with ${winningPoints} point(s) each`);
    } else {
      console.log(`No winner`);
    }
  };

  #addCounterToColumn = (zeroBasedColumnIndex, playerCounterValue) => {
    const columnIndex = zeroBasedColumnIndex + 1;
    if (zeroBasedColumnIndex < 0 || zeroBasedColumnIndex >= this.gridColumns) {
      console.log(`Column with index ${columnIndex} does not exist`);
      return;
    }
    const filledZeroBasedRowIndex = this.grid.findIndex((element) => element[zeroBasedColumnIndex] !== Connectron.EMPTY_CELL_CONTENT);
    const zeroBasedRowIndex = filledZeroBasedRowIndex === -1 ? this.gridRows - 1 : filledZeroBasedRowIndex - 1;
    if (zeroBasedRowIndex < 0) {
      console.log(`Column ${columnIndex} is full`);
      return;
    }
    this.grid[zeroBasedRowIndex][zeroBasedColumnIndex] = playerCounterValue;
    const rowIndex = zeroBasedRowIndex + 1;
    console.log(`Counter '${playerCounterValue}' placed at row ${rowIndex}, column ${columnIndex}`);
    console.log(`***************`);
    this.calculatePoints();
    console.log(`***************`);
    this.printGrid();
  };

  //##################  Public methods  ##################

  printGrid = () => {
    let gridString = '';
    for (let i = 0; i < this.grid.length; i++) {
      gridString += `${this.grid[i].join(' ')}\n`;
    }
    console.log(`Grid State\n${gridString}`);
  };

  calculatePoints = () => {
    console.log(`Calculating points`);
    this.pointsTable = {};
    const winningPoints = this.numberOfPlayers; // 0 - 10

    for(let rowIndex = 0; rowIndex < this.gridRows; rowIndex++) {
      for(let columnIndex = 0; columnIndex < this.gridColumns; columnIndex++) {
        const cellValue = this.grid[rowIndex][columnIndex];
        if (cellValue !== Connectron.EMPTY_CELL_CONTENT) {
          // Check horizontally forward
          if (columnIndex + this.desiredLengthOfLine <= this.gridColumns) {
            let counterCount = 1;
            for (let i = 1; i < this.desiredLengthOfLine; i++) {
              if (this.grid[rowIndex][columnIndex + i] === cellValue) {
                counterCount++;
              }
            }
            if (counterCount === this.desiredLengthOfLine) {
              this.pointsTable[cellValue] = this.pointsTable[cellValue] ? this.pointsTable[cellValue] + winningPoints : winningPoints;
              console.log(`Player ${cellValue} won ${winningPoints} points horizontally from row ${rowIndex+1}, column ${columnIndex+1}`);
            }
          }

          // Check vertically downward
          if (rowIndex + this.desiredLengthOfLine <= this.gridRows) {
            let counterCount = 1;
            for (let i = 1; i < this.desiredLengthOfLine; i++) {
              if (this.grid[rowIndex + i][columnIndex] === cellValue) {
                counterCount++;
              }
            }
            if (counterCount === this.desiredLengthOfLine) {
              this.pointsTable[cellValue] = this.pointsTable[cellValue] ? this.pointsTable[cellValue] + winningPoints : winningPoints;
              console.log(`Player ${cellValue} won ${winningPoints} points vertically from row ${rowIndex+1}, column ${columnIndex+1}`);
            }
          }

          // Check diagonally downward
          if(rowIndex + this.desiredLengthOfLine <= this.gridRows) {
            // and forward
            if (columnIndex + this.desiredLengthOfLine <= this.gridColumns) {
              let counterCount = 1;
              for (let i = 1; i < this.desiredLengthOfLine; i++) {
                if (this.grid[rowIndex + i][columnIndex + i] === cellValue) {
                  counterCount++;
                }
              }
              if (counterCount === this.desiredLengthOfLine) {
                this.pointsTable[cellValue] = this.pointsTable[cellValue] ? this.pointsTable[cellValue] + winningPoints : winningPoints;
                console.log(`Player ${cellValue} won ${winningPoints} points diagonally downward and forward from row ${rowIndex+1}, column ${columnIndex+1}`);
              }
            }

            // and backward
            if (columnIndex + 1 - this.desiredLengthOfLine >= 0) {
              let counterCount = 1;
              for (let i = 1; i < this.desiredLengthOfLine; i++) {
                if (this.grid[rowIndex + i][columnIndex - i] === cellValue) {
                  counterCount++;
                }
              }
              if (counterCount === this.desiredLengthOfLine) {
                this.pointsTable[cellValue] = this.pointsTable[cellValue] ? this.pointsTable[cellValue] + winningPoints : winningPoints;
                console.log(`Player ${cellValue} won ${winningPoints} points diagonally downward and backward from row ${rowIndex+1}, column ${columnIndex+1}`);
              }
            }
          }
        }
      }
    }
    console.log(`Total points so far : ${JSON.stringify(this.pointsTable)}`);
  };

  play = () => {
    this.printGrid();

    for (let currentTurn = 1; currentTurn <= this.numberOfTurns; currentTurn++) {
      console.log(`Turn #${currentTurn}`);

      for (let currentPlayer = 1; currentPlayer <= this.numberOfPlayers; currentPlayer++) {
        console.log(`Player${currentPlayer}'s turn`);
        const column = readlineSync.question(`Enter column to place counter : `);
        const zeroBasedColumnIndex = column - 1;
        this.#addCounterToColumn( zeroBasedColumnIndex, currentPlayer);

        if (this.numberOfPlayers === 1) {
          // Computer should play against human
          console.log(`Computer's turn`);
          const zeroBasedColumnIndex = this.#strategize();
          this.#addCounterToColumn( zeroBasedColumnIndex, "C");
        }
      }
    }

    this.#findWinner();
  };
}