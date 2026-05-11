// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Main Menu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type MainMenuActionId = "new-game-1" | "resume-2" | "options-3" | "help-4";

export interface MainMenuProps {
  actions?: Partial<Record<MainMenuActionId, () => void>>;
}

export function MainMenu({ actions }: MainMenuProps) {
  return (
    <>
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: "0.1"}}></div>
      {/* Main Container */}
      <main className="z-10 flex flex-col items-center w-full max-w-[board-width] px-margin relative">
      {/* High Score Badge */}
      <div className="absolute -top-32 w-full flex justify-center">
      <div className="bg-surface-container-low border border-outline-variant px-6 py-3 rounded-lg flex flex-col items-center shadow-[0_0_15px_rgba(74,225,118,0.1)] backdrop-blur-md">
      <span className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-1">High Score</span>
      <span className="font-mono-score text-mono-score text-secondary">999,999</span>
      </div>
      </div>
      {/* Logo */}
      <h1 className="font-display text-display text-primary mb-12 text-center tracking-tighter shadow-primary/20 drop-shadow-xl" style={{textShadow: "0 0 20px rgba(190,198,224,0.3)"}}>
                  TETRI-CORE
              </h1>
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-unit w-full">
      <button className="bg-primary text-on-primary h-touch-target rounded font-headline-md text-headline-md flex items-center justify-center relative overflow-hidden group hover:bg-primary-fixed transition-colors shadow-[0_0_20px_rgba(190,198,224,0.2)] hover:shadow-[0_0_30px_rgba(190,198,224,0.4)]" type="button" data-action-id="new-game-1" onClick={actions?.["new-game-1"]}>
      <span className="relative z-10">New Game</span>
      </button>
      <button className="bg-surface-container text-on-surface border border-outline-variant h-touch-target rounded font-headline-md text-headline-md flex items-center justify-center hover:bg-surface-variant transition-colors" type="button" data-action-id="resume-2" onClick={actions?.["resume-2"]}>
                      Resume
                  </button>
      <button className="bg-surface-container text-on-surface border border-outline-variant h-touch-target rounded font-headline-md text-headline-md flex items-center justify-center hover:bg-surface-variant transition-colors" type="button" data-action-id="options-3" onClick={actions?.["options-3"]}>
                      Options
                  </button>
      <button className="bg-surface-container text-on-surface border border-outline-variant h-touch-target rounded font-headline-md text-headline-md flex items-center justify-center hover:bg-surface-variant transition-colors" type="button" data-action-id="help-4" onClick={actions?.["help-4"]}>
                      Help
                  </button>
      </div>
      </main>
      {/* Version Number */}
      <div className="absolute bottom-margin text-center w-full z-10">
      <span className="font-mono-label text-mono-label text-on-surface-variant opacity-50">v1.0.4 - COMMAND CENTER</span>
      </div>
    </>
  );
}
