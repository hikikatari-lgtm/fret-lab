"use client";

import {
  STANDARD_TUNING,
  fretToNote,
  noteName,
  scaleDegree,
  preferFlat,
  type ScaleId,
} from "@/lib/music";

interface FretboardProps {
  rootNote: string;
  scale: ScaleId;
  frets?: number;
  display?: "degree" | "note";
}

// SVG フレットボード（横向き、低音弦が上）
export default function Fretboard({
  rootNote,
  scale,
  frets = 15,
  display = "degree",
}: FretboardProps) {
  const strings = STANDARD_TUNING.length; // 6
  const fretWidth = 60;
  const stringSpacing = 32;
  const paddingX = 40;
  const paddingY = 28;
  const width = paddingX * 2 + fretWidth * frets;
  const height = paddingY * 2 + stringSpacing * (strings - 1);
  const useFlats = preferFlat(rootNote);

  const inlayFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];
  const doubleInlayFrets = [12, 24];

  // 弦は上から1弦(高音)→6弦(低音)で描画したいので、逆順
  // tuning[5] = 高音E (1弦), tuning[0] = 低音E (6弦)
  const stringIndices = [5, 4, 3, 2, 1, 0]; // 表示順（上から下）

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-edge bg-card p-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block min-w-full"
        style={{ minWidth: width }}
      >
        {/* フレットボード背景 */}
        <rect
          x={paddingX}
          y={paddingY - 8}
          width={fretWidth * frets}
          height={stringSpacing * (strings - 1) + 16}
          fill="#1a1a1d"
          rx={4}
        />

        {/* インレイ */}
        {Array.from({ length: frets }, (_, i) => i + 1)
          .filter((f) => inlayFrets.includes(f))
          .map((f) => {
            const cx = paddingX + fretWidth * (f - 0.5);
            const cy = paddingY + (stringSpacing * (strings - 1)) / 2;
            if (doubleInlayFrets.includes(f)) {
              return (
                <g key={f}>
                  <circle cx={cx} cy={cy - stringSpacing} r={5} fill="#3a3a3e" />
                  <circle cx={cx} cy={cy + stringSpacing} r={5} fill="#3a3a3e" />
                </g>
              );
            }
            return <circle key={f} cx={cx} cy={cy} r={5} fill="#3a3a3e" />;
          })}

        {/* ナット */}
        <rect
          x={paddingX - 4}
          y={paddingY - 8}
          width={6}
          height={stringSpacing * (strings - 1) + 16}
          fill="#e5e5e5"
        />

        {/* フレット線 */}
        {Array.from({ length: frets + 1 }, (_, i) => (
          <line
            key={i}
            x1={paddingX + fretWidth * i}
            y1={paddingY - 8}
            x2={paddingX + fretWidth * i}
            y2={paddingY + stringSpacing * (strings - 1) + 8}
            stroke="#6a6a6e"
            strokeWidth={i === 0 ? 0 : 2}
          />
        ))}

        {/* 弦 */}
        {stringIndices.map((sIdx, displayRow) => (
          <line
            key={sIdx}
            x1={paddingX}
            y1={paddingY + stringSpacing * displayRow}
            x2={paddingX + fretWidth * frets}
            y2={paddingY + stringSpacing * displayRow}
            stroke="#cccccc"
            strokeWidth={0.8 + (5 - displayRow) * 0.3}
            opacity={0.9}
          />
        ))}

        {/* フレット番号 */}
        {Array.from({ length: frets }, (_, i) => i + 1).map((f) => (
          <text
            key={f}
            x={paddingX + fretWidth * (f - 0.5)}
            y={paddingY + stringSpacing * (strings - 1) + 22}
            textAnchor="middle"
            fontSize={10}
            fill="#7a7a7e"
            fontFamily="monospace"
          >
            {f}
          </text>
        ))}

        {/* ノート（スケール内のみ表示） */}
        {stringIndices.map((sIdx, displayRow) =>
          Array.from({ length: frets + 1 }, (_, fret) => {
            const noteIdx = fretToNote(sIdx, fret);
            const degree = scaleDegree(noteIdx, rootNote, scale);
            if (!degree) return null;
            const isRoot = degree === "1";
            const cx =
              fret === 0
                ? paddingX - 18
                : paddingX + fretWidth * (fret - 0.5);
            const cy = paddingY + stringSpacing * displayRow;
            return (
              <g key={`${sIdx}-${fret}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={12}
                  fill={isRoot ? "#e6b800" : "#4ade80"}
                  stroke={isRoot ? "#fff" : "#1a1a1d"}
                  strokeWidth={isRoot ? 1.5 : 1}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={isRoot ? "#1a1a1d" : "#0b0b0c"}
                  fontFamily="monospace"
                >
                  {display === "degree" ? degree : noteName(noteIdx, useFlats)}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
