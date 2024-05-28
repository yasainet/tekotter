function testCompareUserSettingsWithCastData() {
  const notifications = compareUserSettingsWithCastData();
  Logger.log(`Notifications: ${JSON.stringify(notifications)}`);
}

function compareUserSettingsWithCastData(batchSize = 100) {
  const userSettingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('UserSettings');
  const castDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CurrentCastData');
  
  // 2行目から最終行までのデータを取得
  const userSettingsRange = userSettingsSheet.getRange(2, 1, userSettingsSheet.getLastRow() - 1, userSettingsSheet.getLastColumn());
  const userSettings = userSettingsRange.getValues();
  
  const castDataRange = castDataSheet.getRange(2, 1, castDataSheet.getLastRow() - 1, castDataSheet.getLastColumn());
  const castData = castDataRange.getValues();

  Logger.log(`User settings count: ${userSettings.length}`);
  Logger.log(`Cast data count: ${castData.length}`);

  const notifications = [];
  const totalBatches = Math.ceil(userSettings.length / batchSize);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const start = batchIndex * batchSize;
    const end = Math.min(start + batchSize, userSettings.length);
    const userSettingsBatch = userSettings.slice(start, end);

    Logger.log(`Processing batch ${batchIndex + 1}/${totalBatches}`);

    userSettingsBatch.forEach((userSetting, userIndex) => {
      const [timestamp, userId, cupSetting] = userSetting;
      const [cup, condition] = cupSetting.split(/(以上|以下)/);

      const filteredCastData = castData.filter(cast => {
        const [castTimestamp, storeId, name, age, height, castCup, schedule] = cast;
        return (condition === '以上' && castCup >= cup) || (condition === '以下' && castCup <= cup);
      });

      filteredCastData.forEach((cast, castIndex) => {
        const [castTimestamp, storeId, name, age, height, castCup, schedule] = cast;
        const storeName = getStoreNameById(storeId);
        notifications.push({ userId, storeName, name, age, height, castCup, schedule });
      });
    });
  }

  Logger.log(`Notifications generated: ${notifications.length}`);
  return notifications;
}