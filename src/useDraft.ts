import { useCallback, useMemo, useState } from 'react';
import type { CoinSide, DraftState, Phase, TeamId } from './types';

const EMPTY_TEAM = (name: string) => ({
  name,
  bans: [null, null, null],
  picks: [null, null, null],
  coinChoice: null,
});

const INITIAL: DraftState = {
  phase: 'coin-toss',
  teamA: EMPTY_TEAM('TEAM NAME A'),
  teamB: EMPTY_TEAM('TEAM NAME B'),
  coinResult: null,
  cointossWinner: null,
  currentTurn: null,
  stepIndex: 0,
  pendingSelection: null,
  selectionByTeam: null,
};

const BAN_ORDER = (winner: TeamId): TeamId[] => {
  const loser: TeamId = winner === 'A' ? 'B' : 'A';
  return [winner, loser, winner, loser, winner, loser];
};

const PICK_ORDER = (winner: TeamId): TeamId[] => {
  const loser: TeamId = winner === 'A' ? 'B' : 'A';
  return [winner, loser, loser, winner, winner, loser];
};

export function useDraft() {
  const [state, setState] = useState<DraftState>(INITIAL);

  const banOrder = useMemo(
    () => (state.cointossWinner ? BAN_ORDER(state.cointossWinner) : null),
    [state.cointossWinner],
  );
  const pickOrder = useMemo(
    () => (state.cointossWinner ? PICK_ORDER(state.cointossWinner) : null),
    [state.cointossWinner],
  );

  const reset = useCallback(() => setState(INITIAL), []);

  const setTeamName = useCallback((team: TeamId, name: string) => {
    setState((s) => ({
      ...s,
      [team === 'A' ? 'teamA' : 'teamB']: {
        ...(team === 'A' ? s.teamA : s.teamB),
        name,
      },
    }));
  }, []);

  const setTeamACoinChoice = useCallback((side: CoinSide) => {
    setState((s) => {
      if (s.phase !== 'coin-toss' || s.teamA.coinChoice) return s;
      const otherSide: CoinSide = side === 'heads' ? 'tails' : 'heads';
      return {
        ...s,
        teamA: { ...s.teamA, coinChoice: side },
        teamB: { ...s.teamB, coinChoice: otherSide },
      };
    });
  }, []);

  const tossCoin = useCallback(() => {
    setState((s) => {
      if (s.phase !== 'coin-toss' || !s.teamA.coinChoice || !s.teamB.coinChoice) return s;
      const result: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails';
      const winner: TeamId = s.teamA.coinChoice === result ? 'A' : 'B';
      return {
        ...s,
        coinResult: result,
        cointossWinner: winner,
      };
    });
  }, []);

  const startBanPhase = useCallback(() => {
    setState((s) => {
      if (s.phase !== 'coin-toss' || !s.cointossWinner) return s;
      const order = BAN_ORDER(s.cointossWinner);
      return {
        ...s,
        phase: 'ban',
        stepIndex: 0,
        currentTurn: order[0],
        pendingSelection: null,
        selectionByTeam: null,
      };
    });
  }, []);

  const selectCharacter = useCallback((charId: string) => {
    setState((s) => {
      if (s.phase !== 'ban' && s.phase !== 'pick') return s;
      if (!s.currentTurn) return s;

      const allBans = [...s.teamA.bans, ...s.teamB.bans].filter(Boolean) as string[];
      const allPicks = [...s.teamA.picks, ...s.teamB.picks].filter(Boolean) as string[];
      const taken = new Set<string>([...allBans, ...allPicks]);
      if (taken.has(charId)) return s;

      return {
        ...s,
        pendingSelection: charId,
        selectionByTeam: s.currentTurn,
      };
    });
  }, []);

  const lockPick = useCallback(() => {
    setState((s) => {
      if (!s.pendingSelection || !s.currentTurn) return s;
      const team = s.currentTurn;
      const teamKey = team === 'A' ? 'teamA' : 'teamB';
      const teamState = s[teamKey];

      if (s.phase === 'ban' && banOrder) {
        const slot = teamState.bans.findIndex((b) => b === null);
        if (slot === -1) return s;
        const nextBans = [...teamState.bans];
        nextBans[slot] = s.pendingSelection;
        const nextStep = s.stepIndex + 1;
        const finishedBans = nextStep >= banOrder.length;
        const nextPhase: Phase = finishedBans ? 'pick' : 'ban';
        const nextTurn: TeamId | null = finishedBans
          ? (pickOrder ? pickOrder[0] : null)
          : banOrder[nextStep];
        return {
          ...s,
          [teamKey]: { ...teamState, bans: nextBans },
          stepIndex: finishedBans ? 0 : nextStep,
          phase: nextPhase,
          currentTurn: nextTurn,
          pendingSelection: null,
          selectionByTeam: null,
        };
      }

      if (s.phase === 'pick' && pickOrder) {
        const slot = teamState.picks.findIndex((p) => p === null);
        if (slot === -1) return s;
        const nextPicks = [...teamState.picks];
        nextPicks[slot] = s.pendingSelection;
        const nextStep = s.stepIndex + 1;
        const finishedPicks = nextStep >= pickOrder.length;
        return {
          ...s,
          [teamKey]: { ...teamState, picks: nextPicks },
          stepIndex: finishedPicks ? 0 : nextStep,
          phase: finishedPicks ? 'finished' : 'pick',
          currentTurn: finishedPicks ? null : pickOrder[nextStep],
          pendingSelection: null,
          selectionByTeam: null,
        };
      }

      return s;
    });
  }, [banOrder, pickOrder]);

  return {
    state,
    reset,
    setTeamName,
    setTeamACoinChoice,
    tossCoin,
    startBanPhase,
    selectCharacter,
    lockPick,
  };
}
