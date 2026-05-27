// バッキングトラックのデータ
// ファイルは public/audio/ 以下に置く

import type { ScaleId } from "@/lib/music";

export interface Track {
  slug: string;
  title: string;
  key: string; // "Am", "E", "Bb" etc
  bpm: number;
  genre: string; // "Blues", "Funk", "Rock", "Jazz", "Pop"
  audioUrl: string; // /audio/xxx.mp3
  description?: string;
  // 推奨スケール（フレットボードに初期表示）
  suggestedScales?: { root: string; scale: ScaleId; label?: string }[];
  // ループ初期値（秒）
  defaultLoop?: { start: number; end: number };
}

export const tracks: Track[] = [
  {
    slug: "bb-blues",
    title: "Bb Blues",
    key: "Bb",
    bpm: 100,
    genre: "Blues",
    audioUrl: "/audio/bb-blues.mp3",
    description:
      "Bbブルース進行のバッキングトラック。管楽器の世界では定番キーで、ホーンとの共演を意識した練習にも最適。Bbブルーススケールでブルージーなフレーズを徹底的に磨きましょう。",
    suggestedScales: [
      { root: "Bb", scale: "blues", label: "Bb ブルース" },
      { root: "Bb", scale: "minor_pentatonic", label: "Bb マイナーペンタ" },
      { root: "Bb", scale: "major_pentatonic", label: "Bb メジャーペンタ" },
      { root: "Bb", scale: "mixolydian", label: "Bb ミクソリディアン" },
    ],
  },
  {
    slug: "just-the-two-of-us-fm",
    title: "Just the Two of Us（Fm）",
    key: "Fm",
    bpm: 95,
    genre: "Jazz",
    audioUrl: "/audio/just-the-two-of-us-fm.mp3",
    description:
      "Grover Washington Jr. の名曲「Just the Two of Us」のバッキングトラック（Fmバージョン）。II-V-I が連続するスムースジャズの定番進行で、Fmペンタトニックを中心にメロディックなソロ練習ができます。",
    suggestedScales: [
      { root: "F", scale: "minor_pentatonic", label: "F マイナーペンタ" },
      { root: "F", scale: "blues", label: "F ブルース" },
      { root: "F", scale: "dorian", label: "F ドリアン" },
      { root: "F", scale: "minor", label: "F ナチュラルマイナー" },
    ],
  },
  {
    slug: "am-pentatonic-jam",
    title: "Am ペンタトニック・ジャム",
    key: "Am",
    bpm: 100,
    genre: "Rock",
    audioUrl: "/audio/am-pentatonic-jam.mp3",
    description:
      "Aマイナーペンタトニックでソロ練習するためのバッキングトラック。ロック／ブルースの最も基本的なキーで、まず最初に挑戦したいペンタ練習用。",
    suggestedScales: [
      { root: "A", scale: "minor_pentatonic", label: "A マイナーペンタ" },
      { root: "A", scale: "blues", label: "A ブルース" },
      { root: "A", scale: "minor", label: "A ナチュラルマイナー" },
      { root: "A", scale: "dorian", label: "A ドリアン" },
    ],
  },
  {
    slug: "em-pentatonic-jam",
    title: "Em ペンタトニック・ジャム",
    key: "Em",
    bpm: 100,
    genre: "Rock",
    audioUrl: "/audio/em-pentatonic-jam.mp3",
    description:
      "Eマイナーペンタトニックでソロ練習するためのバッキングトラック。基本のペンタからブルース、ナチュラルマイナー、ドリアンへと段階的に語彙を増やしていくのに最適。",
    suggestedScales: [
      { root: "E", scale: "minor_pentatonic", label: "E マイナーペンタ" },
      { root: "E", scale: "blues", label: "E ブルース" },
      { root: "E", scale: "minor", label: "E ナチュラルマイナー" },
      { root: "E", scale: "dorian", label: "E ドリアン" },
    ],
  },
];

export const GENRES = ["All", "Blues", "Funk", "Rock", "Jazz", "Pop", "Latin"] as const;
export type Genre = (typeof GENRES)[number];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
