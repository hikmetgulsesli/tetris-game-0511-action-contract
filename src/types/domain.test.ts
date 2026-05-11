import { describe, it, expect } from 'vitest';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  createEmptyBoard,
  getPieceCells,
  isValidPosition,
  lockPiece,
  clearLines,
  getGhostY,
  rotatePiece,
  getDropInterval,
  calculateScore,
  randomTetromino,
  type ActivePiece,
  type TetrominoType,
} from '../types/domain';

describe('Tetris Domain Logic', () => {
  describe('createEmptyBoard', () => {
    it('creates a 10x20 board of nulls', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(BOARD_HEIGHT);
      expect(board[0].length).toBe(BOARD_WIDTH);
      expect(board.every((row) => row.every((cell) => cell === null))).toBe(true);
    });
  });

  describe('getPieceCells', () => {
    it('returns correct cells for O piece at origin', () => {
      const piece: ActivePiece = { type: 'O', x: 0, y: 0, rotation: 0 };
      const cells = getPieceCells(piece);
      expect(cells).toHaveLength(4);
      expect(cells).toContainEqual({ x: 0, y: 0 });
      expect(cells).toContainEqual({ x: 1, y: 0 });
      expect(cells).toContainEqual({ x: 0, y: 1 });
      expect(cells).toContainEqual({ x: 1, y: 1 });
    });

    it('returns correct cells for T piece with offset', () => {
      const piece: ActivePiece = { type: 'T', x: 3, y: 5, rotation: 0 };
      const cells = getPieceCells(piece);
      expect(cells).toContainEqual({ x: 4, y: 5 });
      expect(cells).toContainEqual({ x: 3, y: 6 });
      expect(cells).toContainEqual({ x: 4, y: 6 });
      expect(cells).toContainEqual({ x: 5, y: 6 });
    });
  });

  describe('isValidPosition', () => {
    it('returns true for piece in center of empty board', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'O', x: 4, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(true);
    });

    it('returns false for piece out of bounds left', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'O', x: -1, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('returns false for piece out of bounds right', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'I', x: 8, y: 0, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });

    it('returns false for piece overlapping locked cells', () => {
      const board = createEmptyBoard();
      board[5][5] = 'L';
      const piece: ActivePiece = { type: 'O', x: 4, y: 4, rotation: 0 };
      expect(isValidPosition(board, piece)).toBe(false);
    });
  });

  describe('lockPiece', () => {
    it('places piece cells onto board', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'T', x: 4, y: 5, rotation: 0 };
      const newBoard = lockPiece(board, piece);
      expect(newBoard[5][5]).toBe('T');
      expect(newBoard[6][4]).toBe('T');
      expect(newBoard[6][5]).toBe('T');
      expect(newBoard[6][6]).toBe('T');
    });

    it('does not mutate original board', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'O', x: 0, y: 0, rotation: 0 };
      lockPiece(board, piece);
      expect(board[0][0]).toBeNull();
    });
  });

  describe('clearLines', () => {
    it('clears a full line and adds empty line at top', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[19][x] = 'I';
      }
      const result = clearLines(board);
      expect(result.linesCleared).toBe(1);
      expect(result.board[19].every((c) => c === null)).toBe(true);
      expect(result.board[0].every((c) => c === null)).toBe(true);
    });

    it('clears multiple full lines', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[18][x] = 'O';
        board[19][x] = 'T';
      }
      const result = clearLines(board);
      expect(result.linesCleared).toBe(2);
      expect(result.board[18].every((c) => c === null)).toBe(true);
      expect(result.board[19].every((c) => c === null)).toBe(true);
    });

    it('does not clear partial lines', () => {
      const board = createEmptyBoard();
      board[19][0] = 'I';
      board[19][1] = 'I';
      const result = clearLines(board);
      expect(result.linesCleared).toBe(0);
      expect(result.board[19][0]).toBe('I');
      expect(result.board[19][1]).toBe('I');
    });
  });

  describe('getGhostY', () => {
    it('returns same y when piece is already on ground', () => {
      const board = createEmptyBoard();
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[19][x] = 'I';
      }
      const piece: ActivePiece = { type: 'O', x: 4, y: 17, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(17);
    });

    it('returns lower y when there is space below', () => {
      const board = createEmptyBoard();
      const piece: ActivePiece = { type: 'O', x: 4, y: 0, rotation: 0 };
      expect(getGhostY(board, piece)).toBe(18);
    });
  });

  describe('rotatePiece', () => {
    it('rotates clockwise', () => {
      const piece: ActivePiece = { type: 'T', x: 4, y: 5, rotation: 0 };
      const rotated = rotatePiece(piece, 1);
      expect(rotated.rotation).toBe(1);
      expect(rotated.x).toBe(4);
      expect(rotated.y).toBe(5);
    });

    it('rotates counter-clockwise', () => {
      const piece: ActivePiece = { type: 'T', x: 4, y: 5, rotation: 1 };
      const rotated = rotatePiece(piece, -1);
      expect(rotated.rotation).toBe(0);
    });

    it('wraps rotation from 3 to 0 clockwise', () => {
      const piece: ActivePiece = { type: 'T', x: 0, y: 0, rotation: 3 };
      const rotated = rotatePiece(piece, 1);
      expect(rotated.rotation).toBe(0);
    });

    it('wraps rotation from 0 to 3 counter-clockwise', () => {
      const piece: ActivePiece = { type: 'T', x: 0, y: 0, rotation: 0 };
      const rotated = rotatePiece(piece, -1);
      expect(rotated.rotation).toBe(3);
    });
  });

  describe('getDropInterval', () => {
    it('returns 1000ms at level 1', () => {
      expect(getDropInterval(1)).toBe(1000);
    });

    it('decreases interval as level increases', () => {
      expect(getDropInterval(2)).toBeLessThan(getDropInterval(1));
    });

    it('caps at 50ms for very high levels', () => {
      expect(getDropInterval(20)).toBe(50);
    });
  });

  describe('calculateScore', () => {
    it('returns 0 for 0 lines', () => {
      expect(calculateScore(0, 1)).toBe(0);
    });

    it('returns 100 * level for 1 line', () => {
      expect(calculateScore(1, 1)).toBe(100);
      expect(calculateScore(1, 5)).toBe(500);
    });

    it('returns 300 * level for 2 lines', () => {
      expect(calculateScore(2, 1)).toBe(300);
    });

    it('returns 500 * level for 3 lines', () => {
      expect(calculateScore(3, 1)).toBe(500);
    });

    it('returns 800 * level for 4 lines (Tetris)', () => {
      expect(calculateScore(4, 1)).toBe(800);
      expect(calculateScore(4, 5)).toBe(4000);
    });

    it('returns 0 for invalid line counts', () => {
      expect(calculateScore(5, 1)).toBe(0);
    });
  });

  describe('randomTetromino', () => {
    it('returns a valid tetromino type', () => {
      const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      for (let i = 0; i < 50; i++) {
        expect(types).toContain(randomTetromino());
      }
    });
  });
});
