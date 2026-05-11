// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Board
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type GameBoardActionId = "pause-1" | "settings-2" | "settings-system-3" | "controls-4" | "keyboard-arrow-up-5" | "keyboard-arrow-left-6" | "keyboard-arrow-down-7" | "keyboard-arrow-right-8" | "rotate-left-9" | "rotate-right-10";

export interface GameBoardProps {
  actions?: Partial<Record<GameBoardActionId, () => void>>;
}

export function GameBoard({ actions }: GameBoardProps) {
  return (
    <>
      {/* TopAppBar (Mobile Only - Web reflows to SideNav or hides if immersive) */}
      <header className="md:hidden bg-background/80 backdrop-blur-xl docked full-width top-0 z-50 border-b border-outline-variant flat no shadows flex justify-between items-center px-margin h-touch-target w-full">
      <div className="font-display text-headline-lg font-extrabold tracking-tighter text-secondary">
                  TETRI-CORE
              </div>
      <div className="flex gap-4">
      <button className="text-primary hover:text-secondary transition-colors duration-200" type="button" data-action-id="pause-1" onClick={actions?.["pause-1"]}>
      <span className="material-symbols-outlined">pause</span>
      </button>
      <button className="text-primary hover:text-secondary transition-colors duration-200" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <span className="material-symbols-outlined">settings</span>
      </button>
      </div>
      </header>
      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex bg-surface-container-low/90 backdrop-blur-lg border-r border-outline-variant flat no shadows docked left-0 h-full w-board-width fixed left-0 top-0 h-full flex flex-col pt-20 z-40">
      <div className="px-margin mb-12">
      <h1 className="font-display text-headline-md text-primary">COMMAND</h1>
      <p className="font-mono-label text-mono-label uppercase tracking-widest text-on-surface-variant opacity-60 mt-2">V.1.0.4</p>
      </div>
      <ul className="flex-1 space-y-2 px-4">
      <li>
      <a className="flex items-center gap-4 px-4 py-3 rounded-DEFAULT bg-secondary-container text-on-secondary-container font-bold border-l-4 border-secondary hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined">timer</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Marathon</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-4 px-4 py-3 rounded-DEFAULT text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all border-l-4 border-transparent" href="#">
      <span className="material-symbols-outlined">bolt</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Sprint</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-4 px-4 py-3 rounded-DEFAULT text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all border-l-4 border-transparent" href="#">
      <span className="material-symbols-outlined">military_tech</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Ultra</span>
      </a>
      </li>
      <li>
      <a className="flex items-center gap-4 px-4 py-3 rounded-DEFAULT text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all border-l-4 border-transparent" href="#">
      <span className="material-symbols-outlined">groups</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Versus</span>
      </a>
      </li>
      </ul>
      <div className="p-margin border-t border-outline-variant">
      <button className="w-full flex items-center justify-center gap-2 text-primary hover:text-secondary transition-colors duration-200 py-2" type="button" data-action-id="settings-system-3" onClick={actions?.["settings-system-3"]}>
      <span className="material-symbols-outlined">settings</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">System</span>
      </button>
      </div>
      </nav>
      {/* Main Gameplay Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative md:pl-[320px] p-4 min-h-[calc(100vh-44px)] md:min-h-screen pt-[60px] md:pt-4">
      {/* Game Container */}
      <div className="flex flex-col md:flex-row gap-gutter items-center md:items-start w-full max-w-[800px] justify-center">
      {/* Left HUD: Stats */}
      <div className="flex md:flex-col gap-4 w-full md:w-[160px] order-2 md:order-1 justify-between md:justify-start">
      {/* Score Card */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-4 flex-1 md:flex-none">
      <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">SCORE</div>
      <div className="font-mono-score text-mono-score text-primary text-right">042,850</div>
      </div>
      {/* Level Card */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-4 flex-1 md:flex-none">
      <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">LEVEL</div>
      <div className="font-mono-score text-mono-score text-primary text-right">08</div>
      {/* Progress Bar */}
      <div className="h-1 bg-surface-container-highest rounded-full mt-3 overflow-hidden">
      <div className="h-full bg-secondary w-3/4 rounded-full" style={{boxShadow: "0 0 8px #4ae176"}}></div>
      </div>
      </div>
      {/* Lines Card */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-4 flex-1 md:flex-none hidden md:block">
      <div className="font-mono-label text-mono-label text-on-surface-variant mb-2">LINES</div>
      <div className="font-mono-score text-mono-score text-primary text-right">074</div>
      </div>
      </div>
      {/* Center: Game Board */}
      <div className="order-1 md:order-2">
      <div className="bg-surface border border-outline-variant p-2 rounded-DEFAULT shadow-[0_0_30px_rgba(15,23,42,0.8)]">
      <div className="w-[280px] h-[560px] md:w-board-width md:h-[640px] tetris-grid">
      {/* Simulated 10x20 Grid */}
      {/* Rows 1-15: Empty */}
      {/* Row 16 */}
      <div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div>
      {/* ... skipping empty rows for brevity, focusing on active play area ... */}
      {/* Row 17 (Ghost Piece T) */}
      <div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell ghost-block-t"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell"></div>
      {/* Row 18 */}
      <div className="tetris-cell block-l"></div><div className="tetris-cell"></div><div className="tetris-cell"></div><div className="tetris-cell ghost-block-t"></div><div className="tetris-cell ghost-block-t"></div><div className="tetris-cell ghost-block-t"></div><div className="tetris-cell"></div><div className="tetris-cell block-o"></div><div className="tetris-cell block-o"></div><div className="tetris-cell block-i"></div>
      {/* Row 19 */}
      <div className="tetris-cell block-l"></div><div className="tetris-cell block-l"></div><div className="tetris-cell block-l"></div><div className="tetris-cell block-s"></div><div className="tetris-cell block-s"></div><div className="tetris-cell block-z"></div><div className="tetris-cell block-z"></div><div className="tetris-cell block-o"></div><div className="tetris-cell block-o"></div><div className="tetris-cell block-i"></div>
      {/* Row 20 */}
      <div className="tetris-cell block-j"></div><div className="tetris-cell block-j"></div><div className="tetris-cell block-j"></div><div className="tetris-cell block-s"></div><div className="tetris-cell block-s"></div><div className="tetris-cell block-z"></div><div className="tetris-cell block-z"></div><div className="tetris-cell block-j"></div><div className="tetris-cell block-j"></div><div className="tetris-cell block-i"></div>
      </div>
      </div>
      </div>
      {/* Right HUD: Next & Hold */}
      <div className="flex md:flex-col gap-4 w-full md:w-[160px] order-3 md:order-3 justify-between md:justify-start">
      {/* Next Piece */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-4 flex-1 md:flex-none">
      <div className="font-mono-label text-mono-label text-on-surface-variant mb-4 text-center">NEXT</div>
      <div className="h-20 flex items-center justify-center">
      <div className="grid grid-cols-4 gap-[1px]">
      {/* I Piece preview */}
      <div className="w-4 h-4"></div><div className="w-4 h-4 block-i"></div><div className="w-4 h-4 block-i"></div><div className="w-4 h-4 block-i"></div><div className="w-4 h-4 block-i"></div>
      </div>
      </div>
      </div>
      {/* Hold Piece */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-4 flex-1 md:flex-none opacity-80">
      <div className="font-mono-label text-mono-label text-on-surface-variant mb-4 text-center">HOLD</div>
      <div className="h-20 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-[1px]">
      {/* O Piece preview */}
      <div className="w-4 h-4 block-o"></div><div className="w-4 h-4 block-o"></div>
      <div className="w-4 h-4 block-o"></div><div className="w-4 h-4 block-o"></div>
      </div>
      </div>
      </div>
      {/* Mobile Controls Toggle (Visual only for layout context) */}
      <div className="md:hidden mt-auto flex justify-center w-full pt-4">
      <button className="bg-surface border border-outline-variant rounded-DEFAULT px-4 py-2 font-mono-label text-mono-label text-primary" type="button" data-action-id="controls-4" onClick={actions?.["controls-4"]}>
                               CONTROLS
                           </button>
      </div>
      </div>
      </div>
      {/* Touch Controls (Mobile / Responsive Bottom) */}
      <div className="w-full max-w-[600px] mt-8 flex justify-between items-center px-4 md:hidden">
      {/* D-Pad Left */}
      <div className="grid grid-cols-3 gap-2">
      <div></div>
      <button className="w-12 h-12 bg-surface border border-outline-variant rounded-DEFAULT flex items-center justify-center active:bg-surface-variant" type="button" data-action-id="keyboard-arrow-up-5" onClick={actions?.["keyboard-arrow-up-5"]}>
      <span className="material-symbols-outlined text-primary">keyboard_arrow_up</span>
      </button>
      <div></div>
      <button className="w-12 h-12 bg-surface border border-outline-variant rounded-DEFAULT flex items-center justify-center active:bg-surface-variant" type="button" data-action-id="keyboard-arrow-left-6" onClick={actions?.["keyboard-arrow-left-6"]}>
      <span className="material-symbols-outlined text-primary">keyboard_arrow_left</span>
      </button>
      <button className="w-12 h-12 bg-surface border border-outline-variant rounded-DEFAULT flex items-center justify-center active:bg-surface-variant" type="button" data-action-id="keyboard-arrow-down-7" onClick={actions?.["keyboard-arrow-down-7"]}>
      <span className="material-symbols-outlined text-primary">keyboard_arrow_down</span>
      </button>
      <button className="w-12 h-12 bg-surface border border-outline-variant rounded-DEFAULT flex items-center justify-center active:bg-surface-variant" type="button" data-action-id="keyboard-arrow-right-8" onClick={actions?.["keyboard-arrow-right-8"]}>
      <span className="material-symbols-outlined text-primary">keyboard_arrow_right</span>
      </button>
      </div>
      {/* Actions Right */}
      <div className="flex gap-4">
      <button className="w-16 h-16 bg-surface border border-outline-variant rounded-full flex items-center justify-center active:bg-surface-variant" type="button" data-action-id="rotate-left-9" onClick={actions?.["rotate-left-9"]}>
      <span className="material-symbols-outlined text-primary">rotate_left</span>
      </button>
      <button className="w-16 h-16 bg-surface border border-outline-variant rounded-full flex items-center justify-center active:bg-surface-variant mb-8" type="button" data-action-id="rotate-right-10" onClick={actions?.["rotate-right-10"]}>
      <span className="material-symbols-outlined text-primary">rotate_right</span>
      </button>
      </div>
      </div>
      </main>
    </>
  );
}
