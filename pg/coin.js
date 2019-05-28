const { Pool } = require('pg')
const config = require('../config');

const pool = new Pool({
  connectionString: config.POSTGRES_URI
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err.stack)
  process.exit(-1)
})

const paramFields = [
  { name: 'asset_price', query: 'vconper.current_usd' },
  { name: 'token_supply', query: 'cmdr.supply' },
  { name: 'market_cap_usd', query: 'vconper.marketcap_usd' },
  { name: 'volume_24', query: 'vconper.last24h_volume' },
  { name: 'asset_price_old', query: 'cmdrold.close_usd' },
  { name: 'mc_rank', query: 'cda.mc_rank' },
  // { name: 'price_change_24', query: 'vcp.day_usd_change' },
  { name: 'price_change_24', query: 'vcp.day_usd_change' },
  { name: 'week_usd_change', query: 'vcp.week_usd_change' },
  { name: 'mayer_multiple_usd', query: 'vcp.mayer_multiple_usd' },
  { name: 'volume_24', query: '	vconper.last24h_volume' },
  { name: 'volume_24_old', query: 'cmdrold.vol_usd' },
  { name: 'volume_change_24', query: 'vcp.day_vol_change' },
  { name: 'market_cap', query: 'vconper.marketcap_usd' },
  { name: 'ath', query: 'cda.usd_ath' },
  { name: 'atl', query: 'cda.usd_atl' },
  { name: 'days_ath_usd', query: 'cda.days_ath_usd' },
  { name: 'current_div_ath_usd', query: 'cda.current_div_ath_usd' },
  { name: 'days_atl_usd', query: 'cda.days_atl_usd' },
  { name: 'atl_div_current_usd', query: 'cda.atl_div_current_usd' },

  { name: 'buy_support_1', query: 'vls.buy_support_1' },
  { name: 'buy_support_2', query: 'vls.buy_support_2' },
  { name: 'buy_support_3', query: 'vls.buy_support_3' },
  { name: 'buy_support_4', query: 'vls.buy_support_4' },
  { name: 'buy_support_5', query: 'vls.buy_support_5' },
  { name: 'buy_support_10', query: 'vls.buy_support_10' },
  { name: 'buy_support_15', query: 'vls.buy_support_15' },
  { name: 'sell_support_1', query: 'vls.sell_support_1' },
  { name: 'sell_support_2', query: 'vls.sell_support_2' },
  { name: 'sell_support_3', query: 'vls.sell_support_3' },
  { name: 'sell_support_4', query: 'vls.sell_support_4' },
  { name: 'sell_support_5', query: 'vls.sell_support_5' },
  { name: 'sell_support_10', query: 'vls.sell_support_10' },
  { name: 'sell_support_15', query: 'vls.sell_support_15' },
  { name: 'buy_div_sell_10', query: 'vls.buy_div_sell_10' },
  { name: 'buy_div_sell_5', query: 'vls.buy_div_sell_5' },
  { name: 'buy_10_div_mcap', query: 'vls.buy_10_div_mcap' },
  { name: 'amir_liquidity_metric', query: 'vls.amir_liquidity_metric' },
  { name: 'andrey_liquidity_metric', query: 'vls.andrey_liquidity_metric' },


  { name: 'social_hipe_24', query: 'ccsh.tw_followers' },
  { name: 'ta_rating', query: 'vcts.coin_ta_final' },
  { name: 'dev_hipe_24', query: 'ccsh.code_rep_subscribers' },
  { name: 'twitter_list', query: 'ccsh.tw_lists' },
  { name: 'twitter_favorites', query: 'ccsh.tw_fav' },
  { name: 'twitter_following', query: 'ccsh.tw_following' },
  { name: 'twitter_status', query: 'ccsh.tw_statuses' },
  { name: 'twitter_followers', query: 'ccsh.tw_followers' },
  { name: 'reddit_active_users', query: 'ccsh.red_active_users' },
  { name: 'reddit_posts_daily', query: 'ccsh.red_posts_daily' },
  { name: 'reddit_comments_daily', query: 'ccsh.red_comments_daily' },
  { name: 'reddit_subscribers', query: 'ccsh.red_subs' },
  { name: 'github_closed_issues', query: 'ccsh.code_rep_closed_issues' },
  { name: 'github_open_pull_issues', query: 'ccsh.code_rep_open_pull_issues' },
  { name: 'github_closed_pull_issues', query: 'ccsh.code_rep_closed_pull_issues' },
  { name: 'github_forks', query: 'ccsh.code_rep_forks' },
  { name: 'github_subscribers', query: 'ccsh.code_rep_subscribers' },
  { name: 'github_stars', query: 'ccsh.code_rep_stars' },

  { name: 'ta_score', query: 'vcts.coin_ta_final' },
  { name: 'volatility_30_usd', query: 'vai.volatility_30_usd' },
  { name: 'volatility_60_usd', query: 'vai.volatility_60_usd' },
  { name: 'volatility_120_usd', query: 'vai.volatility_120_usd' },
  { name: 'volatility_year_usd', query: 'vai.volatility_1y_usd' },
  { name: 'last30_div_past30_usd', query: 'vai.last30_div_past30_usd' },
  { name: 'last60_div_past60_usd', query: 'vai.last60_div_past60_usd' },
  { name: 'last120_div_past120_usd', query: 'vai.last120_div_past120_usd' },
  { name: 'lastyear_div_pastyear_usd', query: 'vai.lastyear_div_pastyear_usd' },
]

