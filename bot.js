const mineflayer = require('mineflayer');
const { SocksProxyAgent } = require('socks-proxy-agent');

function startBot() {
  let bot = mineflayer.createBot({
    host: 'play.funtime.su',
    username: 'Chuckleoop',
    version: '1.16.5',
    agent: new SocksProxyAgent('socks5://JkmtNe:SqDC6m@213.139.223.211:9584')
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

      // Мотаем головой каждые 5 секунд
      const headInterval = setInterval(() => {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * 0.5;
        bot.look(yaw, pitch, true);
      }, 5000);

      console.log('⏱ Ждём 4 минуты с лёгкой активностью (только повороты головы)');
      await sleep(240000); // 4 минуты

      clearInterval(headInterval);

      bot.chat('/hub');
      console.log('📩 Бот написал: /hub');

      await sleep(7000); // задержка перед повтором
      console.log('🔄 Повторяем цикл');
      botCycle(); // повтор

    } catch (err) {
      console.log('❌ Ошибка в цикле:', err.message);
    }
  }

  bot.once('spawn', () => {
    botCycle();
  });

  bot.on('end', () => {
    console.log('🚪 Бот отключился. Перезапуск через 10 секунд...');
    setTimeout(() => {
      startBot(); // создаём нового бота
    }, 10000);
  });

  bot.on('error', (err) => {
    console.log('❌ Ошибка:', err.message);
  });
}

startBot();

