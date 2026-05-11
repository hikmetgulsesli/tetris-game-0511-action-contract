// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Next Piece Preview
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

export type NextPiecePreviewActionId = never;

export interface NextPiecePreviewProps {
  actions?: Partial<Record<NextPiecePreviewActionId, () => void>>;
}

export function NextPiecePreview(_props: NextPiecePreviewProps) {
  return (
    <>
      <div className="bg-surface border border-outline-variant rounded-lg p-gutter shadow-[0_0_15px_rgba(74,225,118,0.1)] w-[160px] flex flex-col gap-unit">
      <h2 className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-widest mb-unit">Next</h2>
      <div className="flex flex-col gap-gutter items-center">
      {/* Tetromino 1 (T-Piece) */}
      <div className="grid grid-cols-3 grid-rows-2 gap-[1px] bg-outline-variant p-[1px] w-fit">
      <div className="w-[20px] h-[20px] bg-transparent"></div>
      <div className="w-[20px] h-[20px] bg-secondary shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"></div>
      <div className="w-[20px] h-[20px] bg-transparent"></div>
      <div className="w-[20px] h-[20px] bg-secondary shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"></div>
      <div className="w-[20px] h-[20px] bg-secondary shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"></div>
      <div className="w-[20px] h-[20px] bg-secondary shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"></div>
      </div>
      {/* Tetromino 2 (L-Piece) */}
      <div className="grid grid-cols-3 grid-rows-2 gap-[1px] bg-outline-variant p-[1px] w-fit opacity-70">
      <div className="w-[16px] h-[16px] bg-transparent"></div>
      <div className="w-[16px] h-[16px] bg-transparent"></div>
      <div className="w-[16px] h-[16px] bg-tertiary"></div>
      <div className="w-[16px] h-[16px] bg-tertiary"></div>
      <div className="w-[16px] h-[16px] bg-tertiary"></div>
      <div className="w-[16px] h-[16px] bg-tertiary"></div>
      </div>
      {/* Tetromino 3 (Square-Piece) */}
      <div className="grid grid-cols-2 grid-rows-2 gap-[1px] bg-outline-variant p-[1px] w-fit opacity-40">
      <div className="w-[12px] h-[12px] bg-primary"></div>
      <div className="w-[12px] h-[12px] bg-primary"></div>
      <div className="w-[12px] h-[12px] bg-primary"></div>
      <div className="w-[12px] h-[12px] bg-primary"></div>
      </div>
      </div>
      </div>
    </>
  );
}
