const saveUserProfile = (userId) => {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('UserProfiles');
  const timestamp = new Date();
  sheet.appendRow([timestamp, userId, '']);
};

const saveUserSetting = (userId, cupSetting) => {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('UserSettings');
  const timestamp = new Date();
  sheet.appendRow([timestamp, userId, cupSetting]);
};
