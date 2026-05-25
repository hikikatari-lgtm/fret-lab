"use client";

import { useState } from "react";
import Fretboard from "@/components/Fretboard";
import ScaleSelector from "@/components/ScaleSelector";
import type { ScaleId } from "@/lib/music";

export default function ScalesPage() {
  const [rootNote, setRootNote] = useState("A");
  const [scale, setScale] = useState<ScaleId>("minor_pentatonic");
  const [display, setDisplay] = useState<"degree" | "note">("degree");

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">スケール</h1>
        <p className="mt-2 text-muted">
          キーとスケールを選ぶと、フレットボード全体に音をマッピング。
          ルート音は金色、それ以外は緑で表示されます。
        </p>
      </header>

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
    </div>
  );
}
