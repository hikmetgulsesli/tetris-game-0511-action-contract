const STORAGE_KEY = 'tetris-high-score';
const OPTIONS_KEY = 'tetris-options';

export interface StorageOptions {
  startLevel: number;
  ghostPiece: boolean;
  dasDelay: number;
  sfx: boolean;
  music: boolean;
  scanline: boolean;
}

export const DEFAULT_OPTIONS: StorageOptions = {
  startLevel: 1,
  ghostPiece: true,
  dasDelay: 133,
  sfx: true,
  music: true,
  scanline: false,
};

export function loadHighScore(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'number') return parsed;
    }
  } catch {
    // ignore
  }
  return 0;
}

export function saveHighScore(score: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
  } catch {
    // ignore
  }
}

export function loadOptions(): StorageOptions {
  try {
    const raw = localStorage.getItem(OPTIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_OPTIONS, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_OPTIONS };
}

export function saveOptions(options: StorageOptions): void {
  try {
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(options));
  } catch {
    // ignore
  }
}
