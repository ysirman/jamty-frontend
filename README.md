# 環境構築

```bash
# docker image作成
docker-compose build
```

# Next.js 起動

`.env.sample`をコピーして`.env.local`を作成し、環境変数を設定しておく

```bash
# デタッチド・モードでコンテナ起動 && コンテナに入る
docker-compose up -d && docker-compose exec frontend bash

# 起動
npm run dev

# Vercelへのデプロイ時に実行されるコマンド
npm run build

# コンテナ削除
Ctrl + D
docker-compose down
```
