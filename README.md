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

---

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
- [ ] 友だち追加時にウェルカムメッセージを送信し、クイックリプライでユーザー識別子を取得
- [ ] 取得したユーザー識別子を UserProfiles シートに保存


1. 友だち追加:
- ユーザーがLINEで友だち追加を行うと、ウェルカムメッセージとクイックリプライで「OK👌」と送信する: line-hello.js
- ユーザーが、クイックリプライの「OK👌」を押す
- ユーザーの識別子を取得し、Google Sheetsの UserProfiles シートに保存する: utils.js

2. カップ数の条件入力:
ユーザーにカップ数の選択肢をクイックリプライで提示します。: user-settings.js
クイックリプライ: A, B, C, D, E, F, G, H

3. 詳細条件の入力:
ユーザーがカップ数を選択した後、「以上」または「以下」の比較条件をクイックリプライで提示します。: user-settings.js

4. 条件の確認: user-settings.js
ユーザーが選択したカップ数と比較条件を確認するメッセージを送信し、「OK」または「やり直す」の選択肢を提示します。
例：「あなたの選択は「Gカップ以上」です！このまま登録しますか？」「OK」「やり直す」
ユーザーが「OK」を選択すると、条件が確定されます。
ユーザーが「やり直す」を選択すると、再度カップ数の条件入力からやり直します。

5. 条件の保存: utils.js
ユーザーが「OK」を押した後、Google Sheetsの UserSettings シートに情報が保存されます。


## 5. ユーザー設定の保存
- [ ] クイックリプライを使用してユーザーの好みの条件（カップ数）を取得
- [ ] 取得した条件を UserSettings シートに保存

## 6. スクレイピング機能の実装
- [ ] StoreLists に登録されているデータをスクレイピングするスクリプトを作成
- [ ] スクレイピングしたデータを CurrentCastData シートに保存

## 7. 条件一致の確認と通知
- [ ] ユーザーの設定とスクレイピングしたデータを比較するスクリプトを作成
- [ ] 条件が一致した場合、ユーザーにLINEで通知する機能を実装

## 8. テストとデバッグ
- [ ] 各機能の単体テストを実施
- [ ] 統合テストを実施し、全体の動作を確認
- [ ] バグ修正と最適化

## 9. ドキュメント作成
- [ ] プロジェクトのREADMEを更新し、使用方法や設定方法を記載
- [ ] 各スクリプトのコメントやドキュメントを整備

## 10. デプロイと運用
- [ ] プロジェクトをデプロイし、実際の運用を開始
- [ ] 定期的なメンテナンスとアップデートを計画