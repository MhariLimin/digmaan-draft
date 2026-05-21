interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetConfirm({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="card-frame card-b w-full max-w-md border-red-400/50 bg-arena-bg/95 p-6 text-center">
        <h3 className="font-display text-2xl tracking-widest text-red-300">Reset Tournament?</h3>
        <p className="mt-2 text-sm text-slate-300">
          This wipes all bans, picks, and team names — back to the coin toss.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
}
