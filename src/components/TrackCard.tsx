import Link from "next/link";
import type { Track } from "@/data/tracks";

export default function TrackCard({ track }: { track: Track }) {
  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="block rounded-xl border border-edge bg-card p-5 transition-all hover:border-gold hover:bg-card/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {track.title}
          </h3>
          {track.description ? (
            <p className="mt-1 line-clamp-2 text-sm text-muted">
              {track.description}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-xs text-gold">
          {track.genre}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
        <span className="rounded-full border border-edge px-2 py-0.5">
          <span className="text-muted">Key</span> {track.key}
        </span>
        <span className="rounded-full border border-edge px-2 py-0.5">
          <span className="text-muted">BPM</span> {track.bpm}
        </span>
      </div>
    </Link>
  );
}
