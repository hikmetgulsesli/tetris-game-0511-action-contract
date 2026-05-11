import { useMemo } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import {
  GameBoard,
  MainMenu,
  PauseOverlay,
  GameOver,
  GameOptions,
  ControlsHelp,
  NextPiecePreview,
} from './screens';
import {
  type ActivePiece,
  type Board,
  type TetrominoType,
  getPieceCells,
  getGhostY,
  TETROMINO_SHAPES,
} from './types/domain';
import './App.css';

function BoardRenderer({ board, currentPiece, ghost }: { board: Board; currentPiece: ActivePiece | null; ghost: boolean }) {
  const display = useMemo(() => {
    const grid: { type: TetrominoType | 'ghost'; color?: string }[][] = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => ({ type: null as unknown as TetrominoType | 'ghost' }))
    );

    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        if (board[y][x]) {
          grid[y][x] = { type: board[y][x] as TetrominoType };
        }
      }
    }

    if (currentPiece) {
      const ghostY = ghost ? getGhostY(board, currentPiece) : currentPiece.y;
      const cells = getPieceCells({ ...currentPiece, y: ghostY });
      for (const c of cells) {
        if (c.y >= 0 && c.y < 20 && c.x >= 0 && c.x < 10) {
          if (ghost && c.y !== currentPiece.y) {
            grid[c.y][c.x] = { type: 'ghost' };
          } else if (!ghost) {
            grid[c.y][c.x] = { type: currentPiece.type };
          }
        }
      }
    }

    return grid;
  }, [board, currentPiece, ghost]);

  return (
    <div className="tetris-grid">
      {display.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`tetris-cell ${cell.type === 'ghost' ? `ghost-block-${currentPiece?.type.toLowerCase()}` : cell.type ? `block-${cell.type.toLowerCase()}` : ''}`}
          />
        ))
      )}
    </div>
  );
}

