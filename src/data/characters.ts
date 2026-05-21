import type { Character } from '../types';

type CharSeed = { id: string; portraitFile: string; portraitPosition?: string };

const SEEDS: CharSeed[] = [
  { id: 'Ai', portraitFile: 'Grand_Chase_for_kakao_Ai_04.webp' },
  { id: 'Amy', portraitFile: 'Grand_Chase_for_kakao_Amy_05.webp' },
  { id: 'Arme', portraitFile: 'Another_character_Arme_02.webp' },
  { id: 'Asin', portraitFile: 'Grand_Chase_for_kakao_Asin_04.webp' },
  { id: 'Decanee', portraitFile: 'Grand_Chase_for_kakao_Decanee_04.webp' },
  { id: 'Dio', portraitFile: 'Grand_Chase_for_kakao_Dio_04.webp' },
  { id: 'Edel', portraitFile: 'Grand_Chase_for_kakao_Edel_05.webp', portraitPosition: '70% center' },
  { id: 'Elesis', portraitFile: 'Grand_Chase_for_kakao_Elesis_04.webp', portraitPosition: '42% center' },
  { id: 'Jin', portraitFile: 'Grand_Chase_for_kakao_Jin_04.webp', portraitPosition: '45% center' },
  { id: 'Kallia', portraitFile: 'Awakening_Kallia.webp', portraitPosition: '46% center' },
  { id: 'Lass', portraitFile: 'Grand_Chase_for_kakao_Lass_04.webp', portraitPosition: '52% center' },
  { id: 'Ley', portraitFile: 'Grand_Chase_for_kakao_Ley_04.webp', portraitPosition: '44% center' },
  { id: 'Lime', portraitFile: 'Grand_Chase_for_kakao_Lime_04.webp' },
  { id: 'Lire', portraitFile: 'Phantom_Ranger_Lire.webp', portraitPosition: '40% center' },
  { id: 'Mari', portraitFile: 'Another_character_Mari_02.webp', portraitPosition: '40% center' },
  { id: 'Rin', portraitFile: 'Another_character_Rin_02.webp', portraitPosition: '32% center' },
  { id: 'Ronan', portraitFile: 'Another_character_Ronan_02.webp', portraitPosition: '55% center' },
  { id: 'Rufus', portraitFile: 'Grand_Chase_for_kakao_Rufus_04.webp' },
  { id: 'Ryan', portraitFile: 'Grand_Chase_for_kakao_Ryan_04.webp' },
  { id: 'Sieghart', portraitFile: 'Grand_Chase_for_kakao_Sieghart_04.webp' },
  { id: 'Uno', portraitFile: 'Blood_Vindicator_Uno.webp', portraitPosition: '50% center' },
  { id: 'Veigas', portraitFile: 'Grand_Chase_for_kakao_Veigas_04.webp' },
  { id: 'Zero', portraitFile: 'Grand_Chase_for_kakao_Zero_04.webp' },
];

export const CHARACTERS: Character[] = SEEDS.map((s) => ({
  id: s.id,
  name: s.id.toUpperCase(),
  iconPath: `/icons/CharIcon_${s.id}.webp`,
  portraitPath: `/portraits/${s.portraitFile}`,
  portraitPosition: s.portraitPosition,
}));

export const CHARACTER_BY_ID: Record<string, Character> = CHARACTERS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, Character>,
);