const weightFields = [
  { name: 'vol_7_days_un_trusted', query: 'vcp.vol_7d_untrusted' },
  // { name: 'vol_7_days_trusted', query: 'vcp.vol_7d_trusted' },
  { name: 'market_cap', query: 'cmdr.close_usd' },
  { name: 'liquidity_buy_sell_10', query: 'vls.buy_sell_10' },
  { name: 'liquidity_buy_5', query: 'vls.buy_support_5' },
  // { name: 'distance_ath', query: 'cda.distance_ath' },
  // { name: 'distance_atl', query: 'cda.distance_atl' },
]

const getSqlString = (funcSql, fields = [], params = [], all = true) => {
  let stringFields = ''
  if(all) {
    stringFields = fields.map(field => field.query + " as " + field.name).join(', ')
  } else {
    stringFields = fields
      .filter(field => params.includes(field.name))
      .map(field => field.query + " as " + field.name)
      .join(', ')
  }

  stringFields = stringFields !== '' ? ', ' + stringFields : stringFields

  return funcSql(stringFields, params)
}

const funcSqlWeight = (string = '', ids) => {
  return 'SELECT DISTINCT ON(c.coin_id) c.coin_id, c.full_name, c.img_url ' + string +
    ' FROM cc_coins as c ' +
    'LEFT JOIN v_coin_performance vcp using (coin_id) ' +
    'LEFT JOIN v_coin_ta_scores vcts using (coin_id) ' +
    'LEFT JOIN cc_coin_market_data_real cmdr using (coin_id) ' +
    'LEFT JOIN v_coin_performance vconper using (coin_id) ' +
    'LEFT JOIN v_liquidity_support vls using (coin_id) ' +
    'LEFT JOIN v_dtra_athatl cda using (coin_id) ' +
    'WHERE coin_id IN ( ' + ids.join(',') + ' )';
}

const funcSqlParams = (string = '', ids) => {
  return 'SELECT c.coin_id, c.coin_title, c.coin_symbol, c.full_name ' + string +
    ' FROM cc_coins as c ' +
    'LEFT JOIN cc_coin_market_data_real cmdr using (coin_id) ' +
    'LEFT JOIN v_coin_performance vcp using (coin_id) ' +
    'LEFT JOIN v_coin_ta_scores vcts using (coin_id) ' +
    'LEFT JOIN v_avg_indicators vai using (coin_id) ' +
    'LEFT JOIN v_dtra_athatl cda using (coin_id) ' +
    'LEFT JOIN v_liquidity_support vls using (coin_id) ' +
    'LEFT JOIN cc_coin_social_hist ccsh using (coin_id) ' +
    'LEFT JOIN v_coin_performance vconper using (coin_id) ' +
    'WHERE coin_id = $1'
}

const funcSqlParamsAll = (string = '', ids) => {
  const current =  Number.parseInt(new Date().getTime() / 1000);
  const ago = current - 24 * 60 * 60;
  const oldago = current - 48 * 60 * 60;
  const q = 'SELECT DISTINCT ON (c.coin_id) c.coin_id, c.coin_title, c.coin_symbol, c.full_name, c.img_url ' + string +
    ' FROM cc_coins as c ' +
    'LEFT JOIN cc_coin_market_data_real cmdr using (coin_id) ' +
    'LEFT JOIN v_coin_performance vcp using (coin_id) ' +
    'LEFT JOIN (SELECT DISTINCT ON (coin_id) * FROM cc_coin_market_data_real WHERE dt <= to_timestamp(' +
    ago + ') AND dt >= to_timestamp(' + oldago + ')) cmdrold using (coin_id) ' +
    'LEFT JOIN v_dtra_athatl cda using (coin_id) ' +
    'LEFT JOIN v_liquidity_support vls using (coin_id) ' +
    'LEFT JOIN cc_coin_social_hist ccsh using (coin_id) ' +
    'LEFT JOIN v_avg_indicators vai using (coin_id) ' +
    'LEFT JOIN mv_coin_ta_scores vcts using (coin_id) ' +
    'LEFT JOIN v_coin_performance vconper using (coin_id) ' +
    'WHERE c.dtra_active=true';
    // 'WHERE coin_id in (' + ids.join(',') + ')';
  return q;
}

