const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
const CHANNEL_SECRET = PropertiesService.getScriptProperties().getProperty('CHANNEL_SECRET');
const LINE_MESSAGING_API_URL = 'https://api.line.me/v2/bot/message/reply';