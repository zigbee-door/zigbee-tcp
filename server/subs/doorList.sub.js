const tcp = require('../controllers/tcpSend.controller')
    , redis_con = require('../constants/redis.constant');

module.exports = (socketList) => {
    /*redis订阅http的命令请求*/
    redis_sub.subscribe(redis_con.doorList);   //订阅doorList.html页面业务doorList频道

    redis_sub.on('message', (channel,msg) => {

        switch(channel) {
            case redis_con.doorList:
                tcp.send(socketList,JSON.parse(msg));   //需要将http发送过来的数据转化为对象
                break;

            default:
                break;
        }
    });
};

