const cron = require('node-cron');
const cache = require('./cache')
cache.saveDataCoin();

cron.schedule('*/2 * * * *', cache.saveDataCoin);
