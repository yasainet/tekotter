// ユーザーの身長の好みを保存する関数
function saveHeightUserPreferences(userId, heightPreference) {
  try {
    const timestamp = new Date();
    const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')).getSheetByName('UserPreferences');

    // 既存のエントリを検索
    const data = sheet.getDataRange().getValues();
    let userRow = null;

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === userId) {
        userRow = i + 1; // シートの行番号は1から始まるため、インデックスに1を加える
        break;
      }
    }

    // 既存のエントリがある場合は更新、ない場合は新規エントリを追加
    if (userRow) {
      sheet.getRange(userRow, 1, 1, 4).setValues([[timestamp, userId, heightPreference, data[i][3]]]);
    } else {
      sheet.appendRow([timestamp, userId, heightPreference, null]);
    }
  } catch (error) {
    Logger.log(`Error in saveHeightUserPreferences: ${error.message}`);
    // 必要に応じて、エラー通知を管理者に送信する機能を追加
  }
}

// ユーザーのカップ数の好みを保存する関数
function saveCupUserPreferences(userId, cupPreference) {
  try {
    const timestamp = new Date();
    const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')).getSheetByName('UserPreferences');

    // 既存のエントリを検索
    const data = sheet.getDataRange().getValues();
    let userRow = null;

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === userId) {
        userRow = i + 1; // シートの行番号は1から始まるため、インデックスに1を加える
        break;
      }
    }

    // 既存のエントリがある場合は更新、ない場合は新規エントリを追加
    if (userRow) {
      sheet.getRange(userRow, 1, 1, 4).setValues([[timestamp, userId, data[i][2], cupPreference]]);
    } else {
      sheet.appendRow([timestamp, userId, null, cupPreference]);
    }
  } catch (error) {
    Logger.log(`Error in saveCupUserPreferences: ${error.message}`);
    // 必要に応じて、エラー通知を管理者に送信する機能を追加
  }
}