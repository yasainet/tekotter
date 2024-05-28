// クイックリプライメッセージを送信する共通関数
function sendQuickReplyMessage(userId, text, quickReplyItems) {
  try {
    const message = {
      to: userId,
      messages: [
        {
          type: 'text',
          text: text,
          quickReply: {
            items: quickReplyItems
          }
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

    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', options);
  } catch (error) {
    Logger.log(`Error in sendQuickReplyMessage: ${error.message}`);
  }
}

// 身長の好みを指定するクイックリプライメッセージを送信する関数
function sendHeightPreferenceQuickReply(userId) {
  const text = '身長の好みを指定してください。「指定なし」を選択するまで、繰り返し質問を行います。';
  const quickReplyItems = [
    {
      type: 'action',
      action: {
        type: 'message',
        label: '~ 149cm',
        text: '~ 149cm'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '150cm ~ 159cm',
        text: '150cm ~ 159cm'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '160cm ~ 169cm',
        text: '160cm ~ 169cm'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '170cm~',
        text: '170cm~'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '指定なし',
        text: '指定なし'
      }
    }
  ];

  sendQuickReplyMessage(userId, text, quickReplyItems);
}

// 身長の好み確認メッセージを送信する関数
function sendHeightConfirmationQuickReply(userId, selectedHeight) {
  const text = `通知される条件は 身長 ${selectedHeight} で問題ありませんか？`;
  const quickReplyItems = [
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'OK',
        text: 'OK'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'やり直し',
        text: 'やり直し'
      }
    }
  ];

  sendQuickReplyMessage(userId, text, quickReplyItems);
}

// カップ数の好みを指定するクイックリプライメッセージを送信する関数
function sendCupPreferenceQuickReply(userId) {
  const text = 'カップ数の好みを指定してください。選択したカップ数を起点に、「以上」「以下」を選択します。';
  const quickReplyItems = [
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'A',
        text: 'A'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'B',
        text: 'B'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'C',
        text: 'C'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'D',
        text: 'D'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'E',
        text: 'E'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'F',
        text: 'F'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'G',
        text: 'G'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'H',
        text: 'H'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '指定なし',
        text: '指定なし'
      }
    }
  ];

  sendQuickReplyMessage(userId, text, quickReplyItems);
}

// カップ数の「以上」「以下」を指定するクイックリプライメッセージを送信する関数
function sendCupRangeQuickReply(userId, selectedCup) {
  const text = `選択したカップ数 ${selectedCup} を起点に、「以上」または「以下」を選択してください。`;
  const quickReplyItems = [
    {
      type: 'action',
      action: {
        type: 'message',
        label: '以上',
        text: `${selectedCup}以上`
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: '以下',
        text: `${selectedCup}以下`
      }
    }
  ];

  sendQuickReplyMessage(userId, text, quickReplyItems);
}

// カップ数の好み確認メッセージを送信する関数
function sendCupConfirmationQuickReply(userId, selectedCupRange) {
  const text = `通知される条件は ${selectedCupRange} で問題ありませんか？`;
  const quickReplyItems = [
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'OK',
        text: 'OK'
      }
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'やり直し',
        text: 'やり直し'
      }
    }
  ];

  sendQuickReplyMessage(userId, text, quickReplyItems);
}