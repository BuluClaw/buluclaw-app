const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TOKEN = "8110934422:AAGLFmyryb2BCVns6q9rbSZn8G75SExFscs";

app.post("/webhook", async (req, res) => {

  const message = req.body.message;

  if (message && message.text === "/start") {

    const chatId = message.chat.id;

    console.log("User started bot:", chatId);

    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: "✅ Bot connected successfully!\n\nYour ID: " + chatId
    });

  }

  res.sendStatus(200);

});

app.listen(3001, () => {
  console.log("bot running on 3001");
});