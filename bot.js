const mineflayer = require('mineflayer');
const { SocksProxyAgent } = require('socks-proxy-agent');

// ТВОЙ SOCKS5 прокси
const proxy = 'socks5://JkmtNe:SqDC6m@213.139.223.211:9584';

// Настройки сервера и аккаунта
const server = 'play.funtime.su';
const username = 'Chuckleoop'; // ник

function startBot() {
  const bot = mineflayer.createBot({
    host: server,
    username: username,
    version: '1.16.5',
    agent: new SocksProxyAgent(proxy)
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function botCycle() {
    try {
      console.log('✅ Бот зашёл на сервер');

      bot.chat('/an215');
      console.log('📩 Бот написал: /an215');
      await sleep(2000);

      bot.chat('/home home');
      console.log('📩 Бот написал: /home home');

      // Повороты головы
      const headInterval = setInterval(() => {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * 0.5;
        bot.look(yaw, pitch, true);
      }, 5000);

      console.log('⏱ Ждём 4 минуты с лёгкой активностью...');
      await sleep(240000);

      clearInterval(headInterval);

      bot.chat('/hub');
      console.log('📩 Бот написал: /hub');

      await sleep(7000);
      console.log('🔄 Повторяем цикл...');
      botCycle();

    } catch (err) {
      console.log('❌ Ошибка в цикле:', err.message);
    }
  }

  // Когда бот зашёл — запускаем цикл
  bot.once('spawn', botCycle);

  // Если бот был кикнут — выводим причину
  bot.on('kicked', (reason) => {
    console.log('❌ Бот был кикнут. raw reason:', reason);
  });

  // Ошибки
  bot.on('error', (err) => {
    console.log('❌ Ошибка:', err.message);
  });

  // Если бот вылетел — перезапуск
  bot.on('end', () => {
    console.log('🚪 Бот отключился. Перезапуск через 10 секунд...');
    setTimeout(() => {
      startBot();
    }, 10000);
  });
}

startBot();
