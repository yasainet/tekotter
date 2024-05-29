function FetchAndSaveCastData() {
  const storeIds = getStoreIds(); // StoreLists シートから storeId を取得
  const headers = {}; // 必要に応じてヘッダーを設定
  const delay = 3000; // 遅延時間

  const result = fetchCastDataWithDelay(storeIds, headers, delay);
  Logger.log(result);
}

function getStoreIds() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('StoreLists');
  const storeIds = sheet.getRange('B2:B' + sheet.getLastRow()).getValues().flat();
  return storeIds.filter(id => id); // 空の値を除外
}

function fetchCastData(storeId, headers = {}) {
  Logger.log(`Starting fetchCastData for store ID: ${storeId}`);
  if (!storeId) {
    Logger.log(`storeId is undefined or null`);
    return { storeId, height: null, cup: null, name: null, age: null, schedule: null };
  }
  const url = `https://fujoho.jp/index.php?p=shop_info&id=${storeId}`;
  Logger.log(`Fetching URL: ${url}`);
  try {
    const html = fetchHtmlContent(url, headers);
    if (!html) {
      throw new Error('Failed to fetch HTML content');
    }
    Logger.log(`HTML content fetched: ${html.length} characters`);
    const parsedData = parseCastData(html);
    Logger.log(`Parsed data: ${JSON.stringify(parsedData)}`);
    saveData(storeId, parsedData); // データを保存
    return { storeId, data: parsedData };
  } catch (e) {
    Logger.log(`Error fetching data for store ID ${storeId}: ${e.message}`);
    return { storeId, height: null, cup: null, name: null, age: null, schedule: null };
  }
}

function fetchHtmlContent(url, headers = {}) {
  try {
    const options = headers ? { 'headers': headers } : {};
    const response = UrlFetchApp.fetch(url, options);
    const html = response.getContentText();
    return html;
  } catch (e) {
    Logger.log(`Error fetching URL ${url}: ${e.message}`);
    return null;
  }
}

function fetchCastDataWithDelay(storeIds, headers = {}, delay = 3000) {
  clearSheetData(); // データをクリア

  const storeData = [];
  for (let i = 0; i < storeIds.length; i++) {
    const storeId = storeIds[i];
    const data = fetchCastData(storeId, headers);
    if (data && data.data) {
      storeData.push(data);
    }
    Utilities.sleep(Math.random() * delay + 2000); // 2秒から遅延までのランダム遅延
  }
  return storeData;
}