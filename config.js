module.exports = {
    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb://10.156.0.5/apijwt',

    // 2. Postgres
    POSTGRES_URI: process.env.POSTGRES_URI || 'postgresql://dev:x9grNclSPjcXHV61IC25z@35.246.178.108:5432/cc_x',
    // POSTGRES_URI: process.env.POSTGRES_URI || 'postgresql://cc_coins:secret@localhost:5432/postgres',

    // 3. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

    // 4. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 3000,

    //5. Redis host
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1'
};
