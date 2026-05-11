export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Cell = TetrominoType | null;

export type Board = Cell[][];

export interface Position {
  x: number;
  y: number;
}

export interface ActivePiece {
  type: TetrominoType;
  x: number;
  y: number;
  rotation: number;
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameover' | 'options' | 'help';

export interface GameStats {
  score: number;
  level: number;
  lines: number;
  highScore: number;
}

export interface GameState {
  phase: GamePhase;
  board: Board;
  currentPiece: ActivePiece | null;
  nextPiece: TetrominoType | null;
  holdPiece: TetrominoType | null;
  canHold: boolean;
  stats: GameStats;
}

export interface GameOptions {
  startLevel: number;
  ghostPiece: boolean;
  dasDelay: number;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINO_SHAPES: Record<TetrominoType, number[][][]> = {
  I: [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  ],
  O: [
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
  ],
  T: [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
  ],
  S: [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
  ],
  Z: [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]],
  ],
  J: [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  ],
  L: [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  ],
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
};

export const LINE_SCORES = [0, 100, 300, 500, 800];

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array.from({ length: BOARD_WIDTH }, () => null));
}

export function getPieceCells(piece: ActivePiece): Position[] {
  const shape = TETROMINO_SHAPES[piece.type][piece.rotation % 4];
  const cells: Position[] = [];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        cells.push({ x: piece.x + c, y: piece.y + r });
      }
    }
  }
  return cells;
}

export function isValidPosition(board: Board, piece: ActivePiece): boolean {
  const cells = getPieceCells(piece);
  for (const cell of cells) {
    if (cell.x < 0 || cell.x >= BOARD_WIDTH || cell.y >= BOARD_HEIGHT) return false;
    if (cell.y >= 0 && board[cell.y][cell.x] !== null) return false;
  }
  return true;
}

export function lockPiece(board: Board, piece: ActivePiece): Board {
  const newBoard = board.map((row) => [...row]);
  const cells = getPieceCells(piece);
  for (const cell of cells) {
    if (cell.y >= 0 && cell.y < BOARD_HEIGHT && cell.x >= 0 && cell.x < BOARD_WIDTH) {
      newBoard[cell.y][cell.x] = piece.type;
    }
  }
  return newBoard;
}

export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = board.filter((row) => row.some((cell) => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }
  return { board: newBoard, linesCleared };
}

export function getGhostY(board: Board, piece: ActivePiece): number {
  let ghostY = piece.y;
  while (isValidPosition(board, { ...piece, y: ghostY + 1 })) {
    ghostY++;
  }
  return ghostY;
}

export function rotatePiece(piece: ActivePiece, direction: 1 | -1): ActivePiece {
  const newRotation = (piece.rotation + direction + 4) % 4;
  return { ...piece, rotation: newRotation };
}

export function getDropInterval(level: number): number {
  return Math.max(50, 1000 - (level - 1) * 80);
}

export function calculateScore(linesCleared: number, level: number): number {
  if (linesCleared < 1 || linesCleared > 4) return 0;
  return LINE_SCORES[linesCleared] * level;
}

export function randomTetromino(): TetrominoType {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
}
