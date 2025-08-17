import { Telegraf } from "telegraf"; 
import fetch from "node-fetch";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply("Salom! Men aqlli Laylo botman 🤖👩. Savolingizni yozing."));

bot.on("text", async (ctx) => { 
  const userText = ctx.message.text;
  try { 
    const response = await fetch("https://api.openai.com/v1/chat/completions", { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${OPENAI_API_KEY}`, 
      }, 
      body: JSON.stringify({ 
        model: "gpt-4o-mini", 
        messages: [ 
          { role: "system", content: "Sen ayol qiyofasidagi samimiy yordamchi bot bo‘l." }, 
          { role: "user", content: userText }, 
        ], 
      }), 
    }); 
    const data = await response.json();   
    const reply = data.choices?.[0]?.message?.content || "Javob topa olmadim 😅";   
    await ctx.reply(reply);   
  } catch (err) { 
    console.error(err); 
    await ctx.reply("Xatolik yuz berdi ❗️"); 
  } 
});

bot.launch();
