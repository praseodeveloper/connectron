import assert from 'node:assert';
import Connectron from "./connectron.js";

const testData = [
  {
    rows: 6,
    columns: 6,
    playerCount: 2,
    lineLength: 4,
    grid : [
      ['2', '1', '2', '1', '2', '1'],
      ['1', '2', '1', '1', '1', '2'],
      ['2', '1', '2', '2', '2', '1'],
      ['1', '2', '1', '1', '1', '2'],
      ['2', '1', '2', '2', '1', '2'],
      ['1', '1', '2', '2', '2', '1']
    ],
    expected: {"1": 2, "2": 2}
  },
  {
    rows: 6,
    columns: 6,
    playerCount: 2,
    lineLength: 3,
    grid : [
      ['2', '1', '2', '1', '2', '1'],
      ['1', '2', '1', '1', '1', '2'],
      ['2', '1', '2', '2', '2', '1'],
      ['1', '2', '1', '1', '1', '2'],
      ['2', '1', '2', '2', '1', '2'],
      ['1', '1', '2', '2', '2', '1']
    ],
    expected: {"1": 16, "2": 14}
  }
];

const runTests = () => {
  testData.forEach((data, index) => {
    const testGame = new Connectron(data.rows, data.columns, data.playerCount, data.lineLength);
    testGame.grid = data.grid;
    testGame.printGrid();
    const expected = data.expected;
    testGame.calculatePoints();
    try {
      assert.deepEqual(testGame.pointsTable, expected);
      console.log(`Test #${index+1} passed!`);
    }
    catch(e) {
      console.error("Test failed!", e);
    }
  });
};

// Run tests
runTests();