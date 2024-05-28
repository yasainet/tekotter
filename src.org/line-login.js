// ログインリンクを生成する関数
function generateLoginLink() {
  const state = 'random_string'; // ランダムな文字列を生成する方法が推奨されます
  const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LOGIN_CHANNEL_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=profile%20openid`;
  Logger.log(`Generated login link: ${loginUrl}`);
  return loginUrl;
}

// ログインを促すメッセージを送信する関数
function sendLoginPromptMessage(userId) {
  const loginLink = generateLoginLink();
  const message = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: `こんにちは！以下のリンクをクリックしてログインしてください: ${loginLink}`
      }
    ]
  };

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MESSAGING_CHANNEL_ACCESS_TOKEN}`
    },
    payload: JSON.stringify(message)
  };

  try {
    const response = UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', options);
    Logger.log(`Message sent successfully: ${response.getContentText()}`);
  } catch (error) {
    Logger.log(`Error in sendLoginPromptMessage: ${error.message}`);
    Logger.log(`Stack Trace: ${error.stack}`);
  }
}

// 署名を検証する関数
function verifySignature(signature, body) {
  const hash = Utilities.computeHmacSha256Signature(body, LOGIN_CHANNEL_SECRET);
  const base64Hash = Utilities.base64Encode(hash);
  return base64Hash === signature;
}

// ユーザーの選択を受け取る関数
function doPost(e) {
  const signature = e.parameter['x-line-signature'];
  const body = e.postData.contents;

  Logger.log(`Received signature: ${signature}`);
  Logger.log(`Received body: ${body}`);

  if (!verifySignature(signature, body)) {
    Logger.log('Invalid signature');
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid signature' })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    Logger.log('doPost function started');
    const data = JSON.parse(body);
    Logger.log('Received data: ' + JSON.stringify(data)); // 受信したイベントデータをログに出力

    const events = data.events;
    Logger.log('Events: ' + JSON.stringify(events));

    events.forEach(event => {
      Logger.log('Processing event: ' + JSON.stringify(event));
      if (event.type === 'follow') {
        const userId = event.source.userId;
        Logger.log(`Follow event detected for user: ${userId}`); // 友だち追加イベントのログ出力
        sendLoginPromptMessage(userId);
      } else {
        Logger.log(`Event type is not follow: ${event.type}`);
      }
    });

    Logger.log('doPost function completed successfully');
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON).setResponseCode(200);
  } catch (error) {
    Logger.log(`Error in doPost: ${error.message}`);
    Logger.log(`Stack Trace: ${error.stack}`);
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message })).setMimeType(ContentService.MimeType.JSON).setResponseCode(200);
  }
}

function processUserSelection(userId, userMessage) {
  if (userMessage === '指定なし') {
    // 身長の好み確認メッセージを送信
    sendHeightConfirmationMessage(userId, userMessage);
  } else if (userMessage.endsWith('以上') || userMessage.endsWith('以下')) {
    // カップ数の好みを保存
    saveCupUserPreferences(userId, userMessage);
    // カップ数の好み確認メッセージを送信
    sendCupConfirmationMessage(userId, userMessage);
  } else {
    // 身長の好みを保存
    saveHeightUserPreferences(userId, userMessage);
    // 再度身長の好みを指定するクイックリプライメッセージを送信
    sendHeightPreferenceMessage(userId);
  }
}