/**
 * node:        index.js
 * data:        16.11.01
 * author:      zhuxiankang
 * describe:    配置初始化
 */

const config = require('./config');
const Redis = require('redis');

module.exports =  () => {

    //连接redis,这里暂时给全局
    global.redis_pub = Redis.createClient(config.redis[process.env.NODE_ENV]);
    global.redis_sub = Redis.createClient(config.redis[process.env.NODE_ENV]);

    if(redis_pub && redis_sub) {
        console.log(`Connect to ${process.env.NODE_ENV} redis_pub and redis_sub success!`)
    }

};