const funcSqlParamsMany = (string = '', ids) => {
  const current =  Number.parseInt(new Date().getTime() / 1000);
  const ago = current - 24 * 60 * 60;
  const oldago = current - 48 * 60 * 60;
  const q = 'SELECT DISTINCT ON (c.coin_id) c.coin_id, c.coin_title, c.coin_symbol, c.full_name, c.img_url ' + string +
    ' FROM cc_coins as c ' +
    'LEFT JOIN cc_coin_market_data_real cmdr using (coin_id) ' +
    'LEFT JOIN v_coin_performance vcp using (coin_id) ' +
    'LEFT JOIN v_coin_ta_scores vcts using (coin_id) ' +
    'LEFT JOIN v_avg_indicators vai using (coin_id) ' +
    'LEFT JOIN (SELECT DISTINCT ON (coin_id) * FROM cc_coin_market_data_real WHERE dt <= to_timestamp(' +
    ago + ') AND dt >= to_timestamp(' + oldago + ')) cmdrold using (coin_id) ' +
    'LEFT JOIN v_dtra_athatl cda using (coin_id) ' +
    'LEFT JOIN v_liquidity_support vls using (coin_id) ' +
    'LEFT JOIN (SELECT * FROM cc_coin_social_hist where dt=(SELECT MAX(dt) FROM cc_coin_social_hist)) ccsh using (coin_id) ' +
    'WHERE coin_id in (' + ids.join(',') + ')';
  return q;
}

exports.weight = (req, res) => {
  const data = req.body.assets;
  delete req.body.assets;
  let dataValid = data.every(coin => coin !== undefined)
  if (!dataValid) {
    return res.status(422).json({
      error: 'Coin id not found'
    });
  }
  const ids = [...new Set((data.map(coin => +coin)))]
  if (ids.includes(NaN)) {
    return res.status(422).json({
      error: 'Coin id not number'
    });
  }

  if(data.length !== ids.length) {
    return res.status(422).json({
      error: 'error data'
    });
  }
  let sum = 0;
  for(let prop in req.body) {
    sum += +req.body[prop];
  }
  for(let prop in req.body) {
    req.body[prop] = req.body[prop] / sum;
  }
  const weightProperties = req.body;

  pool.connect((err, client, done) => {
    if (err) throw err

    client.query(getSqlString(funcSqlWeight, weightFields, ids))
      .catch(err => {
        done()
        return res.status(500).json({
          error: err.stack
        });
      })
      .then(result => {
        const maxProperties = result.rows.reduce((prev, next) => {
          let acc = {}
          for (let prop in next) {
            if(prop !== 'coin_id') {
              acc[prop] = prev[prop] > next[prop] ? prev[prop] : next[prop];
            }
          }
          return acc
        });
        return result.rows.map(row => {
          row.total_calculated_weight = calculateWeight(row, weightProperties, maxProperties)
          return row
        });
      })
      .then(result => {
        done()
        console.log(result);
        return res.status(200).json(result);
      });
  });
};

const calculateWeight = (row, weightRow, total) => {
  let weightData = [];
  for (let prop in row) {
    if(prop !== 'coin_id') {
      weightData.push(((weightRow[prop] ? weightRow[prop] : 0) * 100 * row[prop]) / total[prop])
    }
  }
  return weightData.reduce((total, n) => total + n)
}

exports.showParams = (req, res) => {
  let params = req.query.param ? req.query.param.split(',') : [];
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query(getSqlString(funcSqlParams, paramFields, params, false), [req.params.id], (err, result) => {
      done()

      if (err) {
        return res.status(500).json({
          error: err.stack
        });
      } else {
        return res.status(200).json(result.rows[0]);
      }
    })
  })
}

exports.showAllParams = (req, res) => {

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query(getSqlString(funcSqlParams, paramFields), [req.params.id], (err, result) => {
      done()

      if (err) {
        return res.status(500).json({
          error: err.stack
        })
      } else {
        return res.status(200).json(result.rows[0])
      }
    })
  })
}

