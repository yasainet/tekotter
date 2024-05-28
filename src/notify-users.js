function testCompareUserSettingsWithCastData() {
  const notifications = compareUserSettingsWithCastData();
  Logger.log(`Notifications: ${JSON.stringify(notifications)}`);
}


function notifyUsers() {
  const notifications = compareUserSettingsWithCastData();
  const groupedNotifications = groupNotificationsByStore(notifications);

  groupedNotifications.forEach((storeNotification) => {
    const { storeName, casts } = storeNotification;
    let message = `今日の出勤情報が\n更新されたテコッ❗️\n\n${storeName}\n`;

    casts.forEach(cast => {
      const { name, age, height, castCup, schedule } = cast;
      message += `${name}（${age}）\n${height} / ${castCup}カップ\n${schedule}\n\n`;
    });

    // デバッグ用のログ出力
    Logger.log(`Sending message to store: ${storeName}\nMessage: ${message.trim()}`);
    
    // ユーザーIDが正しいか確認
    casts.forEach(cast => {
      const { userId } = cast;
      Logger.log(`Sending message to user: ${userId}`);
      sendLineMessage(userId, message.trim());
    });
  });
}

function groupNotificationsByStore(notifications) {
  const grouped = {};

  notifications.forEach(notification => {
    const { storeName, name, age, height, castCup, schedule, userId } = notification;
    if (!grouped[storeName]) {
      grouped[storeName] = [];
    }
    grouped[storeName].push({ name, age, height, castCup, schedule, userId });
  });

  return Object.keys(grouped).map(storeName => ({
    storeName,
    casts: grouped[storeName]
  }));
}

function sendLineMessage(userId, message) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    to: userId,
    messages: [{ type: 'text', text: message }]
  };

  Logger.log(`Payload: ${JSON.stringify(payload)}`);

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
    },
    method: 'post',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(`Response: ${response.getContentText()}`);
}