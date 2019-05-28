const {
    clientRedis
} = require('./redis');
const Coin = require('./pg/coin')
const cacheName = 'paramsLanding';

exports.getAssetsLanding = async (req, res) => {
    try {
        let data = await clientRedis.hgetall(cacheName);
        let keys = Object.keys(data);
        let answer = [];
        for (keys in data) {
            await answer.push(JSON.parse(data[keys]));
        }
        return res.status(200).json(answer)
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

exports.getAssetsParams = async (req, res) => {
    try {
        let assets = req.body.assets;
        let answer = [];
        for (let i = 0; i < assets.length; i++) {
            let landing = await clientRedis.hget(cacheName, assets[i]);
            await answer.push(JSON.parse(landing))
        }
        return res.status(200).json(answer)
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

exports.saveDataCoin = async () => {
    try {
        let paramsLanding = await Coin.showAllParamsLanding();
        let idsParamsLanding = [];
        let oldParamsLanding = await clientRedis.hgetall(cacheName);
        let oldIdsParamsLanding = [];

        if (oldParamsLanding) {
            oldIdsParamsLanding = Object.keys(oldParamsLanding)
        }

        for (let i = 0; i < paramsLanding.length; i++) {
            await clientRedis.hset(cacheName, paramsLanding[i].coin_id, JSON.stringify(paramsLanding[i]))
            idsParamsLanding.push(paramsLanding[i].coin_id.toString());
        }

        for (let i = 0; i < oldIdsParamsLanding.length; i++) {
            if (!idsParamsLanding.includes(oldIdsParamsLanding[i])) {
                await clientRedis.hdel(cacheName, oldIdsParamsLanding[i]);
            }
        }
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}