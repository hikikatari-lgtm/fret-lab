# 🎸 Fret Lab

ギターのスケール練習＆バッキング演奏アプリ。
バッキングトラックに合わせて自由に弾く／スケールをフレットボードで可視化する、を主軸にした音楽教育ツール。

## 主な機能

- **バッキングプレイヤー** — テンポとキーを独立して変更可能（Tone.js GrainPlayer）／ループ区間設定
- **フレットボード** — スケール（メジャー／マイナー／ペンタ／ブルース／モード）をルート＋音名／度数で可視化
- **トラックページ** — バッキング＋おすすめスケールをワンセットで提示

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000

## デプロイ

`main` ブランチに push すると Vercel が自動デプロイ。

## 関連プロジェクト

- [Song Master](https://song-master-mu.vercel.app) — 楽器別の楽曲教材
- [Theory Lab](https://theory-lab.vercel.app) — 音楽理論学習
