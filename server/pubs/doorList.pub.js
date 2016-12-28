const tcp = require('../controllers/tcpSend.controller')
    , redis_con = require('../constants/redis.constant');


module.exports = {
    //发布请从基站请求的列表数据给Http服务器
    doorList(redis_data) {
        redis_pub.publish(redis_con.doorList_receive,JSON.stringify(redis_data));   //发送要处理stringify
    }
};
