import { checkWin, evaluateBoard, minimax, bestMove } from './aiConnectron.mjs';

describe('Connect4 AI', () => {
    let board;

    beforeEach(() => {
        board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
    });

    describe('checkWin', () => {
        it('should return true if player 1 wins horizontally', () => {
            board[0][0] = 1;
            board[0][1] = 1;
            board[0][2] = 1;
            board[0][3] = 1;
            expect(checkWin(1)).toBe(true);
        });

        it('should return true if player 2 wins vertically', () => {
            board[0][0] = 2;
            board[1][0] = 2;
            board[2][0] = 2;
            board[3][0] = 2;
            expect(checkWin(2)).toBe(true);
        });

        it('should return true if player 1 wins diagonally (top-left to bottom-right)', () => {
            board[0][0] = 1;
            board[1][1] = 1;
            board[2][2] = 1;
            board[3][3] = 1;
            expect(checkWin(1)).toBe(true);
        });

        it('should return true if player 2 wins diagonally (bottom-left to top-right)', () => {
            board[0][3] = 2;
            board[1][2] = 2;
            board[2][1] = 2;
            board[3][0] = 2;
            expect(checkWin(2)).toBe(true);
        });

        it('should return false if there is no winner', () => {
            expect(checkWin(1)).toBe(false);
            expect(checkWin(2)).toBe(false);
        });
    });

    describe('evaluateBoard', () => {
        it('should return 1 if player 1 wins', () => {
            board[0][0] = 1;
            board[0][1] = 1;
            board[0][2] = 1;
            board[0][3] = 1;
            expect(evaluateBoard()).toBe(1);
        });

        it('should return -1 if player 2 wins', () => {
            board[0][0] = 2;
            board[1][0] = 2;
            board[2][0] = 2;
            board[3][0] = 2;
            expect(evaluateBoard()).toBe(-1);
        });

        it('should return 0 if there is no winner', () => {
            expect(evaluateBoard()).toBe(0);
        });
    });

    describe('minimax', () => {
        it('should return 10 if player 2 has a winning move', () => {
            board[0][0] = 2;
            board[1][0] = 2;
            board[2][0] = 2;
            board[3][0] = 2;
            expect(minimax(0, -Infinity, Infinity, true)).toBe(10);
        });

        it('should return -10 if player 1 has a winning move', () => {
            board[0][0] = 1;
            board[0][1] = 1;
            board[0][2] = 1;
            board[0][3] = 1;
            expect(minimax(0, -Infinity, Infinity, false)).toBe(-10);
        });

        it('should return 0 if there is no winner', () => {
            expect(minimax(0, -Infinity, Infinity, true)).toBe(0);
            expect(minimax(0, -Infinity, Infinity, false)).toBe(0);
        });
    });

    describe('bestMove', () => {
        it('should return the column with the best move for player 2', () => {
            board[0][0] = 2;
            board[1][0] = 2;
            board[2][0] = 2;
            board[3][0] = 2;
            expect(bestMove()).toBe(0);
        });

        it('should return the column with the best move for player 1', () => {
            board[0][0] = 1;
            board[0][1] = 1;
            board[0][2] = 1;
            board[0][3] = 1;
            expect(bestMove()).toBe(0);
        });
    });
});