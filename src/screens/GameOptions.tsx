// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Game Options
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type GameOptionsActionId = "arrow-back-1" | "reset-defaults-2" | "back-to-game-3" | "slow-4" | "normal-5" | "fast-6" | "back-to-game-7" | "reset-defaults-8";

export interface GameOptionsProps {
  actions?: Partial<Record<GameOptionsActionId, () => void>>;
}

export function GameOptions({ actions }: GameOptionsProps) {
  return (
    <>
      {/* Background Decoration (The Void) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-fixed rounded-full mix-blend-screen filter blur-[128px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-container rounded-full mix-blend-screen filter blur-[128px]"></div>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.2)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>
      {/* Main Content Area (Suppressed TopNav/SideNav due to Settings contextual logic) */}
      <main className="flex-grow flex flex-col items-center justify-center p-margin relative z-10 w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-8 glass-panel p-4 rounded-lg">
      <div className="flex items-center gap-4">
      <button className="w-touch-target h-touch-target flex items-center justify-center rounded border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-on-surface" type="button" data-action-id="arrow-back-1" onClick={actions?.["arrow-back-1"]}>
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>arrow_back</span>
      </button>
      <div>
      <h1 className="font-display text-display text-primary tracking-tighter">SETTINGS</h1>
      <p className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest">SYSTEM CONFIGURATION V.1.0.4</p>
      </div>
      </div>
      <div className="hidden md:flex gap-4">
      <button className="px-6 h-touch-target rounded border border-outline-variant text-on-surface-variant font-mono-label text-mono-label uppercase hover:bg-surface-variant transition-colors" type="button" data-action-id="reset-defaults-2" onClick={actions?.["reset-defaults-2"]}>Reset Defaults</button>
      <button className="px-6 h-touch-target rounded bg-secondary/10 border border-secondary text-secondary font-mono-label text-mono-label uppercase hover:bg-secondary/20 transition-colors neon-glow" type="button" data-action-id="back-to-game-3" onClick={actions?.["back-to-game-3"]}>Back to Game</button>
      </div>
      </div>
      {/* Settings Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-gutter">
      {/* Audio Settings Card */}
      <div className="glass-panel p-6 rounded-lg flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
      <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>volume_up</span>
      <h2 className="font-headline-md text-headline-md text-primary">Audio</h2>
      </div>
      <div className="space-y-6">
      {/* SFX Toggle */}
      <div className="flex items-center justify-between">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Sound Effects</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">Feedback for interactions and line clears</span>
      </div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-surface border-4 appearance-none cursor-pointer z-10" id="sfx-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container border border-outline-variant cursor-pointer" htmlFor="sfx-toggle"></label>
      </div>
      </div>
      {/* Music Toggle */}
      <div className="flex items-center justify-between">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Background Music</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">In-game electronic soundtrack</span>
      </div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-surface border-4 appearance-none cursor-pointer z-10" id="music-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container border border-outline-variant cursor-pointer" htmlFor="music-toggle"></label>
      </div>
      </div>
      </div>
      </div>
      {/* Gameplay Settings Card */}
      <div className="glass-panel p-6 rounded-lg flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
      <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>tune</span>
      <h2 className="font-headline-md text-headline-md text-primary">Gameplay</h2>
      </div>
      <div className="space-y-8">
      {/* Starting Level Slider */}
      <div>
      <div className="flex justify-between items-end mb-4">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Starting Level</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">Initial drop speed multiplier</span>
      </div>
      <span className="font-mono-score text-mono-score text-secondary">LVL 5</span>
      </div>
      <input className="w-full" max="15" min="1" type="range" value="5" />
      <div className="flex justify-between mt-2 font-mono-label text-mono-label text-on-surface-variant opacity-60">
      <span>1</span>
      <span>15</span>
      </div>
      </div>
      {/* Control Sensitivity */}
      <div>
      <div className="flex justify-between items-end mb-4">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">DAS Delay</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">Delayed Auto Shift timing (ms)</span>
      </div>
      <span className="font-mono-score text-mono-score text-secondary">133</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
      <button className="h-touch-target rounded border border-outline-variant text-on-surface-variant font-mono-label text-mono-label uppercase hover:bg-surface-variant transition-colors" type="button" data-action-id="slow-4" onClick={actions?.["slow-4"]}>Slow</button>
      <button className="h-touch-target rounded bg-secondary-container/20 border border-secondary text-secondary font-mono-label text-mono-label uppercase neon-glow transition-colors" type="button" data-action-id="normal-5" onClick={actions?.["normal-5"]}>Normal</button>
      <button className="h-touch-target rounded border border-outline-variant text-on-surface-variant font-mono-label text-mono-label uppercase hover:bg-surface-variant transition-colors" type="button" data-action-id="fast-6" onClick={actions?.["fast-6"]}>Fast</button>
      </div>
      </div>
      </div>
      </div>
      {/* Video/Display Card */}
      <div className="glass-panel p-6 rounded-lg flex flex-col gap-6 md:col-span-2">
      <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
      <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>desktop_windows</span>
      <h2 className="font-headline-md text-headline-md text-primary">Display</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center justify-between">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Ghost Piece</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">Show landing preview</span>
      </div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-surface border-4 appearance-none cursor-pointer z-10" id="ghost-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container border border-outline-variant cursor-pointer" htmlFor="ghost-toggle"></label>
      </div>
      </div>
      <div className="flex items-center justify-between">
      <div>
      <span className="font-mono-label text-mono-label text-on-surface uppercase block mb-1">Scanline Filter</span>
      <span className="font-body-base text-body-base text-on-surface-variant text-sm">Retro CRT visual effect</span>
      </div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-surface border-4 appearance-none cursor-pointer z-10" id="scanline-toggle" name="toggle" type="checkbox" />
      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container border border-outline-variant cursor-pointer" htmlFor="scanline-toggle"></label>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Mobile Action Buttons */}
      <div className="w-full mt-8 flex flex-col gap-4 md:hidden">
      <button className="w-full h-touch-target rounded bg-secondary/10 border border-secondary text-secondary font-mono-label text-mono-label uppercase hover:bg-secondary/20 transition-colors neon-glow" type="button" data-action-id="back-to-game-7" onClick={actions?.["back-to-game-7"]}>Back to Game</button>
      <button className="w-full h-touch-target rounded border border-outline-variant text-on-surface-variant font-mono-label text-mono-label uppercase hover:bg-surface-variant transition-colors" type="button" data-action-id="reset-defaults-8" onClick={actions?.["reset-defaults-8"]}>Reset Defaults</button>
      </div>
      </main>
    </>
  );
}
