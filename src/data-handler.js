function clearSheetData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CurrentCastData');
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }
}

function saveData(storeId, data) {
  const timestamp = new Date().toISOString();
  const rows = data.map(item => ({
    Timestamp: timestamp,
    StoreId: storeId,
    Name: item.name,
    Age: item.age,
    Height: item.height,
    Cup: item.cup,
    Schedule: item.schedule
  }));

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CurrentCastData');
  const lastRow = sheet.getLastRow();
  const csvData = rows.map(row => [
    row.Timestamp, row.StoreId, row.Name, row.Age, row.Height, row.Cup, row.Schedule
  ]);

  sheet.getRange(lastRow + 1, 1, csvData.length, csvData[0].length).setValues(csvData);
}

function getStoreNameById(storeId) {
  const storeListsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('StoreLists');
  const storeData = storeListsSheet.getDataRange().getValues();
  const storeMap = {};

  storeData.forEach(row => {
    const [storeName, id] = row;
    storeMap[id] = storeName;
  });

  return storeMap[storeId] || 'Unknown Store';
}