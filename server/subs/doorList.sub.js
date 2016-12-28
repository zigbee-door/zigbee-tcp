const tcp = require('../controllers/tcpSend.controller')
    , redis_con = require('../constants/redis.constant');

module.exports = (socketList) => {
    /*redis订阅http的命令请求*/
    redis_sub.subscribe(redis_con.doorList_send);   //订阅doorList.html页面发送命令的doorList频道

    redis_sub.on('message', (channel,redis_data) => {

        switch(channel) {
            //doorList.html向基站寻取关联列表数据
            case redis_con.doorList_send:
                tcp.send(socketList,JSON.parse(redis_data));   //需要将http发送过来的数据转化为对象
                break;

            default:
                break;
        }
    });
};

