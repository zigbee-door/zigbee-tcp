/**
 * describe: 发布基站连接状态的消息给express
 * data:     16.11.06
 * author:   zhuxiankang
 * parm:     socket
 */

const redis_con = require('../constants/redis.constant');


module.exports = {
    //发布
    base(list) {
        redis_pub.publish(redis_con.index,list);
    }
};

