const handleUserSettings = (event) => {
  const replyToken = event.replyToken;
  const userId = event.source.userId;
  const userMessage = event.message.text;
  
  if (userMessage === 'OK👌') {
    // カップ数の選択肢をクイックリプライで送信
    const message = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: 'お好みのカップ数を選択してください。',
          quickReply: {
            items: [
              { type: 'action', action: { type: 'message', label: 'A', text: 'A' } },
              { type: 'action', action: { type: 'message', label: 'B', text: 'B' } },
              { type: 'action', action: { type: 'message', label: 'C', text: 'C' } },
              { type: 'action', action: { type: 'message', label: 'D', text: 'D' } },
              { type: 'action', action: { type: 'message', label: 'E', text: 'E' } },
              { type: 'action', action: { type: 'message', label: 'F', text: 'F' } },
              { type: 'action', action: { type: 'message', label: 'G', text: 'G' } },
              { type: 'action', action: { type: 'message', label: 'H', text: 'H' } }
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
  } else if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(userMessage)) {
    // カップ数選択後に「以上」または「以下」のクイックリプライを送信
    const compareMessage = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: `「${userMessage}カップ」の「以上」または「以下」を選択してください。`,
          quickReply: {
            items: [
              { type: 'action', action: { type: 'message', label: '以上', text: `${userMessage}以上` } },
              { type: 'action', action: { type: 'message', label: '以下', text: `${userMessage}以下` } }
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
      payload: JSON.stringify(compareMessage)
    });
  } else if (userMessage.endsWith('以上') || userMessage.endsWith('以下')) {
    // ユーザーのカップ数設定を保存
    saveUserSetting(userId, userMessage);

    // 確認メッセージを送信
    const confirmMessage = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: `あなたの選択は「${userMessage.replace('以上', 'カップ以上').replace('以下', 'カップ以下')}」です！このまま登録しますか？`,
          quickReply: {
            items: [
              { type: 'action', action: { type: 'message', label: 'OK', text: 'OK' } },
              { type: 'action', action: { type: 'message', label: 'やり直す', text: 'やり直す' } }
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
      payload: JSON.stringify(confirmMessage)
    });
  } else if (userMessage === 'OK') {
    // 最終確認メッセージを送信
    const finalMessage = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: `登録ありがとうございました！毎日12時くらいに出勤情報を通知します🔔`
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
      payload: JSON.stringify(finalMessage)
    });
  } else if (userMessage === 'やり直す') {
    // やり直しの場合、再度カップ数の選択肢を提示
    const retryMessage = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: 'お好みのカップ数を選択してください。',
          quickReply: {
            items: [
              { type: 'action', action: { type: 'message', label: 'A', text: 'A' } },
              { type: 'action', action: { type: 'message', label: 'B', text: 'B' } },
              { type: 'action', action: { type: 'message', label: 'C', text: 'C' } },
              { type: 'action', action: { type: 'message', label: 'D', text: 'D' } },
              { type: 'action', action: { type: 'message', label: 'E', text: 'E' } },
              { type: 'action', action: { type: 'message', label: 'F', text: 'F' } },
              { type: 'action', action: { type: 'message', label: 'G', text: 'G' } },
              { type: 'action', action: { type: 'message', label: 'H', text: 'H' } }
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
      payload: JSON.stringify(retryMessage)
    });
  }
};