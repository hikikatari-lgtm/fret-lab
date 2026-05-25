import Link from "next/link";
import TrackCard from "@/components/TrackCard";
import { tracks } from "@/data/tracks";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          バッキングに合わせて自由に弾く
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          テンポやキーを自在に変えられるバッキングプレイヤーと、
          スケールをその場でフレットボードに展開できるビジュアライザー。
          スケールだけ確認したい時は{" "}
          <Link
            href="/scales"
            className="text-gold underline-offset-4 hover:underline"
          >
            スケール画面
          </Link>{" "}
          へ。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-gold">
          🎵 バッキングトラック
        </h2>
        {tracks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-edge bg-card p-10 text-center">
            <p className="text-muted">
              まだバッキングトラックがありません。
              <br />
              <code className="text-foreground">public/audio/</code> に MP3 を置いて{" "}
              <code className="text-foreground">src/data/tracks.ts</code> に追加してください。
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <TrackCard key={track.slug} track={track} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
