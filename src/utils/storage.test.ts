import { describe, it, expect, beforeEach } from 'vitest';
import { loadHighScore, saveHighScore, loadOptions, saveOptions, DEFAULT_OPTIONS } from '../utils/storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('High Score', () => {
    it('returns 0 when no high score is stored', () => {
      expect(loadHighScore()).toBe(0);
    });

    it('saves and loads high score', () => {
      saveHighScore(5000);
      expect(loadHighScore()).toBe(5000);
    });

    it('updates high score when new score is higher', () => {
      saveHighScore(3000);
      saveHighScore(8000);
      expect(loadHighScore()).toBe(8000);
    });

    it('returns 0 when localStorage has invalid data', () => {
      localStorage.setItem('tetris-high-score', 'not-a-number');
      expect(loadHighScore()).toBe(0);
    });
  });

  describe('Options', () => {
    it('returns default options when none are stored', () => {
      const opts = loadOptions();
      expect(opts).toEqual(DEFAULT_OPTIONS);
    });

    it('saves and loads custom options', () => {
      const custom = { ...DEFAULT_OPTIONS, startLevel: 5, ghostPiece: false };
      saveOptions(custom);
      const loaded = loadOptions();
      expect(loaded.startLevel).toBe(5);
      expect(loaded.ghostPiece).toBe(false);
      expect(loaded.dasDelay).toBe(DEFAULT_OPTIONS.dasDelay);
    });

    it('merges partial options with defaults', () => {
      saveOptions({ startLevel: 10, ghostPiece: true, dasDelay: 133, sfx: true, music: true, scanline: false });
      const loaded = loadOptions();
      expect(loaded.startLevel).toBe(10);
      expect(loaded.ghostPiece).toBe(DEFAULT_OPTIONS.ghostPiece);
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('tetris-options', 'invalid-json');
      const opts = loadOptions();
      expect(opts).toEqual(DEFAULT_OPTIONS);
    });
  });
});
