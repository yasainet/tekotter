function saveUserProfile(userInfo) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('UserProfiles');
  sheet.appendRow([new Date(), userInfo.userId, userInfo.displayName]);
}