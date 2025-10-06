// === Minecraft Bot с рабочим SOCKS5 прокси ===

const mineflayer = require('mineflayer');
const { ProxyAgent } = require('minecraft-proxy-agent');

// Функция запуска бота
function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.funtime.su', // IP сервера
    port: 25565,             // Порт (обычно 25565)
    username: 'Chuckleoop',  // Ник бота
    version: '1.16.5',       // Версия сервера
    agent: new ProxyAgent({  // Настройки прокси
      protocol: 'socks5',
      host: '213.139.223.211', // IP прокси
      port: 9584,               // Порт прокси
      username: 'JkmtNe',       // Логин от прокси
      password: 'SqDC6m'        // Пароль от прокси
    })
  });

  // ===== События для отладки =====

  bot.on('login', () => {
    console.log('✅ Бот успешно вошёл на сервер!');
  });

  bot.on('spawn', () => {
    console.log('🌍 Бот появился в мире!');
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Бот был кикнут. raw reason:', reason);
    try {
      const parsed = JSON.parse(reason);
      console.log('📣 Текст причины:', parsed);
    } catch {
      console.log('📣 Текст причины (обычный):', reason);
    }
  });

  bot.on('error', (err) => {
    console.log('⚠️ Ошибка подключения:', err);
  });

  bot.on('end', () => {
    console.log('🚪 Бот отключился. Перезапуск через 10 секунд...');
    setTimeout(startBot, 10000);
  });
}

// Запуск бота
startBot();
