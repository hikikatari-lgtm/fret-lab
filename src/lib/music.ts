// 音楽理論ユーティリティ — スケール／ノート計算

export const NOTES_SHARP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const NOTES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export type NoteName = (typeof NOTES_SHARP)[number] | (typeof NOTES_FLAT)[number];

// 各スケールのインターバル（半音）
export const SCALES = {
  major: { name: "メジャー", intervals: [0, 2, 4, 5, 7, 9, 11], degrees: ["1", "2", "3", "4", "5", "6", "7"] },
  minor: { name: "ナチュラルマイナー", intervals: [0, 2, 3, 5, 7, 8, 10], degrees: ["1", "2", "b3", "4", "5", "b6", "b7"] },
  harmonic_minor: { name: "ハーモニックマイナー", intervals: [0, 2, 3, 5, 7, 8, 11], degrees: ["1", "2", "b3", "4", "5", "b6", "7"] },
  melodic_minor: { name: "メロディックマイナー", intervals: [0, 2, 3, 5, 7, 9, 11], degrees: ["1", "2", "b3", "4", "5", "6", "7"] },
  dorian: { name: "ドリアン", intervals: [0, 2, 3, 5, 7, 9, 10], degrees: ["1", "2", "b3", "4", "5", "6", "b7"] },
  phrygian: { name: "フリジアン", intervals: [0, 1, 3, 5, 7, 8, 10], degrees: ["1", "b2", "b3", "4", "5", "b6", "b7"] },
  lydian: { name: "リディアン", intervals: [0, 2, 4, 6, 7, 9, 11], degrees: ["1", "2", "3", "#4", "5", "6", "7"] },
  mixolydian: { name: "ミクソリディアン", intervals: [0, 2, 4, 5, 7, 9, 10], degrees: ["1", "2", "3", "4", "5", "6", "b7"] },
  locrian: { name: "ロクリアン", intervals: [0, 1, 3, 5, 6, 8, 10], degrees: ["1", "b2", "b3", "4", "b5", "b6", "b7"] },
  major_pentatonic: { name: "メジャーペンタ", intervals: [0, 2, 4, 7, 9], degrees: ["1", "2", "3", "5", "6"] },
  minor_pentatonic: { name: "マイナーペンタ", intervals: [0, 3, 5, 7, 10], degrees: ["1", "b3", "4", "5", "b7"] },
  blues: { name: "ブルース", intervals: [0, 3, 5, 6, 7, 10], degrees: ["1", "b3", "4", "b5", "5", "b7"] },
} as const;

export type ScaleId = keyof typeof SCALES;

// キー名 → 半音インデックス（C=0）
export function noteIndex(name: string): number {
  const sharpIdx = NOTES_SHARP.indexOf(name as (typeof NOTES_SHARP)[number]);
  if (sharpIdx >= 0) return sharpIdx;
  const flatIdx = NOTES_FLAT.indexOf(name as (typeof NOTES_FLAT)[number]);
  if (flatIdx >= 0) return flatIdx;
  return 0;
}

// 半音インデックス → ノート名（フラット系キーならフラット表記、それ以外はシャープ）
export function noteName(index: number, preferFlat = false): string {
  const i = ((index % 12) + 12) % 12;
  return preferFlat ? NOTES_FLAT[i] : NOTES_SHARP[i];
}

// キーがフラット系か判定（簡易）
const FLAT_KEYS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"]);
export function preferFlat(key: string): boolean {
  return FLAT_KEYS.has(key);
}

// スケールの全ノート（C=0基準のインデックス配列）
export function scaleNotes(rootNote: string, scaleId: ScaleId): number[] {
  const root = noteIndex(rootNote);
  return SCALES[scaleId].intervals.map((i) => (root + i) % 12);
}

// あるノートインデックスがスケール内なら度数を返す
export function scaleDegree(
  noteIdx: number,
  rootNote: string,
  scaleId: ScaleId,
): string | null {
  const root = noteIndex(rootNote);
  const interval = (((noteIdx - root) % 12) + 12) % 12;
  const scale = SCALES[scaleId];
  const pos = scale.intervals.indexOf(interval as never);
  if (pos < 0) return null;
  return scale.degrees[pos];
}

// 標準チューニング（低音弦→高音弦）E, A, D, G, B, E
// 6弦=index 0（一番低い）, 1弦=index 5（一番高い）
export const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"] as const;

// 弦×フレット → ノートインデックス
export function fretToNote(
  stringIdx: number,
  fret: number,
  tuning: readonly string[] = STANDARD_TUNING,
): number {
  return (noteIndex(tuning[stringIdx]) + fret) % 12;
}

export const ALL_KEYS = [
  "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B",
] as const;
