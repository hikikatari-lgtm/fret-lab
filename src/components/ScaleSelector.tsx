"use client";

import { ALL_KEYS, SCALES, type ScaleId } from "@/lib/music";

interface ScaleSelectorProps {
  rootNote: string;
  scale: ScaleId;
  display: "degree" | "note";
  onChangeRoot: (note: string) => void;
  onChangeScale: (scale: ScaleId) => void;
  onChangeDisplay: (display: "degree" | "note") => void;
}

export default function ScaleSelector({
  rootNote,
  scale,
  display,
  onChangeRoot,
  onChangeScale,
  onChangeDisplay,
}: ScaleSelectorProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl border border-edge bg-card p-4">
      <label className="flex flex-col gap-1 text-xs text-muted">
        ルート
        <select
          value={rootNote}
          onChange={(e) => onChangeRoot(e.target.value)}
          className="rounded-md border border-edge bg-background px-3 py-2 font-mono text-sm text-foreground focus:border-gold focus:outline-none"
        >
          {ALL_KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs text-muted">
        スケール
        <select
          value={scale}
          onChange={(e) => onChangeScale(e.target.value as ScaleId)}
          className="rounded-md border border-edge bg-background px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
        >
          {(Object.keys(SCALES) as ScaleId[]).map((id) => (
            <option key={id} value={id}>
              {SCALES[id].name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-1 text-xs text-muted">
        表示
        <div className="flex overflow-hidden rounded-md border border-edge">
          <button
            type="button"
            onClick={() => onChangeDisplay("degree")}
            className={`px-3 py-2 text-sm transition-colors ${
              display === "degree"
                ? "bg-gold text-background"
                : "bg-background text-foreground hover:bg-edge"
            }`}
          >
            度数
          </button>
          <button
            type="button"
            onClick={() => onChangeDisplay("note")}
            className={`px-3 py-2 text-sm transition-colors ${
              display === "note"
                ? "bg-gold text-background"
                : "bg-background text-foreground hover:bg-edge"
            }`}
          >
            音名
          </button>
        </div>
      </div>
    </div>
  );
}
