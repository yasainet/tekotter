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

const sendQuickReplyMessage = (replyToken, text, items) => {
  const message = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: text,
        quickReply: { items: items }
      }
    ]
  };
  UrlFetchApp.fetch(LINE_MESSAGING_API_URL, {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}` },
    method: 'post',
    payload: JSON.stringify(message)
  });
};

const sendTextMessage = (replyToken, text) => {
  const message = {
    replyToken: replyToken,
    messages: [{ type: 'text', text: text }]
  };
  UrlFetchApp.fetch(LINE_MESSAGING_API_URL, {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}` },
    method: 'post',
    payload: JSON.stringify(message)
  });
};

const getCurrentUserSetting = (userId) => {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('UserSettings');
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === userId) {
      return data[i][2];
    }
  }
  return null;
};

const updateUserSetting = (userId, newSetting) => {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('UserSettings');
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === userId) {
      sheet.getRange(i + 1, 3).setValue(newSetting);
      return;
    }
  }
  const timestamp = new Date();
  sheet.appendRow([timestamp, userId, newSetting]);
};