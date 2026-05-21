interface Props {
  teamAName: string;
  teamBName: string;
  onReset: () => void;
}

export function TournamentBeginsModal({ teamAName, teamBName, onReset }: Props) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="animate-fade-up card-frame card-a w-full max-w-xl border-amber-300/60 bg-arena-bg/95 p-10 text-center"
        style={{ boxShadow: '0 0 60px rgba(255, 200, 80, 0.45), inset 0 0 40px rgba(255, 200, 80, 0.15)' }}
      >
        <div className="font-display text-5xl tracking-[0.3em] text-amber-300 drop-shadow-[0_0_18px_rgba(255,200,80,0.7)]">
          TOURNAMENT
        </div>
        <div className="mt-1 font-display text-5xl tracking-[0.3em] text-amber-300 drop-shadow-[0_0_18px_rgba(255,200,80,0.7)]">
          BEGINS
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-base">
          <span className="font-display tracking-widest text-team-a">{teamAName}</span>
          <span className="text-slate-400">vs</span>
          <span className="font-display tracking-widest text-team-b">{teamBName}</span>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-slate-300">Good luck to both teams.</p>
        <button className="btn btn-primary mt-6" onClick={onReset}>
          New Draft
        </button>
      </div>
    </div>
  );
}
