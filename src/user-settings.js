const createCupOptions = () => {
  return [
    { type: 'action', action: { type: 'message', label: 'A', text: 'A' } },
    { type: 'action', action: { type: 'message', label: 'B', text: 'B' } },
    { type: 'action', action: { type: 'message', label: 'C', text: 'C' } },
    { type: 'action', action: { type: 'message', label: 'D', text: 'D' } },
    { type: 'action', action: { type: 'message', label: 'E', text: 'E' } },
    { type: 'action', action: { type: 'message', label: 'F', text: 'F' } },
    { type: 'action', action: { type: 'message', label: 'G', text: 'G' } },
    { type: 'action', action: { type: 'message', label: 'H', text: 'H' } }
  ];
};

const handleUserSettings = (event) => {
  const replyToken = event.replyToken;
  const userId = event.source.userId;
  const userMessage = event.message.text;
  
  if (userMessage === 'OK👌') {
    sendQuickReplyMessage(replyToken, 'お好みのカップ数を選択してください。', createCupOptions());
  } else if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(userMessage)) {
    const items = [
      { type: 'action', action: { type: 'message', label: '以上', text: `${userMessage}以上` } },
      { type: 'action', action: { type: 'message', label: '以下', text: `${userMessage}以下` } }
    ];
    sendQuickReplyMessage(replyToken, `「${userMessage}カップ」の「以上」または「以下」を選択してください。`, items);
  } else if (userMessage.endsWith('以上') || userMessage.endsWith('以下')) {
    updateUserSetting(userId, userMessage);
    const items = [
      { type: 'action', action: { type: 'message', label: 'OK', text: 'OK' } },
      { type: 'action', action: { type: 'message', label: 'やり直す', text: 'やり直す' } }
    ];
    sendQuickReplyMessage(replyToken, `「${userMessage.replace('以上', 'カップ以上').replace('以下', 'カップ以下')}」で、このまま登録しますか？`, items);
  } else if (userMessage === 'OK') {
    sendTextMessage(replyToken, `設定が完了しました！\n\n🔔 毎日12時くらいに出勤情報を通知します\n\n☑️ 条件を編集したい場合は「/edit」と送信してください\n☑ #tekotter で、SNSにぜひシェアしてください`);
  } else if (userMessage === 'やり直す') {
    sendQuickReplyMessage(replyToken, 'お好みのカップ数を選択してください。', createCupOptions());
  } else if (userMessage === '/edit') {
    const currentSetting = getCurrentUserSetting(userId);
    sendQuickReplyMessage(replyToken, `現在の設定は「${currentSetting}」です。編集しますか？`, [
      { type: 'action', action: { type: 'message', label: 'はい', text: 'はい' } },
      { type: 'action', action: { type: 'message', label: 'いいえ', text: 'いいえ' } }
    ]);
  } else if (userMessage === 'はい') {
    sendQuickReplyMessage(replyToken, '新しいカップ数を選択してください。', createCupOptions());
  }
};