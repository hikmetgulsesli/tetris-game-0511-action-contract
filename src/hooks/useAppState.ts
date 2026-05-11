import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type ActivePiece,
  type Board,
  type GamePhase,
  type GameStats,
  type TetrominoType,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  calculateScore,
  createEmptyBoard,
  clearLines,
  getDropInterval,
  getGhostY,
  getPieceCells,
  isValidPosition,
  lockPiece,
  randomTetromino,
  rotatePiece,
} from '../types/domain';
import { loadHighScore, saveHighScore, type StorageOptions, DEFAULT_OPTIONS, loadOptions, saveOptions } from '../utils/storage';

export interface AppState {
  phase: GamePhase;
  board: Board;
  currentPiece: ActivePiece | null;
  nextPiece: TetrominoType | null;
  holdPiece: TetrominoType | null;
  canHold: boolean;
  stats: GameStats;
  options: StorageOptions;
}

export interface AppActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  quitToMenu: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  rotateCW: () => void;
  rotateCCW: () => void;
  hold: () => void;
  goToOptions: () => void;
  goToHelp: () => void;
  goBack: () => void;
  setOptions: (opts: Partial<StorageOptions>) => void;
  resetOptions: () => void;
}

export interface UseAppStateReturn {
  state: AppState;
  actions: AppActions;
}

function spawnPiece(type: TetrominoType): ActivePiece {
  const spawnX = Math.floor(BOARD_WIDTH / 2) - 1;
  return { type, x: spawnX, y: 0, rotation: 0 };
}

function tryWallKick(board: Board, piece: ActivePiece, targetRotation: number): ActivePiece | null {
  const kicks = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -2, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
  ];
  for (const kick of kicks) {
    const candidate: ActivePiece = { ...piece, rotation: targetRotation, x: piece.x + kick.x, y: piece.y + kick.y };
    if (isValidPosition(board, candidate)) {
      return candidate;
    }
  }
  return null;
}

