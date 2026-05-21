import type { TeamId, Phase } from '../types';
import { CHARACTER_BY_ID } from '../data/characters';

interface Props {
  teamId: TeamId;
  teamName: string;
  bans: (string | null)[];
  picks: (string | null)[];
  pendingId: string | null;
  pendingTeam: TeamId | null;
  phase: Phase;
}

type SlotMode = 'ban' | 'pick' | 'empty';

function PortraitCard({
  charId,
  isPending,
  teamId,
  mode,
}: {
  charId: string | null;
  isPending: boolean;
  teamId: TeamId;
  mode: SlotMode;
}) {
  const c = charId ? CHARACTER_BY_ID[charId] : null;
  const borderClass = teamId === 'A' ? 'card-a' : 'card-b';
  const isBan = mode === 'ban';

  return (
    <div
      className={`card-frame ${borderClass} h-full min-h-[520px] w-full ${isPending ? 'animate-pulse-glow' : ''}`}
    >
      {c ? (
        <>
          <img
            src={c.portraitPath}
            alt={c.name}
            className={`absolute inset-0 h-full w-full object-cover ${isBan && !isPending ? 'grayscale' : ''}`}
            style={{ objectPosition: c.portraitPosition ?? 'center top' }}
            draggable={false}
          />
          {isBan && !isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/30">
              <div className="rotate-[-12deg] border-2 border-red-400 px-3 py-1 font-display text-xl tracking-widest text-red-300">
                BANNED
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-2 py-1 text-center font-display text-sm uppercase tracking-widest">
            {c.name}
          </div>
          {isPending && (
            <div className="absolute left-1 top-1 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
              Pending
            </div>
          )}
        </>
      ) : (
        <div className="card-empty-bg flex h-full w-full items-center justify-center">
          <div className="font-display text-6xl text-white/30">?</div>
        </div>
      )}
    </div>
  );
}

export function TeamPanel({ teamId, bans, picks, pendingId, pendingTeam, phase }: Props) {
  const isMine = pendingTeam === teamId;
  const showBans = phase === 'ban';
  const showPicks = phase === 'pick' || phase === 'finished';

  const slots: { id: string | null; pending: boolean; mode: SlotMode }[] = [0, 1, 2].map((i) => {
    if (showBans) {
      const committed = bans[i];
      if (committed) return { id: committed, pending: false, mode: 'ban' };
      const nextEmpty = bans.findIndex((x) => x === null);
      if (isMine && pendingId && i === nextEmpty) {
        return { id: pendingId, pending: true, mode: 'ban' };
      }
      return { id: null, pending: false, mode: 'empty' };
    }
    if (showPicks) {
      const committed = picks[i];
      if (committed) return { id: committed, pending: false, mode: 'pick' };
      const nextEmpty = picks.findIndex((x) => x === null);
      if (isMine && pendingId && i === nextEmpty) {
        return { id: pendingId, pending: true, mode: 'pick' };
      }
      return { id: null, pending: false, mode: 'empty' };
    }
    return { id: null, pending: false, mode: 'empty' };
  });

  return (
    <div className="grid h-full grid-cols-3 gap-3">
      {slots.map((s, i) => (
        <PortraitCard
          key={i}
          charId={s.id}
          isPending={s.pending}
          teamId={teamId}
          mode={s.mode}
        />
      ))}
    </div>
  );
}
