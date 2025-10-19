// Simple MEGA user bot test
// Only thing to edit: BOT_TOKEN and MEGA_URL

const WebSocket = require('ws');

// ✅ Put your test token here
const BOT_TOKEN = 'PASTE_YOUR_TEST_TOKEN_HERE'; 

// ✅ Put your Master Bot URL here
const MEGA_URL = 'ws://localhost:3000'; // or your deployed URL, e.g., wss://yourapp.vercel.app

const ws = new WebSocket(`${MEGA_URL}/bot/${BOT_TOKEN}`);

ws.on('open', () => {
  console.log('✅ Connected to Master Bot');
});

ws.on('message', (data) => {
  try {
    const msg = JSON.parse(data);
    console.log(`📝 From ${msg.userId}: ${msg.message}`);

    let reply = '';
    // small test commands
    if(msg.message.toLowerCase() === 'hello') reply = 'Hi! I am your test bot 🤖';
    else if(msg.message.toLowerCase() === 'pic') reply = 'Here is a picture: 🖼️';
    else reply = `You said: "${msg.message}"`;

    ws.send(JSON.stringify({
      userId: msg.userId,
      message: reply,
      type: 'text'
    }));

  } catch(e){
    console.log('Error parsing message:', data.toString());
  }
});

ws.on('close', () => console.log('❌ Disconnected from Master Bot'));
ws.on('error', err => console.log('❌ WebSocket error:', err));
