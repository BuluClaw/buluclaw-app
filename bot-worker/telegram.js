const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TOKEN = "8110934422:AAGLFmyryb2BCVns6q9rbSZn8G75SExFscs";

// random pairing code generator
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

app.post("/webhook", async (req, res) => {

  const message = req.body.message;

  if (message && message.text === "/start") {

    const chatId = message.chat.id;
    const code = generateCode();

    console.log("PAIR:", chatId, code);

    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: chatId,
      text:
`OpenClaw: access not configured

Your Telegram user id: ${chatId}

Pairing code: ${code}

Paste this code in dashboard to connect.`
    });

  }

  res.sendStatus(200);

});

app.listen(3001, () => {
  console.log("bot running on 3001");
});