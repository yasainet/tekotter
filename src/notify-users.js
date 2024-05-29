function notifyUsers() {
  const notifications = compareUserSettingsWithCastData();
  const groupedNotifications = groupNotificationsByUser(notifications);

  groupedNotifications.forEach((userNotification) => {
    const { userId, stores } = userNotification;
    let message = `今日の出勤情報が\n更新されたテコッ❗️\n\n`;

    stores.forEach(store => {
      const { storeName, casts } = store;
      message += `${storeName}\n\n`;

      casts.forEach(cast => {
        const { name, age, height, castCup, schedule } = cast;
        message += `${name}（${age}）\n${height} / ${castCup}カップ\n${schedule}\n\n`;
      });
    });

    // デバッグ用のログ出力
    Logger.log(`Sending message to user: ${userId}\nMessage: ${message.trim()}`);
    sendLineMessage(userId, message.trim());
  });
}

function groupNotificationsByUser(notifications) {
  const grouped = {};

  notifications.forEach(notification => {
    const { userId, storeName, name, age, height, castCup, schedule } = notification;
    if (!grouped[userId]) {
      grouped[userId] = { userId, stores: [] };
    }

    let store = grouped[userId].stores.find(store => store.storeName === storeName);
    if (!store) {
      store = { storeName, casts: [] };
      grouped[userId].stores.push(store);
    }

    store.casts.push({ name, age, height, castCup, schedule });
  });

  return Object.keys(grouped).map(userId => grouped[userId]);
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