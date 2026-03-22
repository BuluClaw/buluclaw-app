const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TOKEN = "YAHAN_APNA_BOT_TOKEN_DALO";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

function generateCode(){
  return Math.random().toString(36).substring(2,10).toUpperCase();
}

app.post("/webhook", async (req,res)=>{
  const msg = req.body.message;

  if(!msg) return res.sendStatus(200);

  const chatId = msg.chat.id;

  const code = generateCode();

  const text = `
Clawbot: access not configured.

Your Telegram user id: ${chatId}

Pairing code: ${code}

Ask the bot owner to approve with:
clawbot pairing approve telegram ${code}
`;

  await axios.post(`${TELEGRAM_API}/sendMessage`,{
    chat_id: chatId,
    text
  });

  res.sendStatus(200);
});

app.get("/", (req,res)=>{
  res.send("telegram bot running");
});

app.listen(3001, ()=>{
  console.log("bot running on 3001");
});