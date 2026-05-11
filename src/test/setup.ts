import '@testing-library/jest-dom';

declare global {
  interface Window {
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
    game?: {
      player: { x: number; y: number; type: string; rotation: number } | null;
      state: string;
      score: number;
      level: number;
      lines: number;
      board: (string | null)[][];
      nextPiece: string | null;
      holdPiece: string | null;
    };
  }
}

export {};
