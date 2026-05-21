import { useEffect, useState } from 'react';
import type { CoinSide, TeamId } from '../types';

interface Props {
  teamAName: string;
  teamBName: string;
  teamAChoice: CoinSide | null;
  teamBChoice: CoinSide | null;
  result: CoinSide | null;
  winner: TeamId | null;
  onTeamAPick: (side: CoinSide) => void;
  onToss: () => void;
  onStart: () => void;
  onTeamRename: (team: TeamId, name: string) => void;
}

export function CoinTossModal({
  teamAName,
  teamBName,
  teamAChoice,
  teamBChoice,
  result,
  winner,
  onTeamAPick,
  onToss,
  onStart,
  onTeamRename,
}: Props) {
  const [tossing, setTossing] = useState(false);

  useEffect(() => {
    if (result && tossing) {
      const t = setTimeout(() => setTossing(false), 1600);
      return () => clearTimeout(t);
    }
  }, [result, tossing]);

  const handleToss = () => {
    if (!teamAChoice || !teamBChoice || result) return;
    setTossing(true);
    onToss();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="card-frame card-a w-full max-w-2xl border-white/20 bg-arena-bg/90 p-8 text-center">
        <h2 className="font-display text-3xl tracking-widest text-amber-300">Coin Toss</h2>
        <p className="mt-2 text-sm text-slate-300">
          Team A chooses heads or tails. Team B is auto-assigned the other side. Winner picks first
          in both the ban and selection phases.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="block text-left text-xs uppercase tracking-widest text-team-a">
            Team A name
            <input
              className="mt-1 w-full rounded border border-team-a/40 bg-black/40 px-3 py-2 text-base text-white outline-none focus:border-team-a"
              value={teamAName}
              maxLength={28}
              onChange={(e) => onTeamRename('A', e.target.value || 'TEAM NAME A')}
            />
          </label>
          <label className="block text-left text-xs uppercase tracking-widest text-team-b">
            Team B name
            <input
              className="mt-1 w-full rounded border border-team-b/40 bg-black/40 px-3 py-2 text-base text-white outline-none focus:border-team-b"
              value={teamBName}
              maxLength={28}
              onChange={(e) => onTeamRename('B', e.target.value || 'TEAM NAME B')}
            />
          </label>
        </div>

        <div className="mt-8">
          {!teamAChoice && (
            <>
              <div className="mb-3 text-sm uppercase tracking-widest text-slate-300">
                <span className="text-team-a">{teamAName}</span> — choose a side
              </div>
              <div className="flex justify-center gap-4">
                <button className="btn btn-primary" onClick={() => onTeamAPick('heads')}>
                  Heads
                </button>
                <button className="btn btn-primary" onClick={() => onTeamAPick('tails')}>
                  Tails
                </button>
              </div>
            </>
          )}

          {teamAChoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded border border-team-a/40 bg-team-a/10 p-3">
                  <div className="text-xs uppercase tracking-widest text-team-a">{teamAName}</div>
                  <div className="mt-1 font-display text-2xl capitalize">{teamAChoice}</div>
                </div>
                <div className="rounded border border-team-b/40 bg-team-b/10 p-3">
                  <div className="text-xs uppercase tracking-widest text-team-b">{teamBName}</div>
                  <div className="mt-1 font-display text-2xl capitalize">{teamBChoice}</div>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-200 to-amber-600 font-display text-2xl text-black ${tossing ? 'animate-coin-spin' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {result ? result.toUpperCase() : '?'}
                </div>
              </div>

              {!result && (
                <button className="btn btn-primary" onClick={handleToss}>
                  Toss the Coin
                </button>
              )}

              {result && !tossing && (
                <div className="animate-fade-up space-y-4">
                  <div className="text-lg">
                    Result: <span className="font-display text-2xl text-amber-300">{result.toUpperCase()}</span>
                  </div>
                  <div className="text-xl">
                    Winner:{' '}
                    <span
                      className={`font-display text-2xl ${winner === 'A' ? 'text-team-a' : 'text-team-b'}`}
                    >
                      {winner === 'A' ? teamAName : teamBName}
                    </span>
                  </div>
                  <button className="btn btn-primary" onClick={onStart}>
                    Begin Banning Phase
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
