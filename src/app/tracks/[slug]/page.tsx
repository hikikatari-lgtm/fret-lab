import Link from "next/link";
import { notFound } from "next/navigation";
import { tracks } from "@/data/tracks";
import TrackView from "./TrackView";

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-gold"
      >
        ← 一覧に戻る
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{track.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-mono">
          <span className="rounded-full border border-edge bg-card px-3 py-1">
            <span className="text-muted">Key</span> {track.key}
          </span>
          <span className="rounded-full border border-edge bg-card px-3 py-1">
            <span className="text-muted">BPM</span> {track.bpm}
          </span>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-gold">
            {track.genre}
          </span>
        </div>
        {track.description ? (
          <p className="mt-4 leading-relaxed text-muted">{track.description}</p>
        ) : null}
      </header>

      <TrackView track={track} />
    </div>
  );
}
