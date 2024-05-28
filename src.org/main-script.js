function executeRunCastData() {
  try {
    const storeIds = fetchStoreIds();
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    };
    const storeData = fetchCastDataWithDelay(storeIds, headers, 5000);
    saveCastData(storeData);
  } catch (error) {
    Logger.log(`Error in executeRunCastData: ${error.message}`);
  }
}

function fetchStoreIds() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('StoreLists');
    const data = sheet.getDataRange().getValues();
    return data.slice(1).map(row => row[2]);
  } catch (error) {
    Logger.log(`Error in fetchStoreIds: ${error.message}`);
    return [];
  }
}

function fetchCastDataWithDelay(storeIds, headers, delay) {
  const storeData = [];
  for (const storeId of storeIds) {
    try {
      const data = fetchCastData(storeId, headers);
      storeData.push(data);
      Utilities.sleep(delay); // 指定された遅延時間を待機
    } catch (error) {
      Logger.log(`Error in fetchCastDataWithDelay for storeId ${storeId}: ${error.message}`);
    }
  }
  return storeData;
}

function fetchCastData(storeId, headers) {
  try {
    const url = `https://fujoho.jp/index.php?p=shop_info&id=${storeId}`;
    const response = UrlFetchApp.fetch(url, { headers });
    const contentType = response.getHeaders()['Content-Type'];

    if (contentType && contentType.includes('application/json')) {
      return JSON.parse(response.getContentText());
    } else {
      // HTMLをパースするロジックを追加
      const html = response.getContentText();
      const castData = parseCastData(html);
      return castData.map(data => ({ ...data, storeId }));
    }
  } catch (error) {
    Logger.log(`Error in fetchCastData for storeId ${storeId}: ${error.message}`);
    return null;
  }
}

function saveCastData(storeData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('CastData')
    sheet.clear();
    sheet.appendRow(['StoreId', 'Name', 'Age', 'Height', 'Cup']);
    for (const dataArray of storeData) {
      for (const data of dataArray) {
        if (data) {
          Logger.log(`Saving data: ${JSON.stringify(data)}`);
          sheet.appendRow([data.storeId, data.name, data.age, data.height, data.cup]);
        }
      }
    }
  } catch (error) {
    Logger.log(`Error in saveCastData: ${error.message}`);
  }
}