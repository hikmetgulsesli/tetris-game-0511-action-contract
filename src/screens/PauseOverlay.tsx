// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Pause Overlay
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type PauseOverlayActionId = "pause-1" | "settings-2" | "play-arrow-resume-3" | "replay-restart-game-4" | "tune-settings-5" | "logout-quit-to-menu-6";

export interface PauseOverlayProps {
  actions?: Partial<Record<PauseOverlayActionId, () => void>>;
}

export function PauseOverlay({ actions }: PauseOverlayProps) {
  return (
    <>
      {/* Simulated Game Background (Level 0) */}
      <div className="absolute inset-0 bg-game-board opacity-30 z-0"></div>
      {/* Dummy Game Pieces to make it look like a real game is paused behind */}
      <div className="absolute inset-0 z-0 flex justify-center mt-20 pointer-events-none">
      <div className="w-board-width h-[640px] border border-surface-variant relative">
      {/* T-Piece (Active/Ghost simulation) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
      <div className="w-cell-size h-cell-size bg-secondary border border-surface-variant"></div>
      <div className="flex">
      <div className="w-cell-size h-cell-size bg-secondary border border-surface-variant"></div>
      <div className="w-cell-size h-cell-size bg-secondary border border-surface-variant"></div>
      <div className="w-cell-size h-cell-size bg-secondary border border-surface-variant"></div>
      </div>
      </div>
      {/* Stacked Pieces */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex flex-wrap opacity-20">
      <div className="w-cell-size h-cell-size bg-primary border border-surface-variant ml-[32px]"></div>
      <div className="w-cell-size h-cell-size bg-tertiary border border-surface-variant"></div>
      <div className="w-cell-size h-cell-size bg-error border border-surface-variant ml-[64px]"></div>
      </div>
      </div>
      </div>
      {/* Top Navigation Shell - Included as requested for context, though highly minimal due to pause state */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin h-touch-target bg-background/80 backdrop-blur-xl border-b border-outline-variant text-primary font-headline-md text-headline-md">
      <div className="font-display text-headline-lg font-extrabold tracking-tighter text-secondary">TETRI-CORE</div>
      <div className="flex gap-4">
      <button aria-label="Pause" className="hover:text-secondary transition-colors duration-200 opacity-70" type="button" data-action-id="pause-1" onClick={actions?.["pause-1"]}>
      <span className="material-symbols-outlined" data-icon="pause">pause</span>
      </button>
      <button aria-label="Settings" className="hover:text-secondary transition-colors duration-200 text-on-surface-variant" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <span className="material-symbols-outlined" data-icon="settings">settings</span>
      </button>
      </div>
      </nav>
      {/* Side Navigation Shell - Hidden on mobile, visible on desktop, reflecting 'Marathon' active state */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col pt-20 z-40 bg-surface-container-low/90 backdrop-blur-lg border-r border-outline-variant w-board-width text-primary font-mono-label text-mono-label uppercase tracking-widest">
      <div className="px-margin mb-8">
      <h2 className="font-display text-headline-md text-primary">COMMAND</h2>
      <p className="text-on-surface-variant opacity-60 mt-1">V.1.0.4</p>
      </div>
      <nav className="flex flex-col flex-grow">
      {/* Active State: Marathon */}
      <a className="flex items-center px-margin py-4 bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary scale-95 transition-transform duration-150" href="#">
      <span className="material-symbols-outlined mr-4" data-icon="timer">timer</span>
                      Marathon
                  </a>
      {/* Inactive States */}
      <a className="flex items-center px-margin py-4 text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined mr-4" data-icon="bolt">bolt</span>
                      Sprint
                  </a>
      <a className="flex items-center px-margin py-4 text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined mr-4" data-icon="military_tech">military_tech</span>
                      Ultra
                  </a>
      <a className="flex items-center px-margin py-4 text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined mr-4" data-icon="groups">groups</span>
                      Versus
                  </a>
      </nav>
      </aside>
      {/* PAUSE MENU OVERLAY (Level 2) */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* The Glass Panel spanning the central interaction area */}
      <div className="glass-overlay w-full max-w-sm rounded-lg p-8 flex flex-col items-center relative overflow-hidden">
      {/* Decorative scanline effect inside the glass */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
      {/* Header */}
      <div className="mb-10 text-center relative z-10">
      <h1 className="font-display text-display text-primary tracking-widest uppercase" style={{letterSpacing: "0.1em"}}>Paused</h1>
      <div className="w-12 h-1 bg-secondary mx-auto mt-2 rounded-full opacity-80"></div>
      {/* Small status indicators below header */}
      <div className="flex justify-center gap-6 mt-4 opacity-70">
      <div className="flex flex-col items-center">
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase">Score</span>
      <span className="font-mono-score text-mono-score text-primary">042,500</span>
      </div>
      <div className="w-px bg-outline-variant h-8"></div>
      <div className="flex flex-col items-center">
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase">Level</span>
      <span className="font-mono-score text-mono-score text-secondary">08</span>
      </div>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-4 relative z-10">
      {/* Primary Action: Resume */}
      <button className="w-full h-touch-target bg-secondary text-on-secondary font-headline-md text-headline-md rounded flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors btn-glow-primary active:scale-95 duration-150" type="button" data-action-id="play-arrow-resume-3" onClick={actions?.["play-arrow-resume-3"]}>
      <span className="material-symbols-outlined fill" data-icon="play_arrow">play_arrow</span>
                          Resume
                      </button>
      {/* Secondary Actions: Ghost Style */}
      <button className="w-full h-touch-target bg-transparent border border-outline-variant text-primary font-headline-md text-[20px] rounded flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-on-surface transition-colors active:scale-95 duration-150" type="button" data-action-id="replay-restart-game-4" onClick={actions?.["replay-restart-game-4"]}>
      <span className="material-symbols-outlined" data-icon="replay">replay</span>
                          Restart Game
                      </button>
      <button className="w-full h-touch-target bg-transparent border border-outline-variant text-primary font-headline-md text-[20px] rounded flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-on-surface transition-colors active:scale-95 duration-150" type="button" data-action-id="tune-settings-5" onClick={actions?.["tune-settings-5"]}>
      <span className="material-symbols-outlined" data-icon="tune">tune</span>
                          Settings
                      </button>
      {/* Destructive/Exit Action */}
      <button className="w-full h-touch-target bg-transparent border border-error/50 text-error font-headline-md text-[20px] rounded flex items-center justify-center gap-2 mt-4 hover:bg-error/10 transition-colors active:scale-95 duration-150" type="button" data-action-id="logout-quit-to-menu-6" onClick={actions?.["logout-quit-to-menu-6"]}>
      <span className="material-symbols-outlined" data-icon="logout">logout</span>
                          Quit to Menu
                      </button>
      </div>
      </div>
      </div>
    </>
  );
}
