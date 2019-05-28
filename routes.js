// 1. Include config and modules
const config = require('./config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const Auth = require('./controllers/auth.js');
const People = require('./controllers/people.js');
const Coin = require('./pg/coin.js');
const User = require('./models/user');
const Cache = require('./cache');

// 2. Authentication Middleware
function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: 'TokenMissing'
        });
    }
    const token = req.headers.authorization.split(' ')[1];

    let payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).send({
            error: "TokenInvalid"
        });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({
            error: 'TokenExpired'
        });
    }
    // check if the user exists
    User.findById(payload.userId, function (err, person) {
        if (!person) {
            return res.status(404).send({
                error: 'PersonNotFound'
            });
        } else {
            req.user = payload;
            next();
        }
    });
}

// 3. Routes
module.exports = function (app) {
    // 4. Token Health Check Route
    app.get('/hc', ensureAuthenticated, (req, res) => {
        res.json({
            status: 'ok'
        })
    });

    // 5. Authentication Routes
    app.post('/auth/login', Auth.login);
    app.post('/auth/signup', Auth.signup);

    // 6. Application Routes
    app.get('/people', ensureAuthenticated, People.list);
    app.get('/people/page/:page', ensureAuthenticated, People.list);
    app.get('/people/:id', ensureAuthenticated, People.show);
    app.get('/profile', ensureAuthenticated, People.profile);
    // That's kind of wrong to refer to coin, but pg is coin only
    app.get('/get_subs/:username', ensureAuthenticated, Coin.listSubs);
    app.post('/save_subs', ensureAuthenticated, Coin.saveSubs);

    // looks like here should be exhanges request...
    app.post('/list_tickers', ensureAuthenticated, Coin.listTickers);

    app.get('/get_assets', ensureAuthenticated, Coin.list);
    app.get('/get_assets_all', ensureAuthenticated, Coin.listAll);
    app.get('/get_assets_params/:id/:exchange', ensureAuthenticated, Coin.showParams);
    app.get('/get_assets_params/:id/:exchange/all', ensureAuthenticated, Coin.showAllParams);
    app.post('/get_assets_params', ensureAuthenticated, Cache.getAssetsParams);
    app.get('/get_assets_landing', ensureAuthenticated, Cache.getAssetsLanding);
    // same as /get_assets, but also checks v_liquidity_support

    app.post('/weight', ensureAuthenticated, Coin.weight);
};