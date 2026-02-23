import express from "express";
import { Telegraf } from "telegraf";
import axios from "axios";

const app = express();
app.use(express.json());

let bots = {};

// START BOT
app.post("/start-bot", async (req, res) => {
  const { token, userId } = req.body;

  try {
    if (bots[userId]) {
      return res.json({ message: "Bot already running" });
    }

    const bot = new Telegraf(token);

    bot.on("text", async (ctx) => {
      try {
        const response = await axios.post(process.env.PIPELINE_URL, {
          userId,
          message: ctx.message.text,
        });

        await ctx.reply(response.data.output);
      } catch (err) {
        console.error("Pipeline error:", err);
        await ctx.reply("⚠️ Something went wrong.");
      }
    });

    await bot.launch();
    bots[userId] = bot;

    console.log("Bot started for:", userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Start error:", error);
    res.status(500).json({ error: "Failed to start bot" });
  }
});

// STOP BOT
app.post("/stop-bot", async (req, res) => {
  const { userId } = req.body;

  try {
    if (!bots[userId]) {
      return res.json({ message: "Bot not running" });
    }

    bots[userId].stop();
    delete bots[userId];

    console.log("Bot stopped for:", userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Stop error:", error);
    res.status(500).json({ error: "Failed to stop bot" });
  }
});

// SERVER
app.listen(3000, () => console.log("Worker running on port 3000"));