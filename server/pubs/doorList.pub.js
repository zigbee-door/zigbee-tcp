const tcp = require('../controllers/tcpSend.controller')
    , redis_con = require('../constants/redis.constant');


module.exports = {
    //发布请从基站请求的列表数据给Http服务器
    doorList(redis_data) {
        //console.log(JSON.stringify(redis_data));
        //{"baseIP":"10.8.208.222","cmd":1,"doorId":{"type":"Buffer","data":[0,0]},"data":{"type":"Buffer","data":[88,11,219,17]}}
        redis_pub.publish(redis_con.doorList_receive,JSON.stringify(redis_data));   //发送要处理stringify
    }
};
