const Router = require('koa-router');
const api = require('../modules/api');

async function tryQuery(ctx, callback) {
  try {
    await callback();
  } catch(err) {
    ctx.status = err.response.statusCode;
    ctx.body = err.response.body;
  }
}

const router = new Router();
router
  // Аутентификация
  .post('/login', async (ctx) => {
    const { body } = ctx.request;
    const username = body && body.username || '';
    const password = body && body.password || '';

    await tryQuery(ctx, async () => {
      ctx.body = await api.login(username, password);
    });
  })

  // Информация о данном устройстве из лога, предшествующего заданному моменту времени.
  .get('/info/prev/:mac/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getDeviceInfo(token, true, mac, timestamp);
    });
  })

  // Информация о данном устройстве в заданный момент времени.
  .get('/info/:mac/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getDeviceInfo(token, false, mac, timestamp);
    });
  })

  // Общее количество устройств в базе.
  .get('/info/totalDevices', async (ctx) => {
    const { token = null } = ctx.request.headers;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getTotalDevicesInfo(token);
    });
  })

  // Общий список устройств с названием модели, версией прошивки и MAC-адресом.
  .get('/info/firmware', async (ctx) => {
    const { token = null } = ctx.request.headers;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getFirmwareInfo(token);
    });
  })

  // Информация об активных днях устройства.
  .get('/activeday/:mac', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getActiveDay(token, mac);
    });
  })

  // Количество отчетов пришедших в последний час.
  .get('/logs/lasthour/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getLastHourLogs(token, timestamp);
    });
  })

  // Информация о предыдущем логе.
  .get('/logs/info/prev/:mac/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getLogInfo(token, 'prev', mac, timestamp);
    });
  })

  // Информация о следующем логе.
  .get('/logs/info/next/:mac/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getLogInfo(token, 'next', mac, timestamp);
    });
  })

  // Список timestamp'ов, в которые прилетали логи от устройства за указанный день.
  .get('/logs/timestamps/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      ctx.body = await api.getTimestampsLogs(token, mac, day, month, year);
    });
  })

  // Список логов, прилетевших от устройства за указанный день.
  .get('/logs/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Информация о предыдущем событии.
  .get('/events/info/prev/:mac/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Список timestamp'ов, в которые прилетали логи событий от устройства за указанный день.
  .get('/events/timestamps/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Список всех IP-адресов в базе.
  .get('/ips', async (ctx) => {
    const { token = null } = ctx.request.headers;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Список всех MAC-адресов в базе.
  .get('/macs', async (ctx) => {
    const { token = null } = ctx.request.headers;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Список MAC-адресов по заданным IP.
  .get('/macs/ip/:ip', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { ip } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Список MAC-адресов, приславших логи после заданного момента времени.
  .get('/macs/avail/:timestamp', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { timestamp } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Минимальный и максимальный timestamp для данного MAC-адреса.
  .get('/timerange/:mac', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  // Получение информации по дням:
  .get('/wan/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/lan/:port/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { port, mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/summary/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/wifi/:freq/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { freq, mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/info/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/wifi/clients/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  })

  .get('/system/:mac/:day/:month/:year', async (ctx) => {
    const { token = null } = ctx.request.headers;
    const { mac, day, month, year } = ctx.params;
    await tryQuery(ctx, async() => {
      // ctx.body = await api.;
    });
  });

module.exports = router;
