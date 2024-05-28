const doPost = (e) => {
  const event = JSON.parse(e.postData.contents).events[0];
  
  if (event.type === 'follow') {
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    
    // ウェルカムメッセージとクイックリプライの送信
    const message = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: '友だち追加ありがとうございます！\n\ntekotter は、都内有名店の出勤情報をお届けします。\n「OK👌」を押して、条件を指定してください！',
          quickReply: {
            items: [
              {
                type: 'action',
                action: {
                  type: 'message',
                  label: 'OK👌',
                  text: 'OK👌'
                }
              }
            ]
          }
        }
      ]
    };
    
    // LINE Messaging API へのリクエスト
    UrlFetchApp.fetch(LINE_MESSAGING_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
      },
      method: 'post',
      payload: JSON.stringify(message)
    });
    
    // ユーザー識別子を UserProfiles シートに保存
    saveUserProfile(userId);
  } else if (event.type === 'message') {
    handleUserSettings(event); // user-settings.js の関数を呼び出す
  }
};