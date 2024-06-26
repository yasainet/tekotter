# 目的

- LINEの友だち追加時にユーザー識別子を取得し、ユーザーはクイックリプライを使用して好みの条件（カップ数）を指定する。
- StoreLists に登録されているデータにスクレイピングを行い、CurrentCastData として保存する。
- スクレイピングしたデータと、ユーザーの指定した条件が合致した場合、ユーザーにLINEで情報を通知する。

## 環境

- Apps Script
- Spread Sheets
- LINE
- Messaging API

## 利用するAPI

- LINE
  - Messaging API

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
  - CupSetting

# ロードマップ

## 1. 環境設定
- [x] Google Apps Script プロジェクトを作成
- [x] appsscript.json ファイルを設定（例: タイムゾーン、ランタイムバージョン）
- [x] 必要なライブラリやAPIの依存関係を設定

## 2. LINE API の設定
- [x] LINE Developers コンソールで新しいプロバイダーとチャネルを作成
- [x] Messaging API の設定を行う
- [x] チャネルアクセストークンとチャネルシークレットを取得

## 3. スプレッドシートの準備
- [x] StoreLists, CurrentCastData, UserProfiles, UserSettings シートを作成
- [x] 各シートのカラムを設定（例: StoreLists に Store, Id カラムを追加）

## 4. ユーザー識別子の取得
- [x] 友だち追加時にウェルカムメッセージを送信し、クイックリプライでユーザー識別子を取得
- [x] 取得したユーザー識別子を UserProfiles シートに保存

## 5. ユーザー設定の保存
- [x] クイックリプライを使用してユーザーの好みの条件（カップ数）を取得
- [x] 取得した条件を UserSettings シートに保存

## 6. ユーザー設定の編集処理
- [x] 編集のトリガーを作成
- [x] Spread Sheets に対して UserId で一致させて上書き
- [x] 設定更新の通知を行う
- [x] カップ数、以上・以下 を分けて保存する

## 7. スクレイピング機能の実装
- [x] StoreLists に登録されているデータをスクレイピングするスクリプトを作成
- [x] スクレイピングしたデータを CurrentCastData シートに保存

## 8. 条件一致の確認と通知
- [x] ユーザーの設定とスクレイピングしたデータを比較するスクリプトを作成
- [x] 条件が一致した場合、ユーザーにLINEで通知する機能を実装

## 9. リファクタリング
- [x] CastData のスクレイピングをしたあと、クリアして上書きする処理を作成
- [ ] メッセージの最大文字数を考慮した、分割の処理を作成
- [ ] UserSettings への保存処理を最適化する
  - [ ] 以上、以下の条件を厳密に仕様に落とし込んで処理をする
