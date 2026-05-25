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
