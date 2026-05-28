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
  // コード譜（手書き譜の書き起こし）
  chordChart?: {
    imageUrl?: string; // 手書き譜の画像URL（任意）
    sections?: ChordSection[];
  };
}

export interface ChordSection {
  name: string; // "A", "C" etc
  rows: ChordRow[];
}

export interface ChordRow {
  open?: string; // 行頭の記号（例 "‖:"）
  close?: string; // 行末の記号（例 ":‖"）
  measures: ChordBeat[][]; // 各小節 = ビート（コード）の配列。1小節に複数コード可
}

export interface ChordBeat {
  degree?: string; // ローマ数字ディグリー
  chord: string; // "%" は前小節リピート
}

export const tracks: Track[] = [
  {
    slug: "isnt-she-lovely",
    title: "Isn't She Lovely",
    key: "E",
    bpm: 118,
    genre: "R&B",
    audioUrl: "/audio/isnt-she-lovely.mp3",
    description:
      "Stevie Wonderの名曲「Isn't She Lovely」のバッキングトラック。Key=E。循環するII-Vの動きが心地よいR&B／ソウルの定番進行で、C#マイナーペンタトニックを軸にメロディアスなソロを練習できます。",
    suggestedScales: [
      { root: "C#", scale: "minor_pentatonic", label: "C# マイナーペンタ" },
      { root: "C#", scale: "blues", label: "C# ブルース" },
      { root: "E", scale: "major_pentatonic", label: "E メジャーペンタ" },
      { root: "E", scale: "major", label: "E メジャー" },
    ],
    chordChart: {
      sections: [
        {
          name: "A",
          rows: [
            {
              open: "‖:",
              close: ":‖",
              measures: [
                [{ degree: "VIm7", chord: "C#m7" }],
                [{ degree: "II7", chord: "F#7" }],
                [{ degree: "IV/V", chord: "A/B" }],
                [{ degree: "I", chord: "E" }],
              ],
            },
          ],
        },
        {
          name: "C",
          rows: [
            {
              measures: [
                [{ degree: "IVmaj7", chord: "Amaj7" }],
                [{ degree: "III7", chord: "G#7" }],
                [{ degree: "VIm7", chord: "C#m7" }],
                [{ degree: "II7", chord: "F#7" }],
              ],
            },
            {
              measures: [
                [{ degree: "IV/V", chord: "A/B" }],
                [{ chord: "%" }],
                [{ degree: "I", chord: "E" }],
                [{ chord: "%" }],
              ],
            },
          ],
        },
      ],
    },
  },
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
      "Grover Washington Jr. の名曲「Just the Two of Us」のバッキングトラック。Dbmaj7→C7→Fm7 の循環に、Ebm7→Ab7（Dbへの II-V）を挟むスムースジャズの定番進行。Fmペンタトニックを中心にメロディックなソロ練習ができます。",
    suggestedScales: [
      { root: "F", scale: "minor_pentatonic", label: "F マイナーペンタ" },
      { root: "F", scale: "blues", label: "F ブルース" },
      { root: "F", scale: "dorian", label: "F ドリアン" },
      { root: "F", scale: "minor", label: "F ナチュラルマイナー" },
    ],
    chordChart: {
      sections: [
        {
          name: "A",
          rows: [
            {
              open: "‖:",
              measures: [
                [
                  { degree: "IVmaj7", chord: "Dbmaj7" },
                  { degree: "III7", chord: "C7" },
                ],
                [
                  { degree: "VIm7", chord: "Fm7" },
                  { degree: "IIm7", chord: "Ebm7" },
                  { degree: "V7", chord: "Ab7" },
                ],
              ],
            },
            {
              close: ":‖",
              measures: [
                [
                  { degree: "IVmaj7", chord: "Dbmaj7" },
                  { degree: "III7", chord: "C7" },
                ],
                [{ degree: "VIm7", chord: "Fm7" }],
              ],
            },
          ],
        },
      ],
    },
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