export function useAppState(): UseAppStateReturn {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<ActivePiece | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoType | null>(null);
  const [holdPiece, setHoldPiece] = useState<TetrominoType | null>(null);
  const [canHold, setCanHold] = useState(true);
  const [stats, setStats] = useState<GameStats>({ score: 0, level: 1, lines: 0, highScore: loadHighScore() });
  const [options, setOptionsState] = useState<StorageOptions>(loadOptions());

  const phaseRef = useRef(phase);
  const boardRef = useRef(board);
  const currentPieceRef = useRef(currentPiece);
  const nextPieceRef = useRef(nextPiece);
  const holdPieceRef = useRef(holdPiece);
  const canHoldRef = useRef(canHold);
  const statsRef = useRef(stats);
  const optionsRef = useRef(options);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { boardRef.current = board; }, [board]);
  useEffect(() => { currentPieceRef.current = currentPiece; }, [currentPiece]);
  useEffect(() => { nextPieceRef.current = nextPiece; }, [nextPiece]);
  useEffect(() => { holdPieceRef.current = holdPiece; }, [holdPiece]);
  useEffect(() => { canHoldRef.current = canHold; }, [canHold]);
  useEffect(() => { statsRef.current = stats; }, [stats]);
  useEffect(() => { optionsRef.current = options; }, [options]);

  const spawnNextPiece = useCallback(() => {
    const next = nextPieceRef.current ?? randomTetromino();
    const newNext = randomTetromino();
    const piece = spawnPiece(next);
    if (!isValidPosition(boardRef.current, piece)) {
      setPhase('gameover');
      const finalStats = statsRef.current;
      const newHigh = Math.max(finalStats.highScore, finalStats.score);
      if (newHigh > finalStats.highScore) {
        saveHighScore(newHigh);
      }
      setStats((s) => ({ ...s, highScore: newHigh }));
      return false;
    }
    setCurrentPiece(piece);
    setNextPiece(newNext);
    setCanHold(true);
    return true;
  }, []);

  const startGame = useCallback(() => {
    const startLevel = optionsRef.current.startLevel;
    const newBoard = createEmptyBoard();
    const first = randomTetromino();
    const second = randomTetromino();
    const piece = spawnPiece(first);
    setBoard(newBoard);
    setCurrentPiece(piece);
    setNextPiece(second);
    setHoldPiece(null);
    setCanHold(true);
    setStats({ score: 0, level: startLevel, lines: 0, highScore: loadHighScore() });
    setPhase('playing');
  }, []);

  const pauseGame = useCallback(() => {
    if (phaseRef.current === 'playing') setPhase('paused');
  }, []);

  const resumeGame = useCallback(() => {
    if (phaseRef.current === 'paused') setPhase('playing');
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const quitToMenu = useCallback(() => {
    setPhase('menu');
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setNextPiece(null);
    setHoldPiece(null);
    setCanHold(true);
  }, []);

  const moveLeft = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const candidate = { ...currentPieceRef.current, x: currentPieceRef.current.x - 1 };
    if (isValidPosition(boardRef.current, candidate)) {
      setCurrentPiece(candidate);
    }
  }, []);

  const moveRight = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const candidate = { ...currentPieceRef.current, x: currentPieceRef.current.x + 1 };
    if (isValidPosition(boardRef.current, candidate)) {
      setCurrentPiece(candidate);
    }
  }, []);

  const softDrop = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const candidate = { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 };
    if (isValidPosition(boardRef.current, candidate)) {
      setCurrentPiece(candidate);
      setStats((s) => ({ ...s, score: s.score + 1 }));
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const ghostY = getGhostY(boardRef.current, currentPieceRef.current);
    const dropDistance = ghostY - currentPieceRef.current.y;
    const lockedBoard = lockPiece(boardRef.current, { ...currentPieceRef.current, y: ghostY });
    const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
    const newLines = statsRef.current.lines + linesCleared;
    const newLevel = Math.max(optionsRef.current.startLevel, Math.floor(newLines / 10) + 1);
    const lineScore = calculateScore(linesCleared, statsRef.current.level);
    const newScore = statsRef.current.score + lineScore + dropDistance * 2;
    setBoard(clearedBoard);
    setStats({ score: newScore, level: newLevel, lines: newLines, highScore: statsRef.current.highScore });
    spawnNextPiece();
  }, [spawnNextPiece]);

  const rotateCW = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const target = rotatePiece(currentPieceRef.current, 1);
    const kicked = tryWallKick(boardRef.current, currentPieceRef.current, target.rotation);
    if (kicked) {
      setCurrentPiece(kicked);
    }
  }, []);

  const rotateCCW = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current) return;
    const target = rotatePiece(currentPieceRef.current, -1);
    const kicked = tryWallKick(boardRef.current, currentPieceRef.current, target.rotation);
    if (kicked) {
      setCurrentPiece(kicked);
    }
  }, []);

  const hold = useCallback(() => {
    if (phaseRef.current !== 'playing' || !currentPieceRef.current || !canHoldRef.current) return;
    const currentType = currentPieceRef.current.type;
    const held = holdPieceRef.current;
    if (held) {
      setCurrentPiece(spawnPiece(held));
    } else {
      spawnNextPiece();
    }
    setHoldPiece(currentType);
    setCanHold(false);
  }, [spawnNextPiece]);

  const goToOptions = useCallback(() => {
    const prev = phaseRef.current;
    setPhase('options');
    if (prev === 'playing') {
      // remember we were playing so back can resume
      // we store this implicitly by the fact that board/currentPiece exist
    }
  }, []);

  const goToHelp = useCallback(() => {
    setPhase('help');
  }, []);

  const goBack = useCallback(() => {
    if (phaseRef.current === 'options') {
      if (boardRef.current.some((row) => row.some((c) => c !== null)) || currentPieceRef.current) {
        setPhase('paused');
      } else {
        setPhase('menu');
      }
    } else if (phaseRef.current === 'help') {
      setPhase('menu');
    }
  }, []);

  const setOptions = useCallback((opts: Partial<StorageOptions>) => {
    setOptionsState((prev) => {
      const next = { ...prev, ...opts };
      saveOptions(next);
      return next;
    });
  }, []);

  const resetOptions = useCallback(() => {
    setOptionsState({ ...DEFAULT_OPTIONS });
    saveOptions({ ...DEFAULT_OPTIONS });
  }, []);

  // Game loop
  const lastDropRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const loop = (timestamp: number) => {
      if (phaseRef.current === 'playing' && currentPieceRef.current) {
        const interval = getDropInterval(statsRef.current.level);
        if (timestamp - lastDropRef.current >= interval) {
          lastDropRef.current = timestamp;
          const candidate = { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 };
          if (isValidPosition(boardRef.current, candidate)) {
            setCurrentPiece(candidate);
          } else {
            const lockedBoard = lockPiece(boardRef.current, currentPieceRef.current);
            const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
            const newLines = statsRef.current.lines + linesCleared;
            const newLevel = Math.max(optionsRef.current.startLevel, Math.floor(newLines / 10) + 1);
            const lineScore = calculateScore(linesCleared, statsRef.current.level);
            const newScore = statsRef.current.score + lineScore;
            setBoard(clearedBoard);
            setStats((s) => ({ score: newScore, level: newLevel, lines: newLines, highScore: s.highScore }));
            const spawned = spawnNextPiece();
            if (!spawned) {
              // gameover already handled in spawnNextPiece
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spawnNextPiece]);

  // Keyboard handling
  useEffect(() => {
    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      const gameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'p', 'P', 'c', 'C', 'z', 'Z', 'x', 'X'];
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
      }
      keys[e.key] = true;

      if (phaseRef.current === 'playing') {
        switch (e.key) {
          case 'ArrowLeft':
            moveLeft();
            break;
          case 'ArrowRight':
            moveRight();
            break;
          case 'ArrowDown':
            softDrop();
            break;
          case 'ArrowUp':
          case 'x':
          case 'X':
            rotateCW();
            break;
          case 'z':
          case 'Z':
            rotateCCW();
            break;
          case ' ':
            hardDrop();
            break;
          case 'c':
          case 'C':
            hold();
            break;
          case 'p':
          case 'P':
            pauseGame();
            break;
        }
      } else if (phaseRef.current === 'paused') {
        if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
          resumeGame();
        }
      } else if (phaseRef.current === 'menu') {
        if (e.key === 'Enter' || e.key === ' ') {
          startGame();
        }
      } else if (phaseRef.current === 'gameover') {
        if (e.key === 'Enter' || e.key === ' ') {
          restartGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveLeft, moveRight, softDrop, hardDrop, rotateCW, rotateCCW, hold, pauseGame, resumeGame, startGame, restartGame]);

  // Test bridge (mandatory for smoke tests)
  useEffect(() => {
    const gameObj = {
      get player() {
        const p = currentPieceRef.current;
        return p ? { x: p.x, y: p.y, type: p.type, rotation: p.rotation } : null;
      },
      get state() {
        return phaseRef.current;
      },
      get score() {
        return statsRef.current.score;
      },
      get level() {
        return statsRef.current.level;
      },
      get lines() {
        return statsRef.current.lines;
      },
      get board() {
        return boardRef.current;
      },
      get nextPiece() {
        return nextPieceRef.current;
      },
      get holdPiece() {
        return holdPieceRef.current;
      },
    };

    (window as unknown as Record<string, unknown>).game = gameObj;

    (window as unknown as Record<string, unknown>).render_game_to_text = () => {
      return JSON.stringify({
        mode: phaseRef.current,
        player: gameObj.player,
        entities: [],
        score: statsRef.current.score,
        level: statsRef.current.level,
        lines: statsRef.current.lines,
        isGrounded: currentPieceRef.current
          ? !isValidPosition(boardRef.current, { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 })
          : false,
      });
    };

    (window as unknown as Record<string, unknown>).advanceTime = (ms: number) => {
      const steps = Math.max(1, Math.round(ms / (1000 / 60)));
      for (let i = 0; i < steps; i++) {
        // Simulate one frame of drop logic
        if (phaseRef.current === 'playing' && currentPieceRef.current) {
          const candidate = { ...currentPieceRef.current, y: currentPieceRef.current.y + 1 };
          if (isValidPosition(boardRef.current, candidate)) {
            setCurrentPiece(candidate);
          } else {
            const lockedBoard = lockPiece(boardRef.current, currentPieceRef.current);
            const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
            const newLines = statsRef.current.lines + linesCleared;
            const newLevel = Math.max(optionsRef.current.startLevel, Math.floor(newLines / 10) + 1);
            const lineScore = calculateScore(linesCleared, statsRef.current.level);
            const newScore = statsRef.current.score + lineScore;
            setBoard(clearedBoard);
            setStats((s) => ({ score: newScore, level: newLevel, lines: newLines, highScore: s.highScore }));
            spawnNextPiece();
          }
        }
      }
    };
  }, [spawnNextPiece]);

  return {
    state: { phase, board, currentPiece, nextPiece, holdPiece, canHold, stats, options },
    actions: {
      startGame,
      pauseGame,
      resumeGame,
      restartGame,
      quitToMenu,
      moveLeft,
      moveRight,
      softDrop,
      hardDrop,
      rotateCW,
      rotateCCW,
      hold,
      goToOptions,
      goToHelp,
      goBack,
      setOptions,
      resetOptions,
    },
  };
}
