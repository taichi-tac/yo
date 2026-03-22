# YouTube台本ジェネレーター

タイトルを入力するだけで、AIが魅力的なYouTube動画の台本を自動生成するWebアプリケーションです。

![YouTube Script Generator](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## 特徴

- 🤖 **AI駆動**: Anthropic Claude API（Claude 3.5 Sonnet）による高品質な台本生成
- ⚡ **高速**: 30秒以内に台本を生成
- 📝 **構造化された台本**: オープニング、本編、クロージングの3部構成
- 💅 **モダンUI**: Tailwind CSSによるレスポンシブデザイン
- 📋 **便利機能**: ワンクリックでコピー・ダウンロード
- 🔒 **セキュア**: APIキーはバックエンドで管理

## 技術スタック

### フロントエンド
- **React 18.3** - UIライブラリ
- **TypeScript 5.6** - 型安全性
- **Vite 6.0** - ビルドツール
- **Tailwind CSS 3.4** - スタイリング

### バックエンド
- **Vercel Functions** - サーバーレスAPI
- **Anthropic Claude API** - AI台本生成

### 開発ツール
- **ESLint** - コード品質
- **Prettier** - コードフォーマット
- **Vitest** - ユニットテスト

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Anthropic APIキー

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/taichi-tac/yo.git
cd yo
```

2. 依存関係をインストール:
```bash
npm install
```

3. 環境変数を設定:
```bash
cp .env.local.example .env.local
```

`.env.local` を編集して、Anthropic API Keyを設定:
```env
ANTHROPIC_API_KEY=sk-ant-your_api_key_here
```

Anthropic APIキーは[こちら](https://console.anthropic.com/settings/keys)から取得できます。

## 使用方法

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### テスト

```bash
# テスト実行
npm test

# カバレッジレポート
npm run test:coverage
```

### リント・フォーマット

```bash
# ESLint実行
npm run lint

# Prettier実行
npm run format
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にサインアップ

2. Vercel CLIをインストール:
```bash
npm install -g vercel
```

3. デプロイ:
```bash
vercel
```

4. 環境変数を設定:
```bash
vercel env add ANTHROPIC_API_KEY
```

5. 本番環境にデプロイ:
```bash
vercel --prod
```

## プロジェクト構造

```
yo/
├── api/                          # Vercel Functions
│   └── generate-script.ts        # 台本生成API
├── src/
│   ├── components/               # Reactコンポーネント
│   │   ├── ScriptGenerator.tsx   # メインコンポーネント
│   │   ├── TitleInput.tsx        # タイトル入力フォーム
│   │   ├── ScriptDisplay.tsx     # 台本表示
│   │   └── LoadingSpinner.tsx    # ローディング表示
│   ├── services/                 # サービス層
│   │   └── api.ts                # API通信
│   ├── App.tsx                   # ルートコンポーネント
│   ├── main.tsx                  # エントリーポイント
│   └── index.css                 # グローバルCSS
├── public/                       # 静的ファイル
├── .github/                      # GitHub Actions
├── index.html                    # HTMLテンプレート
├── vite.config.ts                # Vite設定
├── tsconfig.json                 # TypeScript設定
├── tailwind.config.js            # Tailwind CSS設定
├── postcss.config.js             # PostCSS設定
├── eslint.config.js              # ESLint設定
└── package.json                  # 依存関係
```

## 台本の構成

生成される台本は以下の構成になっています:

### 1. オープニング（30秒）
- 視聴者の注意を引くフック
- 簡単な自己紹介

### 2. 本編（5-8分）
- 導入: 問題提起
- 解決策1: 具体的な方法（実例やデータを含む）
- 解決策2: 別のアプローチ
- 解決策3: 追加のヒントやコツ
- まとめ

### 3. クロージング（30秒-1分）
- 要点のまとめ
- 視聴者へのCTA（チャンネル登録、コメント促進）
- 次回予告

## ライセンス

MIT License

## サポート

問題やバグを発見した場合は、[Issues](https://github.com/taichi-tac/yo/issues)で報告してください。

## 開発

このプロジェクトはMiyabiフレームワークで構築されています。詳細は[CLAUDE.md](./CLAUDE.md)を参照してください。

---

Made with 🌸 by [Miyabi Framework](https://github.com/ShunsukeHayashi/Autonomous-Operations)
