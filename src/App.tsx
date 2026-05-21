import { useMemo, useState } from 'react';
import { useDraft } from './useDraft';
import { CoinTossModal } from './components/CoinTossModal';
import { CharacterGrid } from './components/CharacterGrid';
import { TeamPanel } from './components/TeamPanel';
import { ResetConfirm } from './components/ResetConfirm';
import { TournamentBeginsModal } from './components/TournamentBeginsModal';

export default function App() {
  const draft = useDraft();
  const s = draft.state;
  const [resetOpen, setResetOpen] = useState(false);

  const bannedIds = useMemo(
    () => new Set([...s.teamA.bans, ...s.teamB.bans].filter(Boolean) as string[]),
    [s.teamA.bans, s.teamB.bans],
  );
  const pickedIds = useMemo(
    () => new Set([...s.teamA.picks, ...s.teamB.picks].filter(Boolean) as string[]),
    [s.teamA.picks, s.teamB.picks],
  );

  const interactive = s.phase === 'ban' || s.phase === 'pick';

  const phaseLabel =
    s.phase === 'coin-toss'
      ? 'Coin Toss'
      : s.phase === 'ban'
        ? `Ban Phase — Step ${s.stepIndex + 1} / 6`
        : s.phase === 'pick'
          ? `Selection Phase — Step ${s.stepIndex + 1} / 6`
          : 'Tournament Begins';

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <header className="relative flex items-center justify-between px-4 pt-4">
        <div className="flex-1">
          {s.cointossWinner && (
            <div className={`team-banner team-banner-a inline-block`}>{s.teamA.name}</div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Digmaan 2026"
            className="h-32 w-auto drop-shadow-[0_6px_18px_rgba(255,200,80,0.55)]"
          />
        </div>
        <div className="flex-1 text-right">
          {s.cointossWinner && (
            <div className={`team-banner team-banner-b inline-block`}>{s.teamB.name}</div>
          )}
        </div>
      </header>

      {/* Phase / status bar */}
      <div className="mx-auto mt-2 px-4 text-center">
        <div className="font-display text-xl tracking-widest text-amber-300">{phaseLabel}</div>
        {interactive && s.currentTurn && (
          <div className="mt-1 text-sm text-slate-300">
            Current turn:{' '}
            <span className={s.currentTurn === 'A' ? 'text-team-a' : 'text-team-b'}>
              {s.currentTurn === 'A' ? s.teamA.name : s.teamB.name}
            </span>
          </div>
        )}
      </div>

      {/* Main arena */}
      <main className="mx-auto mt-4 w-full max-w-[1600px] px-4 pb-8">
        <div className="grid grid-cols-[1.7fr_minmax(220px,0.7fr)_1.7fr] items-stretch gap-6">
          <TeamPanel
            teamId="A"
            teamName={s.teamA.name}
            bans={s.teamA.bans}
            picks={s.teamA.picks}
            pendingId={s.pendingSelection}
            pendingTeam={s.selectionByTeam}
            phase={s.phase}
          />

          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="font-display text-sm uppercase tracking-[0.3em] text-amber-300">
              Character Pool
            </div>
            <CharacterGrid
              bannedIds={bannedIds}
              pickedIds={pickedIds}
              pendingId={s.pendingSelection}
              pendingTeam={s.selectionByTeam}
              currentTurn={s.currentTurn}
              interactive={interactive}
              onSelect={draft.selectCharacter}
            />
          </div>

          <TeamPanel
            teamId="B"
            teamName={s.teamB.name}
            bans={s.teamB.bans}
            picks={s.teamB.picks}
            pendingId={s.pendingSelection}
            pendingTeam={s.selectionByTeam}
            phase={s.phase}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            className="btn btn-primary"
            disabled={!s.pendingSelection || !interactive}
            onClick={draft.lockPick}
          >
            Lock Pick
          </button>
          <button className="btn btn-ghost" onClick={() => setResetOpen(true)}>
            Reset
          </button>
        </div>
      </main>

      {s.phase === 'coin-toss' && (
        <CoinTossModal
          teamAName={s.teamA.name}
          teamBName={s.teamB.name}
          teamAChoice={s.teamA.coinChoice}
          teamBChoice={s.teamB.coinChoice}
          result={s.coinResult}
          winner={s.cointossWinner}
          onTeamAPick={draft.setTeamACoinChoice}
          onToss={draft.tossCoin}
          onStart={draft.startBanPhase}
          onTeamRename={draft.setTeamName}
        />
      )}

      {s.phase === 'finished' && (
        <TournamentBeginsModal
          teamAName={s.teamA.name}
          teamBName={s.teamB.name}
          onReset={draft.reset}
        />
      )}

      {resetOpen && (
        <ResetConfirm
          onCancel={() => setResetOpen(false)}
          onConfirm={() => {
            draft.reset();
            setResetOpen(false);
          }}
        />
      )}
    </div>
  );
}
