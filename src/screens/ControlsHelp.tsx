// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Controls Help
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type ControlsHelpActionId = "menu-1" | "pause-2" | "settings-3";

export interface ControlsHelpProps {
  actions?: Partial<Record<ControlsHelpActionId, () => void>>;
}

export function ControlsHelp({ actions }: ControlsHelpProps) {
  return (
    <>
      {/* TopAppBar (Mobile & Web Contextual) */}
      <header className="bg-background/80 backdrop-blur-xl docked full-width top-0 z-50 flex justify-between items-center px-margin h-touch-target w-full border-b border-outline-variant fixed">
      <div className="flex items-center gap-gutter">
      <button className="md:hidden text-primary hover:text-secondary transition-colors duration-200" type="button" data-action-id="menu-1" onClick={actions?.["menu-1"]}>
      <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="font-display text-headline-lg font-extrabold tracking-tighter text-secondary">TETRI-CORE</div>
      </div>
      <div className="hidden md:flex items-center gap-margin">
      {/* Simulated Nav for Desktop - Since it's a reference page, no specific tab active */}
      <nav className="flex gap-gutter">
      <a className="font-headline-md text-headline-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Marathon</a>
      <a className="font-headline-md text-headline-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Sprint</a>
      <a className="font-headline-md text-headline-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Ultra</a>
      <a className="font-headline-md text-headline-md text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Versus</a>
      </nav>
      </div>
      <div className="flex items-center gap-gutter text-primary">
      <button className="hover:text-secondary transition-colors duration-200 Active: opacity-70 transition-opacity" type="button" data-action-id="pause-2" onClick={actions?.["pause-2"]}>
      <span className="material-symbols-outlined">pause</span>
      </button>
      <button className="hover:text-secondary transition-colors duration-200 Active: opacity-70 transition-opacity" type="button" data-action-id="settings-3" onClick={actions?.["settings-3"]}>
      <span className="material-symbols-outlined">settings</span>
      </button>
      </div>
      </header>
      {/* SideNavBar (Desktop Contextual) */}
      <aside className="hidden md:flex bg-surface-container-low/90 backdrop-blur-lg docked left-0 h-full w-board-width border-r border-outline-variant fixed left-0 top-0 flex-col pt-20 z-40">
      <div className="px-margin mb-margin">
      <div className="font-mono-label text-mono-label uppercase tracking-widest text-on-surface-variant mb-unit">COMMAND</div>
      <div className="font-display text-headline-md text-primary">V.1.0.4</div>
      </div>
      <nav className="flex-1 px-unit space-y-unit">
      <a className="flex items-center gap-gutter p-gutter rounded text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined">timer</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Marathon</span>
      </a>
      <a className="flex items-center gap-gutter p-gutter rounded text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined">bolt</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Sprint</span>
      </a>
      <a className="flex items-center gap-gutter p-gutter rounded text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined">military_tech</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Ultra</span>
      </a>
      <a className="flex items-center gap-gutter p-gutter rounded text-on-surface-variant opacity-60 hover:bg-surface-variant hover:opacity-100 transition-all" href="#">
      <span className="material-symbols-outlined">groups</span>
      <span className="font-mono-label text-mono-label uppercase tracking-widest">Versus</span>
      </a>
      </nav>
      </aside>
      {/* Main Content Canvas */}
      <main className="pt-24 px-margin md:ml-board-width max-w-5xl mx-auto space-y-margin">
      <header className="mb-margin">
      <h1 className="font-display text-display text-primary mb-unit">OPERATIONAL MANUAL</h1>
      <p className="text-on-surface-variant font-mono-label text-mono-label">REFERENCE GUIDE VER 2.1.0 // SYSTEM CONTROLS &amp; LOGIC</p>
      </header>
      {/* Bento Grid for Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      {/* Keyboard Inputs Card */}
      <section className="bg-surface border border-outline-variant rounded-lg p-margin relative overflow-hidden group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <h2 className="font-headline-md text-headline-md text-primary mb-margin flex items-center gap-unit">
      <span className="material-symbols-outlined text-secondary">keyboard</span>
                          TERMINAL INPUTS
                      </h2>
      <div className="space-y-gutter">
      {/* Key Mapping Row */}
      <div className="flex items-center justify-between border-b border-surface-variant pb-unit">
      <div className="flex gap-unit">
      <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="material-symbols-outlined text-primary">arrow_upward</span>
      </div>
      </div>
      <span className="font-mono-label text-mono-label text-on-surface-variant">ROTATE PIECE</span>
      </div>
      <div className="flex items-center justify-between border-b border-surface-variant pb-unit">
      <div className="flex gap-unit">
      <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="material-symbols-outlined text-primary">arrow_back</span>
      </div>
      <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="material-symbols-outlined text-primary">arrow_forward</span>
      </div>
      </div>
      <span className="font-mono-label text-mono-label text-on-surface-variant">MOVE X-AXIS</span>
      </div>
      <div className="flex items-center justify-between border-b border-surface-variant pb-unit">
      <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="material-symbols-outlined text-primary">arrow_downward</span>
      </div>
      <span className="font-mono-label text-mono-label text-on-surface-variant">SOFT DROP</span>
      </div>
      <div className="flex items-center justify-between border-b border-surface-variant pb-unit">
      <div className="w-24 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="font-mono-label text-mono-label text-primary">SPACE</span>
      </div>
      <span className="font-mono-label text-mono-label text-on-surface-variant">HARD DROP</span>
      </div>
      <div className="flex items-center justify-between">
      <div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant rounded shadow-[0_2px_0_0_#334155]">
      <span className="font-mono-label text-mono-label text-primary">P</span>
      </div>
      <span className="font-mono-label text-mono-label text-on-surface-variant">SYSTEM PAUSE</span>
      </div>
      </div>
      </section>
      {/* Touch Gestures Card */}
      <section className="bg-surface border border-outline-variant rounded-lg p-margin relative overflow-hidden group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <h2 className="font-headline-md text-headline-md text-primary mb-margin flex items-center gap-unit">
      <span className="material-symbols-outlined text-secondary">touch_app</span>
                          HAPTIC GESTURES
                      </h2>
      <div className="grid grid-cols-2 gap-gutter">
      {/* Gesture Item */}
      <div className="bg-surface-container p-gutter rounded border border-surface-variant flex flex-col items-center text-center gap-unit">
      <span className="material-symbols-outlined text-display text-primary/70">tap_and_play</span>
      <span className="font-mono-score text-mono-score text-primary">TAP</span>
      <span className="font-mono-label text-mono-label text-on-surface-variant">ROTATE</span>
      </div>
      <div className="bg-surface-container p-gutter rounded border border-surface-variant flex flex-col items-center text-center gap-unit">
      <span className="material-symbols-outlined text-display text-primary/70">swipe_down</span>
      <span className="font-mono-score text-mono-score text-primary">SWIPE DOWN</span>
      <span className="font-mono-label text-mono-label text-on-surface-variant">SOFT DROP</span>
      </div>
      <div className="bg-surface-container p-gutter rounded border border-surface-variant flex flex-col items-center text-center gap-unit col-span-2">
      <span className="material-symbols-outlined text-display text-secondary/70">keyboard_double_arrow_down</span>
      <span className="font-mono-score text-mono-score text-secondary">FAST FLICK DOWN</span>
      <span className="font-mono-label text-mono-label text-on-surface-variant">HARD DROP INSTANT</span>
      </div>
      </div>
      </section>
      {/* Rules & Scoring Card (Full Width) */}
      <section className="bg-surface border border-outline-variant rounded-lg p-margin relative overflow-hidden group md:col-span-2">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary-container/20 to-transparent pointer-events-none"></div>
      <h2 className="font-headline-md text-headline-md text-primary mb-margin flex items-center gap-unit">
      <span className="material-symbols-outlined text-secondary">rule</span>
                          COMBAT LOGIC &amp; SCORING
                      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-margin">
      <div>
      <h3 className="font-mono-score text-mono-score text-primary mb-unit">LINE CLEARS</h3>
      <p className="text-on-surface-variant mb-gutter">Complete horizontal rows across the matrix to eliminate them. Simultaneous clears yield exponentially higher energy outputs.</p>
      <ul className="space-y-unit font-mono-label text-mono-label text-on-surface">
      <li className="flex justify-between border-b border-surface-variant pb-unit"><span className="text-on-surface-variant">SINGLE:</span> <span className="text-primary">100 PTS</span></li>
      <li className="flex justify-between border-b border-surface-variant pb-unit"><span className="text-on-surface-variant">DOUBLE:</span> <span className="text-primary">300 PTS</span></li>
      <li className="flex justify-between border-b border-surface-variant pb-unit"><span className="text-on-surface-variant">TRIPLE:</span> <span className="text-primary">500 PTS</span></li>
      <li className="flex justify-between border-b border-surface-variant pb-unit"><span className="text-secondary font-bold">TETRI-CORE (QUAD):</span> <span className="text-secondary font-bold">800 PTS</span></li>
      </ul>
      </div>
      <div className="space-y-gutter">
      <div className="bg-surface-container border border-outline-variant p-gutter rounded">
      <h3 className="font-mono-score text-mono-score text-primary mb-unit">BACK-TO-BACK</h3>
      <p className="text-on-surface-variant text-sm">Executing difficult clears (TETRI-CORE or T-Spins) consecutively without a basic clear in between grants a 1.5x score multiplier.</p>
      </div>
      <div className="bg-surface-container border border-outline-variant p-gutter rounded relative overflow-hidden">
      {/* T-Spin visualization abstract */}
      <div className="absolute right-gutter top-gutter w-cell-size h-cell-size border border-secondary border-dashed opacity-30"></div>
      <h3 className="font-mono-score text-mono-score text-primary mb-unit">T-SPIN LOGIC</h3>
      <p className="text-on-surface-variant text-sm">Rotating a T-Tetromino into a tight space right before it locks triggers advanced scoring protocols.</p>
      </div>
      </div>
      </div>
      </section>
      </div>
      </main>
    </>
  );
}
