import type { TeamId } from '../types';
import { CHARACTERS } from '../data/characters';

interface Props {
  bannedIds: Set<string>;
  pickedIds: Set<string>;
  pendingId: string | null;
  pendingTeam: TeamId | null;
  currentTurn: TeamId | null;
  interactive: boolean;
  onSelect: (id: string) => void;
}

export function CharacterGrid({
  bannedIds,
  pickedIds,
  pendingId,
  pendingTeam,
  currentTurn,
  interactive,
  onSelect,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-white/10 bg-black/30 p-2 shadow-inner">
      <div className="grid grid-cols-5 gap-1">
        {CHARACTERS.map((c) => {
          const isBanned = bannedIds.has(c.id);
          const isPicked = pickedIds.has(c.id);
          const isPending = pendingId === c.id;
          const isDisabled = !interactive || isBanned || isPicked;

          const selectedClass = isPending
            ? pendingTeam === 'A'
              ? 'is-selected-a'
              : 'is-selected-b'
            : '';

          return (
            <button
              key={c.id}
              disabled={isDisabled}
              onClick={() => onSelect(c.id)}
              className={`icon-tile ${isDisabled ? 'is-disabled' : ''} ${selectedClass}`}
              aria-label={c.name}
              title={c.name}
            >
              <img
                src={c.iconPath}
                alt={c.name}
                decoding="async"
                className="aspect-square w-full select-none object-cover"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-1 py-0.5 text-center text-[9px] font-bold uppercase tracking-wider">
                {c.name}
              </div>
              {(isBanned || isPicked) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 px-0.5">
                  <span className="font-display text-[9px] font-bold uppercase leading-none tracking-normal text-red-300">
                    {isBanned ? 'Banned' : 'Picked'}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {currentTurn && interactive && !pendingId && (
        <div className="mt-3 text-center text-xs uppercase tracking-widest text-slate-300">
          Awaiting{' '}
          <span className={currentTurn === 'A' ? 'text-team-a' : 'text-team-b'}>
            Team {currentTurn}
          </span>{' '}
          selection
        </div>
      )}
    </div>
  );
}
