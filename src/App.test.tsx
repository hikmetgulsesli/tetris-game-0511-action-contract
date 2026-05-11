import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.render_game_to_text;
    delete window.advanceTime;
    delete window.game;
  });

  it('renders main menu on initial load', () => {
    render(<App />);
    expect(screen.getByText('TETRI-CORE')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  it('starts game when New Game is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('New Game'));
    await waitFor(() => {
      expect(screen.queryByText('New Game')).not.toBeInTheDocument();
    });
    const text = (window as unknown as Record<string, () => string>).render_game_to_text?.() ?? '{}';
    const state = JSON.parse(text);
    expect(state.mode).toBe('playing');
  });

  it('shows high score from localStorage', () => {
    localStorage.setItem('tetris-high-score', '12345');
    render(<App />);
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it('exposes test bridge functions on window', async () => {
    render(<App />);
    await waitFor(() => {
      expect(typeof window.render_game_to_text).toBe('function');
      expect(typeof window.advanceTime).toBe('function');
      expect(window.game).toBeDefined();
    });
  });

  it('test bridge returns correct initial state', async () => {
    render(<App />);
    await waitFor(() => {
      const text = (window as unknown as Record<string, () => string>).render_game_to_text?.() ?? '{}';
      const state = JSON.parse(text);
      expect(state.mode).toBe('menu');
    });
  });

  it('test bridge advances time and updates state', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('New Game'));
    await waitFor(() => {
      const text = (window as unknown as Record<string, () => string>).render_game_to_text?.() ?? '{}';
      const state = JSON.parse(text);
      expect(state.mode).toBe('playing');
    });
    (window as unknown as Record<string, (ms: number) => void>).advanceTime?.(1000);
    const text = (window as unknown as Record<string, () => string>).render_game_to_text?.() ?? '{}';
    const state = JSON.parse(text);
    expect(state.mode).toBe('playing');
  });

  it('navigates to help screen', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Help'));
    await waitFor(() => {
      expect(screen.getByText('OPERATIONAL MANUAL')).toBeInTheDocument();
    });
  });

  it('navigates to options screen', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Options'));
    await waitFor(() => {
      expect(screen.getByText('SETTINGS')).toBeInTheDocument();
    });
  });
});
