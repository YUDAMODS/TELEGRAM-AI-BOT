const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const TELEGRAM_BOT_TOKEN = '7169148449:AAFogjpEeT72NPq4X7rmxQqtJa4wbvBPrXo';
const API_KEY = 'yudamodz'; // Ganti dengan API key Anda

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

let actor = `my name is yudamods, my hobby reading`;

bot.start((ctx) => ctx.reply('Hello! Silakan bertanya.'));

bot.on('text', async (ctx) => {
  let userMessage = ctx.message.text;

  let messages = [{
    role: 'user',
    content: userMessage
  }, {
    role: 'assistant',
    content: 'hello'
  }];

  let response = await fetch('https://skizo.tech/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY
    },
    body: JSON.stringify({
      messages,
      system: actor
    })
  });

  let data = await response.json();
  let assistantMessage = data.messages[0].content;

  switch (data.messages[0].role) {
    case 'user':
      ctx.reply(assistantMessage);
      break;
    // Anda bisa menambahkan case lain jika diperlukan
    default:
      // Default action
      break;
  }
});

bot.launch();