function MiniPiece({ type, size = 16 }: { type: TetrominoType; size?: number }) {
  const shape = TETROMINO_SHAPES[type][0];
  const rows = shape.length;
  const cols = shape[0].length;
  return (
    <div
      className="grid gap-[1px]"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
      }}
    >
      {shape.flat().map((cell, i) => (
        <div
          key={i}
          className={cell ? `block-${type.toLowerCase()}` : 'bg-transparent'}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

function AppContent() {
  const { state, actions } = useAppContext();
  const { phase, board, currentPiece, nextPiece, holdPiece, stats, options } = state;

  const scoreFormatted = stats.score.toLocaleString('en-US', { minimumIntegerDigits: 6 });
  const levelFormatted = stats.level.toString().padStart(2, '0');
  const linesFormatted = stats.lines.toString().padStart(3, '0');
  const highScoreFormatted = stats.highScore.toLocaleString('en-US');

  const gameBoardActions = useMemo(
    () => ({
      'pause-1': actions.pauseGame,
      'settings-2': actions.goToOptions,
      'settings-system-3': actions.goToOptions,
      'controls-4': actions.goToHelp,
      'keyboard-arrow-up-5': actions.rotateCW,
      'keyboard-arrow-left-6': actions.moveLeft,
      'keyboard-arrow-down-7': actions.softDrop,
      'keyboard-arrow-right-8': actions.moveRight,
      'rotate-left-9': actions.rotateCCW,
      'rotate-right-10': actions.rotateCW,
    }),
    [actions]
  );

  const mainMenuActions = useMemo(
    () => ({
      'new-game-1': actions.startGame,
      'resume-2': actions.resumeGame,
      'options-3': actions.goToOptions,
      'help-4': actions.goToHelp,
    }),
    [actions]
  );

  const pauseActions = useMemo(
    () => ({
      'pause-1': actions.resumeGame,
      'settings-2': actions.goToOptions,
      'play-arrow-resume-3': actions.resumeGame,
      'replay-restart-game-4': actions.restartGame,
      'tune-settings-5': actions.goToOptions,
      'logout-quit-to-menu-6': actions.quitToMenu,
    }),
    [actions]
  );

  const gameOverActions = useMemo(
    () => ({
      'play-arrow-play-again-1': actions.restartGame,
      'menu-main-menu-2': actions.quitToMenu,
    }),
    [actions]
  );

  const optionsActions = useMemo(
    () => ({
      'arrow-back-1': actions.goBack,
      'reset-defaults-2': actions.resetOptions,
      'back-to-game-3': actions.goBack,
      'slow-4': () => actions.setOptions({ dasDelay: 200 }),
      'normal-5': () => actions.setOptions({ dasDelay: 133 }),
      'fast-6': () => actions.setOptions({ dasDelay: 80 }),
      'back-to-game-7': actions.goBack,
      'reset-defaults-8': actions.resetOptions,
    }),
    [actions]
  );

  const helpActions = useMemo(
    () => ({
      'menu-1': actions.quitToMenu,
      'pause-2': actions.pauseGame,
      'settings-3': actions.goToOptions,
    }),
    [actions]
  );

  const isNewHighScore = phase === 'gameover' && stats.score >= stats.highScore && stats.score > 0;

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-base overflow-hidden relative">
      {phase === 'menu' && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          <MainMenu actions={mainMenuActions} />
          {/* Inject high score into MainMenu */}
          <div className="absolute -top-32 w-full flex justify-center pointer-events-none">
            <div className="bg-surface-container-low border border-outline-variant px-6 py-3 rounded-lg flex flex-col items-center shadow-[0_0_15px_rgba(74,225,118,0.1)] backdrop-blur-md">
              <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">High Score</span>
              <span className="font-mono-score text-mono-score text-secondary">{highScoreFormatted}</span>
            </div>
          </div>
        </div>
      )}

      {(phase === 'playing' || phase === 'paused' || phase === 'gameover') && (
        <div className="relative min-h-screen">
          <GameBoard actions={gameBoardActions} />
          {/* Overlay the actual board rendering */}
          <div className="absolute inset-0 pt-[60px] md:pt-0 md:pl-[320px] flex flex-col items-center justify-center pointer-events-none">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full max-w-[800px] justify-center p-4">
              {/* Left HUD */}
              <div className="flex md:flex-col gap-4 w-full md:w-[160px] order-2 md:order-1 justify-between md:justify-start">
                <div className="bg-surface border border-outline-variant rounded p-4 flex-1 md:flex-none">
                  <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">SCORE</div>
                  <div className="font-mono-score text-mono-score text-primary text-right">{scoreFormatted}</div>
                </div>
                <div className="bg-surface border border-outline-variant rounded p-4 flex-1 md:flex-none">
                  <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">LEVEL</div>
                  <div className="font-mono-score text-mono-score text-primary text-right">{levelFormatted}</div>
                  <div className="h-1 bg-surface-container-highest rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${((stats.lines % 10) / 10) * 100}%`, boxShadow: '0 0 8px #4ae176' }}
                    />
                  </div>
                </div>
                <div className="bg-surface border border-outline-variant rounded p-4 flex-1 md:flex-none hidden md:block">
                  <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">LINES</div>
                  <div className="font-mono-score text-mono-score text-primary text-right">{linesFormatted}</div>
                </div>
              </div>

              {/* Center Board */}
              <div className="order-1 md:order-2">
                <div className="bg-surface border border-outline-variant p-2 rounded shadow-[0_0_30px_rgba(15,23,42,0.8)]">
                  <div className="w-[280px] h-[560px] md:w-[320px] md:h-[640px] tetris-grid">
                    <BoardRenderer board={board} currentPiece={currentPiece} ghost={options.ghostPiece} />
                  </div>
                </div>
              </div>

              {/* Right HUD */}
              <div className="flex md:flex-col gap-4 w-full md:w-[160px] order-3 md:order-3 justify-between md:justify-start">
                <div className="bg-surface border border-outline-variant rounded p-4 flex-1 md:flex-none">
                  <div className="font-mono-label text-mono-label text-on-surface-variant mb-4 text-center">NEXT</div>
                  <div className="h-20 flex items-center justify-center">
                    {nextPiece ? (
                      <MiniPiece type={nextPiece} size={20} />
                    ) : (
                      <div className="w-16 h-16" />
                    )}
                  </div>
                </div>
                <div className="bg-surface border border-outline-variant rounded p-4 flex-1 md:flex-none opacity-80">
                  <div className="font-mono-label text-mono-label text-on-surface-variant mb-4 text-center">HOLD</div>
                  <div className="h-20 flex items-center justify-center">
                    {holdPiece ? (
                      <MiniPiece type={holdPiece} size={20} />
                    ) : (
                      <div className="w-16 h-16" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {phase === 'paused' && (
            <div className="absolute inset-0 z-50">
              <PauseOverlay actions={pauseActions} />
              {/* Inject live stats into pause overlay */}
              <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-sm p-8 flex flex-col items-center">
                  <div className="mb-10 text-center">
                    <div className="flex justify-center gap-6 mt-4 opacity-70">
                      <div className="flex flex-col items-center">
                        <span className="font-mono-label text-mono-label text-on-surface-variant uppercase">Score</span>
                        <span className="font-mono-score text-mono-score text-primary">{scoreFormatted}</span>
                      </div>
                      <div className="w-px bg-outline-variant h-8" />
                      <div className="flex flex-col items-center">
                        <span className="font-mono-label text-mono-label text-on-surface-variant uppercase">Level</span>
                        <span className="font-mono-score text-mono-score text-secondary">{levelFormatted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === 'gameover' && (
            <div className="absolute inset-0 z-50">
              <GameOver actions={gameOverActions} />
              {/* Inject live stats into game over overlay */}
              <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none">
                <div className="relative z-10 w-full max-w-md glass-panel bg-surface/40 border border-outline-variant rounded p-6 flex flex-col items-center text-center shadow-2xl mt-20">
                  {isNewHighScore && (
                    <div className="bg-secondary-container/20 border border-secondary text-secondary font-mono-label text-mono-label px-3 py-1 rounded-full mb-8 flex items-center gap-2 animate-pulse">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                      NEW HIGH SCORE!
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    <div className="col-span-2 bg-surface-container border border-outline-variant rounded p-4 flex flex-col items-center justify-center">
                      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-2">Final Score</span>
                      <span className="font-mono-score text-display text-primary">{scoreFormatted}</span>
                    </div>
                    <div className="bg-surface-container border border-outline-variant rounded p-4 flex flex-col items-center justify-center">
                      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">Level</span>
                      <span className="font-mono-score text-headline-lg text-on-surface">{levelFormatted}</span>
                    </div>
                    <div className="bg-surface-container border border-outline-variant rounded p-4 flex flex-col items-center justify-center">
                      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">Lines</span>
                      <span className="font-mono-score text-headline-lg text-on-surface">{linesFormatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'options' && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
          <GameOptions actions={optionsActions} />
          {/* Inject options state */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto p-6 mt-20">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Sound Effects</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.sfx}
                      onChange={(e) => actions.setOptions({ sfx: e.target.checked })}
                      className="pointer-events-auto"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Background Music</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options.music}
                      onChange={(e) => actions.setOptions({ music: e.target.checked })}
                      className="pointer-events-auto"
                    />
                  </div>
                </div>
                <div className="glass-panel p-6 rounded flex flex-col gap-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Starting Level</span>
                    </div>
                    <span className="font-mono-score text-mono-score text-secondary">LVL {options.startLevel}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={options.startLevel}
                    onChange={(e) => actions.setOptions({ startLevel: parseInt(e.target.value) })}
                    className="w-full pointer-events-auto"
                  />
                  <div className="flex justify-between mt-2 font-mono-label text-mono-label text-on-surface-variant opacity-60">
                    <span>1</span>
                    <span>15</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`h-touch-target rounded border font-mono-label text-mono-label uppercase pointer-events-auto ${options.dasDelay === 200 ? 'bg-secondary-container/20 border-secondary text-secondary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'}`}
                      onClick={() => actions.setOptions({ dasDelay: 200 })}
                    >
                      Slow
                    </button>
                    <button
                      className={`h-touch-target rounded border font-mono-label text-mono-label uppercase pointer-events-auto ${options.dasDelay === 133 ? 'bg-secondary-container/20 border-secondary text-secondary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'}`}
                      onClick={() => actions.setOptions({ dasDelay: 133 })}
                    >
                      Normal
                    </button>
                    <button
                      className={`h-touch-target rounded border font-mono-label text-mono-label uppercase pointer-events-auto ${options.dasDelay === 80 ? 'bg-secondary-container/20 border-secondary text-secondary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'}`}
                      onClick={() => actions.setOptions({ dasDelay: 80 })}
                    >
                      Fast
                    </button>
                  </div>
                </div>
                <div className="glass-panel p-6 rounded flex flex-col gap-6 md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Ghost Piece</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={options.ghostPiece}
                        onChange={(e) => actions.setOptions({ ghostPiece: e.target.checked })}
                        className="pointer-events-auto"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Scanline Filter</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={options.scanline}
                        onChange={(e) => actions.setOptions({ scanline: e.target.checked })}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'help' && (
        <div className="min-h-screen">
          <ControlsHelp actions={helpActions} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
