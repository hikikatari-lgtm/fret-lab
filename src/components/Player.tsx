"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";

interface PlayerProps {
  src: string;
  defaultLoop?: { start: number; end: number };
}

// バッキングトラックプレイヤー — Tone.js GrainPlayer を使うことで
// テンポ（playbackRate）とピッチ（detune）を独立に制御できる
export default function Player({ src, defaultLoop }: PlayerProps) {
  const playerRef = useRef<Tone.GrainPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tempo, setTempo] = useState(100); // %
  const [pitch, setPitch] = useState(0); // 半音
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState(defaultLoop?.start ?? 0);
  const [loopEnd, setLoopEnd] = useState(defaultLoop?.end ?? 0);
  const startedAtRef = useRef<number>(0);
  const startedFromRef = useRef<number>(0);

  // 初期化
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const player = new Tone.GrainPlayer({
      url: src,
      loop: false,
      grainSize: 0.1,
      overlap: 0.05,
      onload: () => {
        if (cancelled) return;
        setDuration(player.buffer.duration);
        if (!defaultLoop) {
          setLoopEnd(player.buffer.duration);
        }
        setLoading(false);
        setReady(true);
      },
    }).toDestination();
    playerRef.current = player;

    return () => {
      cancelled = true;
      player.stop();
      player.dispose();
      playerRef.current = null;
    };
    // src が変わった時のみ再初期化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // ピッチ／テンポを反映
  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.playbackRate = tempo / 100;
    playerRef.current.detune = pitch * 100; // cents
  }, [tempo, pitch]);

  // 再生位置の追跡
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const elapsed = Tone.now() - startedAtRef.current;
      const pos = startedFromRef.current + elapsed * (tempo / 100);
      if (loopEnabled && pos >= loopEnd) {
        // ループ範囲外に出たら先頭に戻す
        play(loopStart);
        return;
      }
      if (pos >= duration) {
        stop();
        return;
      }
      setPosition(pos);
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, loopEnabled, loopStart, loopEnd, duration, tempo]);

  const play = useCallback(
    async (from: number = position) => {
      if (!playerRef.current || !ready) return;
      await Tone.start();
      playerRef.current.stop();
      const offset = Math.max(0, Math.min(from, duration - 0.05));
      playerRef.current.start(undefined, offset);
      startedAtRef.current = Tone.now();
      startedFromRef.current = offset;
      setPosition(offset);
      setIsPlaying(true);
    },
    [position, ready, duration],
  );

  const pause = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setIsPlaying(false);
    setPosition(loopEnabled ? loopStart : 0);
  }, [loopEnabled, loopStart]);

  const handleSeek = (value: number) => {
    setPosition(value);
    if (isPlaying) {
      play(value);
    }
  };

  return (
    <div className="space-y-5 rounded-xl border border-edge bg-card p-5">
      {loading ? (
        <div className="text-sm text-muted">音源を読み込み中…</div>
      ) : null}

      {/* トランスポート */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (isPlaying ? pause() : play())}
          disabled={!ready}
          className="rounded-full bg-gold px-6 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isPlaying ? "⏸ 一時停止" : "▶ 再生"}
        </button>
        <button
          type="button"
          onClick={stop}
          disabled={!ready}
          className="rounded-full border border-edge px-4 py-2 text-sm text-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
        >
          ⏹ 停止
        </button>
        <span className="ml-auto font-mono text-xs text-muted tabular-nums">
          {fmt(position)} / {fmt(duration)}
        </span>
      </div>

      {/* シーク */}
      <input
        type="range"
        min={0}
        max={duration || 1}
        step={0.1}
        value={position}
        onChange={(e) => handleSeek(parseFloat(e.target.value))}
        disabled={!ready}
        className="w-full accent-gold"
      />

      {/* テンポ／ピッチ */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Knob
          label="テンポ"
          value={tempo}
          min={50}
          max={150}
          step={1}
          unit="%"
          onChange={setTempo}
          onReset={() => setTempo(100)}
        />
        <Knob
          label="キー"
          value={pitch}
          min={-12}
          max={12}
          step={1}
          unit=" 半音"
          onChange={setPitch}
          onReset={() => setPitch(0)}
        />
      </div>

      {/* ループ */}
      <div className="space-y-3 rounded-lg border border-edge bg-background/40 p-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={loopEnabled}
            onChange={(e) => setLoopEnabled(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          <span>ループ再生</span>
        </label>
        {loopEnabled ? (
          <div className="grid grid-cols-2 gap-3 text-xs text-muted">
            <label className="flex flex-col gap-1">
              開始 {fmt(loopStart)}
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={loopStart}
                onChange={(e) =>
                  setLoopStart(
                    Math.min(parseFloat(e.target.value), loopEnd - 0.5),
                  )
                }
                className="accent-gold"
              />
            </label>
            <label className="flex flex-col gap-1">
              終了 {fmt(loopEnd)}
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={loopEnd}
                onChange={(e) =>
                  setLoopEnd(
                    Math.max(parseFloat(e.target.value), loopStart + 0.5),
                  )
                }
                className="accent-gold"
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Knob({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  onReset,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="rounded-lg border border-edge bg-background/40 p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-muted">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums text-foreground">
            {value > 0 && unit !== "%" ? "+" : ""}
            {value}
            {unit}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] text-muted underline hover:text-gold"
          >
            reset
          </button>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-gold"
      />
    </div>
  );
}

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
