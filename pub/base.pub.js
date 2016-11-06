/**
 * describe: 发布基站连接状态的消息给express
 * data:     16.11.06
 * author:   zhuxiankang
 * parm:     socket
 */

const pub_con = require('../constants/pub.constant');


module.exports = {
    //发布
    base(list) {
        redis.publish(pub_con.base_status,list);
    }

};

