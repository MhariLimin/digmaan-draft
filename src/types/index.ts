export type TeamId = 'A' | 'B';

export type CoinSide = 'heads' | 'tails';

export type Phase = 'coin-toss' | 'ban' | 'pick' | 'finished';

export interface Character {
  id: string;
  name: string;
  iconPath: string;
  portraitPath: string;
  /** Optional override for the portrait's `object-position` (e.g., "70% center"). Defaults to "center top". */
  portraitPosition?: string;
}

export interface TeamState {
  name: string;
  bans: (string | null)[];
  picks: (string | null)[];
  coinChoice: CoinSide | null;
}

export interface DraftState {
  phase: Phase;
  teamA: TeamState;
  teamB: TeamState;
  coinResult: CoinSide | null;
  cointossWinner: TeamId | null;
  currentTurn: TeamId | null;
  stepIndex: number;
  pendingSelection: string | null;
  selectionByTeam: TeamId | null;
}
