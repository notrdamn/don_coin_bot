const { Bot, InlineKeyboard } = require('grammy');

// Замени 'YOUR_TOKEN' на токен от @BotFather
const bot = new Bot('7061836491:AAFE5ab1um0Y5Nf9zn74MbQOOEEBSCVYlQE');

// Кнопки для игры
const gameKeyboard = new InlineKeyboard()
  .text('Орел', 'heads')
  .text('Решка', 'tails');

// Команда /start
bot.command('start', async (ctx) => {
  await ctx.reply(
    '🎲 *Игра "Орел и Решка"*\n\n' +
    'Правила:\n' +
    '1. Нажми /play\n' +
    '2. Выбери "Орел" или "Решка"\n' +
    '3. Я подброшу монетку и скажу результат!\n\n' +
    'Начнем? Пиши /play',
    { parse_mode: 'Markdown' }
  );
});

// Команда /play
bot.command('play', async (ctx) => {
  await ctx.reply('Выбирай:', { reply_markup: gameKeyboard });
});

// Обработка ставок
bot.on('callback_query:data', async (ctx) => {
  const choice = ctx.callbackQuery.data;
  const result = Math.random() < 0.5 ? 'heads' : 'tails'; // Рандомный результат
  const isWin = choice === result;

  // Формируем ответ
  const message = `Твой выбор: ${choice === 'heads' ? 'Орел' : 'Решка'}\n` +
                 `Монетка крутится...\n\n` +
                 `🎯 Результат: **${result === 'heads' ? 'Орел' : 'Решка'}**\n` +
                 `${isWin ? '🎉 Ты выиграл!' : '😢 Не повезло...'}\n\n` +
                 'Сыграем еще? /play';

  await ctx.editMessageText(message, { parse_mode: 'Markdown' });
  await ctx.answerCallbackQuery();
});

// Запуск бота
bot.start();
console.log('Бот запущен! 🚀');