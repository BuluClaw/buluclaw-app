const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {

  const message = req.body.message;

  if (message && message.text === "/start") {

    const chatId = message.chat.id;

    console.log("User started bot:", chatId);

  }

  res.sendStatus(200);

});

app.listen(3001, () => {
  console.log("bot running on 3001");
});