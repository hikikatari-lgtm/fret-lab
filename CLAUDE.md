# Fret Lab

ギターのスケール練習＆バッキング演奏アプリ。
バッキングトラックに合わせて自由に弾く／スケールをフレットボードで可視化する、を主軸にした音楽教育ツール。

## 技術スタック
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Tone.js（音源再生／テンポ・ピッチ独立制御）
- Vercel デプロイ（GitHub連携、mainにpushで自動デプロイ）

## プロジェクト構成
```
src/
  app/
    layout.tsx          # ルートレイアウト（ヘッダー／フッター付）
    page.tsx            # トップ（バッキングトラック一覧）
    scales/
      page.tsx          # スケール単体ビジュアライザー
    tracks/
      [slug]/
        page.tsx        # トラック詳細（Server Component）
        TrackView.tsx   # 詳細ページのClient部分（プレイヤー＋フレットボード）
  components/
    Player.tsx          # Tone.js GrainPlayerベースのプレイヤー（テンポ／キー／ループ）
    Fretboard.tsx       # SVGフレットボード（スケールハイライト）
    ScaleSelector.tsx   # ルート／スケール／表示モード切替UI
    TrackCard.tsx       # トップページのトラックカード
  data/
    tracks.ts           # バッキングトラックデータ（ここに追記）
  lib/
    music.ts            # 音楽理論ユーティリティ（スケール／ノート／フレット）
public/
  audio/                # バッキングMP3を置く
```

## バッキングトラック追加方法

1. MP3を `public/audio/` に置く（例: `slow-blues-a.mp3`）
2. `src/data/tracks.ts` の `tracks` 配列に追加：

```ts
{
  slug: "slow-blues-a",
  title: "Slow Blues in A",
  key: "A",
  bpm: 75,
  genre: "Blues",
  audioUrl: "/audio/slow-blues-a.mp3",
  description: "AマイナーペンタとAブルースで遊べるシンプルなブルース。",
  suggestedScales: [
    { root: "A", scale: "minor_pentatonic", label: "Aマイナーペンタ" },
    { root: "A", scale: "blues", label: "Aブルース" },
  ],
}
```

3. `git push` で Vercel が自動デプロイ。

## スケールの追加

`src/lib/music.ts` の `SCALES` オブジェクトに追加：

```ts
ionian_b6: {
  name: "イオニアン♭6",
  intervals: [0, 2, 4, 5, 7, 8, 11],
  degrees: ["1", "2", "3", "4", "5", "b6", "7"],
}
```

## デプロイ
git push origin main で Vercel が自動デプロイ。

## 関連プロジェクト
- Song Master: https://song-master-mu.vercel.app （楽器別の楽曲教材）
- Theory Lab: https://theory-lab.vercel.app （音楽理論学習）

@AGENTS.md
