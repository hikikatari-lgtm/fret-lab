"use client";

import { useState } from "react";
import Player from "@/components/Player";
import Fretboard from "@/components/Fretboard";
import ScaleSelector from "@/components/ScaleSelector";
import type { Track } from "@/data/tracks";
import type { ScaleId } from "@/lib/music";

// キー文字列からルートとスケールを推定（"Am" → "A" + minor）
function parseKey(key: string): { root: string; scale: ScaleId } {
  const isMinor = key.endsWith("m");
  const root = isMinor ? key.slice(0, -1) : key;
  return { root, scale: isMinor ? "minor" : "major" };
}

export default function TrackView({ track }: { track: Track }) {
  const initial = track.suggestedScales?.[0]
    ? { root: track.suggestedScales[0].root, scale: track.suggestedScales[0].scale }
    : parseKey(track.key);
  const [rootNote, setRootNote] = useState(initial.root);
  const [scale, setScale] = useState<ScaleId>(initial.scale);
  const [display, setDisplay] = useState<"degree" | "note">("note");

  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gold">🎧 プレイヤー</h2>
        <Player src={track.audioUrl} defaultLoop={track.defaultLoop} />
      </section>

      {track.suggestedScales && track.suggestedScales.length > 0 ? (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted">
            おすすめスケール
          </h2>
          <div className="flex flex-wrap gap-2">
            {track.suggestedScales.map((s, i) => {
              const active = s.root === rootNote && s.scale === scale;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setRootNote(s.root);
                    setScale(s.scale);
                  }}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    active
                      ? "border-gold bg-gold/20 text-gold"
                      : "border-edge text-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {s.label ?? `${s.root} ${s.scale}`}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gold">
          🎸 フレットボード
        </h2>
        <div className="space-y-4">
          <ScaleSelector
            rootNote={rootNote}
            scale={scale}
            display={display}
            onChangeRoot={setRootNote}
            onChangeScale={setScale}
            onChangeDisplay={setDisplay}
          />
          <Fretboard rootNote={rootNote} scale={scale} display={display} />
        </div>
      </section>
    </div>
  );
}
