
const moment = require('moment')
    , base_con = require('../../constants/base.constants')
    , base_pub = require('../../pub/base.pub');

module.exports = {
    /**
     * describe: 添加新连接的socket或更新已断开连接并重新连接的socket
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket
     */
    connect(socket) {
        let list = {
            status: base_con.connect,
            time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };

        redis.hmset(list.ip,list);
        base_pub.base(JSON.stringify(list));

    },

    /**
     * describe: 断开socket连接更新redis数据
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket
     */
    disconnect(socket) {
        let list = {
            status: base_con.disconnect,
            time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };

        redis.hmset(list.ip,list);
    }
};
