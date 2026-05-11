// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Over
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type GameOverActionId = "play-arrow-play-again-1" | "menu-main-menu-2";

export interface GameOverProps {
  actions?: Partial<Record<GameOverActionId, () => void>>;
}

export function GameOver({ actions }: GameOverProps) {
  return (
    <>
      {/* Suppressed TopAppBar and SideNavBar as this is a linear/transactional "Success/Confirmation" (Game Over) screen */}
      {/* Main Content Canvas - Game Over Screen */}
      <main className="flex-grow flex items-center justify-center p-margin relative overflow-hidden bg-grid-pattern">
      {/* Background decorative elements to simulate the void/game board behind the modal */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
      {/* Simulated stacked blocks */}
      <div className="w-board-width h-[640px] border border-outline-variant relative">
      {/* Ghost piece */}
      <div className="absolute bottom-[160px] left-[96px] w-[96px] h-[64px] border border-dashed border-secondary/50 bg-secondary/10"></div>
      {/* Dead blocks */}
      <div className="absolute bottom-0 left-0 w-full h-[160px] bg-surface-container border-t border-outline-variant grid grid-cols-10 grid-rows-5 opacity-50">
      <div className="border-[0.5px] border-outline-variant/30 bg-primary/20 col-start-1 row-start-5"></div>
      <div className="border-[0.5px] border-outline-variant/30 bg-tertiary/20 col-start-2 row-start-5"></div>
      <div className="border-[0.5px] border-outline-variant/30 bg-secondary/20 col-start-5 row-start-4"></div>
      </div>
      </div>
      </div>
      {/* Glass Overlay Modal (Level 2) */}
      <div className="relative z-10 w-full max-w-md glass-panel bg-surface/40 border border-outline-variant rounded p-margin flex flex-col items-center text-center shadow-2xl">
      {/* Game Over Headline */}
      <h1 className="font-display text-display text-error glow-error mb-2 tracking-tighter uppercase">
                      Game Over
                  </h1>
      {/* High Score Badge (Dynamic) */}
      <div className="bg-secondary-container/20 border border-secondary text-secondary font-mono-label text-mono-label px-3 py-1 rounded-full mb-8 flex items-center gap-2 animate-pulse">
      <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                      NEW HIGH SCORE!
                  </div>
      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 gap-unit w-full mb-8">
      {/* Final Score (Large Card) */}
      <div className="col-span-2 bg-surface-container border border-outline-variant rounded p-gutter flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-2">Final Score</span>
      <span className="font-mono-score text-display text-primary">142,850</span>
      </div>
      {/* Level Reached */}
      <div className="bg-surface-container border border-outline-variant rounded p-gutter flex flex-col items-center justify-center hover:bg-surface-container-high transition-colors cursor-default">
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">Level</span>
      <span className="font-mono-score text-headline-lg text-on-surface">12</span>
      </div>
      {/* Lines Cleared */}
      <div className="bg-surface-container border border-outline-variant rounded p-gutter flex flex-col items-center justify-center hover:bg-surface-container-high transition-colors cursor-default">
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">Lines</span>
      <span className="font-mono-score text-headline-lg text-on-surface">104</span>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col w-full gap-gutter mt-4">
      <button className="h-touch-target w-full bg-secondary text-on-secondary font-headline-md text-body-base font-bold rounded glow-secondary hover:bg-secondary-fixed transition-all flex items-center justify-center gap-2" type="button" data-action-id="play-arrow-play-again-1" onClick={actions?.["play-arrow-play-again-1"]}>
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                          Play Again
                      </button>
      <button className="h-touch-target w-full bg-transparent border border-outline text-on-surface font-headline-md text-body-base rounded hover:bg-surface-container-high hover:text-primary transition-all flex items-center justify-center gap-2" type="button" data-action-id="menu-main-menu-2" onClick={actions?.["menu-main-menu-2"]}>
      <span className="material-symbols-outlined">menu</span>
                          Main Menu
                      </button>
      </div>
      </div>
      </main>
    </>
  );
}
