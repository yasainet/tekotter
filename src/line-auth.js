/* デバッグ用関数
function logToSheet(message) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Log');
  sheet.appendRow([new Date(), message]);
}
*/

function doGet(e) {
  const lineLoginUrl = 'https://access.line.me/oauth2/v2.1/login';
  const clientId = CLIENT_ID;
  const redirectUri = encodeURIComponent(REDIRECT_URI);
  const state = STATE;
  const scope = encodeURIComponent('profile openid');
  const returnUri = encodeURIComponent(`/oauth2/v2.1/authorize/consent?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`);
  const loginChannelId = clientId;
  const loginState = Utilities.getUuid(); // 動的に生成

  const url = `${lineLoginUrl}?returnUri=${returnUri}&loginChannelId=${loginChannelId}&loginState=${loginState}`;
  logToSheet(`Generated URL: ${url}`); // URLをスプレッドシートにログ出力
  return HtmlService.createHtmlOutput(`<a href="${url}" target="_blank">Login with LINE</a>`);
}

function doPost(e) {
  logToSheet('doPost called'); // doPost 関数が呼び出されたことをログに出力
  try {
    const code = e.parameter.code;
    logToSheet(`Authorization code: ${code}`); // 認可コードをスプレッドシートにログ出力

    const tokenUrl = 'https://api.line.me/oauth2/v2.1/token';
    const clientId = CLIENT_ID;
    const clientSecret = CLIENT_SECRET;
    const redirectUri = REDIRECT_URI;

    const payload = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    };

    const options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true // エラーレスポンスを取得するために追加
    };

    const response = UrlFetchApp.fetch(tokenUrl, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    logToSheet(`Response code: ${responseCode}`); // レスポンスコードをスプレッドシートにログ出力
    logToSheet(`Response text: ${responseText}`); // レスポンステキストをスプレッドシートにログ出力

    if (responseCode !== 200) {
      throw new Error(`Request failed with response code ${responseCode}`);
    }

    const tokenData = JSON.parse(responseText);
    logToSheet(`Token data: ${JSON.stringify(tokenData)}`); // トークンデータをスプレッドシートにログ出力

    const userInfoUrl = 'https://api.line.me/v2/profile';
    const userInfoOptions = {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    };

    const userInfoResponse = UrlFetchApp.fetch(userInfoUrl, userInfoOptions);
    const userInfo = JSON.parse(userInfoResponse.getContentText());
    logToSheet(`User Info: ${JSON.stringify(userInfo)}`); // ユーザー情報をスプレッドシートにログ出力

    saveUserProfile(userInfo);

    return HtmlService.createHtmlOutput('Login successful');
  } catch (error) {
    logToSheet(`Error: ${error.toString()}`);
    return HtmlService.createHtmlOutput('Login failed');
  }
}

function saveUserProfile(userInfo) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('UserProfiles');
  sheet.appendRow([new Date(), userInfo.userId, userInfo.displayName]);
  logToSheet(`User Info saved: ${JSON.stringify({ userId: userInfo.userId, displayName: userInfo.displayName })}`);
}