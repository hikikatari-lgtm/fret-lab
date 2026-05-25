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
  // 例:
  // {
  //   slug: "blues-in-a",
  //   title: "Slow Blues in A",
  //   key: "A",
  //   bpm: 75,
  //   genre: "Blues",
  //   audioUrl: "/audio/blues-in-a.mp3",
  //   description: "Aメジャー／マイナーペンタとブルースで自由にソロを取れるシンプルなブルース進行。",
  //   suggestedScales: [
  //     { root: "A", scale: "minor_pentatonic", label: "Aマイナーペンタ" },
  //     { root: "A", scale: "blues", label: "Aブルース" },
  //   ],
  // },
];

export const GENRES = ["All", "Blues", "Funk", "Rock", "Jazz", "Pop", "Latin"] as const;
export type Genre = (typeof GENRES)[number];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