exports.showAllParamsMany = (req, res) => {

  let q = '';
  Array.from(req.body.assets).forEach(asset => {
    q += `${asset},`;
  });
  q = q.substr(0, q.length-2);

  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(getSqlString(funcSqlParamsMany, paramFields, Array.from(req.body.assets)), (err, result) => {
      done()

      if (err) {
        return res.status(500).json({
          error: err.stack
        })
      } else {
        return res.status(200).json(result.rows)
      }
    })
  })
}

exports.showAllParamsLanding = async ()=>{
  try {
    var idArray = [];
    let client = await pool.connect();
    let result = await client.query(getSqlString(funcSqlParamsAll, paramFields, idArray))
    await client.release()
    return result.rows;
  } catch (error) {
    throw error;
   }
}

exports.list = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT coin_id, coin_title, coin_symbol, full_name, img_url FROM cc_coins WHERE dtra_active=true AND default_coin=true', (err, result) => {
      done()

      if (err) {
        return res.status(500).json({
          error: err.stack
        });
      } else {
        return res.status(200).json(result.rows);
      }
    })
  })
}

exports.listAll = (req, res) => {

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT coin_id, coin_title, coin_symbol, full_name, img_url, dtra_active, dtra_candidate FROM cc_coins', (err, result) => {
      done()

      if (err) {
        return res.status(500).json({
          error: err.stack
        });
      } else {
        return res.status(200).json(result.rows);
      }
    })
  })
}

exports.changeActivity = (req, res) => {

  pool.connect((err, client, done) => {
    if(err) throw err;
    const coins = req.body.toChange;
    const updated = coins.map(coin => coin.coin_id).join(',');
    client.query(`UPDATE cc_coins SET dtra_candidate = NOT dtra_candidate WHERE coin_id IN (${updated})`, (err, result) => {
      done();

      if(err) {
        console.log(err);
        return res.status(500).json({
          error: 'can not process query'
        });
      }
      return res.status(200).json({
        error: null
      });
    });
  });
}

exports.listGroups = (req, res) => {
  pool.connect((err, client, done) => {
    if(err) throw err;
    client.query(`SELECT * FROM cc_groups`, (err, result) => {
      done();

      if(err) {
        console.log(err);
        return res.status(500).json({
          error: 'can not process query'
        });
      }
      return res.status(200).json(result.rows);
    });
  });
}

exports.listSubs = (req, res) => {
  pool.connect((err, client, done) => {
    if(err) throw err;
    client.query(`SELECT * FROM subscribers_daily_report WHERE username='${req.params.username}'`, (err, result) => {
      done();

      if(err) {
        console.log(err);
        return res.status(500).json({
          error: 'can not process query'
        });
      }
      return res.status(200).json(result.rows);
    });
  });
}

exports.saveSubs = (req, res) => {
  const id = req.body.id;
  const email = req.body.username;
  const nemail = req.body.subs_daily_report_email;
  const nsignal = req.body.subs_daily_report_signal;
  const number = req.body.mobile_number;

  pool.connect((err, client, done) => {
    if(err) throw err;
    client.query(`SELECT 1 FROM subscribers_daily_report WHERE username='${email}'`, (err, result) => {
      if(err) return res.status(500).json({
        error: 'can not process query'
      });
      if(result.rowCount === 0) {
        client.query(`INSERT INTO subscribers_daily_report(username, subs_daily_report_email, subs_daily_report_signal, mobile_number) VALUES ('${email}', ${nemail}, ${nsignal}, '${number}')`, (err, result) => {
          done();

          if(err) {
            console.log(err);
            return res.status(500).json({
              error: 'can not process query'
            });
          }
          return res.status(200).json({
            error: null
          });
        });
      } else {
        client.query(`UPDATE subscribers_daily_report SET username='${email}', subs_daily_report_email=${nemail}, subs_daily_report_signal=${nsignal}, mobile_number='${number}' WHERE id=${id}`, (err, result) => {
          done();

          if(err) {
            console.log(err);
            return res.status(500).json({
              error: 'can not process query'
            });
          }
          return res.status(200).json({
            error: null
          });
        });
      }
    });
  });
}

exports.listTickers = (req, res) => {
  pool.connect((err, client, done) => {
    if(err) throw err;
    const wtd = req.body.wtd;
    const asset = req.body.asset;
    const back = req.body.back;
    const amount = req.body.amount;
    client.query(`select * from v_dtra_ob_tickers where b_sym in ('${asset}','${back}') and q_sym in ('${asset}','${back}') and ticker_id in (select ticker_id from cc_tickers_orderbook)`, (err, result) => {
      done();

      if(err) {
        console.log(err);
        return res.status(500).json({
          error: 'can not process query'
        });
      }
      return res.status(200).json(result.rows);
    });
  });
}
