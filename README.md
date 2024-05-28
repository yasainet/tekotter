# 目的

- LINEログインを通じてユーザー情報を取得し、ユーザーはクイックリプライ を使用して好みの条件（身長、カップ数）を指定する。
- StoreLists に登録されているデータにスクレイピングを行い、CurrentCastData として保存する。
- スクレイピングしたデータと、ユーザーの指定した条件が合致した場合、ユーザーにLINEで情報を通知する。

## 環境

- Apps Script
- Spread Sheets
- LINE
- LINE ログイン
- Messaging API


## 利用するAPI

- LINE
  - Messaging API
  - LINE ログイン

## Spread Sheets の構成

- StoreLists
  - Store
  - Id
- CurrentCastData
  - Timestamp
  - StoreId
  - Name
  - Age
  - Height
  - Cup
- UserProfiles
  - Timestamp
  - UserId
  - UserName
- UserSettings
  - Timestamp
  - UserId
  - HeightSetting
  - CupSetting

---

# ロードマップ

## 1. 環境設定
[x] Google Apps Script プロジェクトを作成
[x] appsscript.json ファイルを設定（例: タイムゾーン、ランタイムバージョン）
[x] 必要なライブラリやAPIの依存関係を設定

## 2. LINE API の設定
[x] LINE Developers コンソールで新しいプロバイダーとチャネルを作成
[x] Messaging API と LINE ログインの設定を行う
[x] チャネルアクセストークンとチャネルシークレットを取得

## 3. スプレッドシートの準備
[x] StoreLists, CurrentCastData, UserProfiles, UserSettings シートを作成
[x] 各シートのカラムを設定（例: StoreLists に Store, Id カラムを追加）

## 4. ユーザー認証
[x] LINE ログインを通じてユーザーを認証するスクリプトを作成
[x] 認証後、ユーザー情報を UserProfiles シートに保存

## 5. ユーザー設定の保存
[ ] クイックリプライを使用してユーザーの好みの条件（身長、カップ数）を取得
[ ] 取得した条件を UserSettings シートに保存

## 6. スクレイピング機能の実装
[ ] StoreLists に登録されているデータをスクレイピングするスクリプトを作成
[ ] スクレイピングしたデータを CurrentCastData シートに保存

## 7. 条件一致の確認と通知
[ ] ユーザーの設定とスクレイピングしたデータを比較するスクリプトを作成
[ ] 条件が一致した場合、ユーザーにLINEで通知する機能を実装

## 8. テストとデバッグ
[ ] 各機能の単体テストを実施
[ ] 統合テストを実施し、全体の動作を確認
[ ] バグ修正と最適化

## 9. ドキュメント作成
[ ] プロジェクトのREADMEを更新し、使用方法や設定方法を記載
[ ] 各スクリプトのコメントやドキュメントを整備

## 10. デプロイと運用
[ ] プロジェクトをデプロイし、実際の運用を開始
[ ] 定期的なメンテナンスとアップデートを計画