/**
 * describe: 基站连接数据存储和发布
 * data:     16.11.07
 * author:   zhuxiankang
 * parm:     none
 */

const moment = require('moment')
    , co = require('co')
    , mongoose = require('mongoose')
    , mongo_con = require('../constants/mongo.constant')
    , base_pub = require('../pubs/base.pub.js');

module.exports = {
    /**
     * describe: 添加新连接的socket或更新已断开连接并重新连接的socket
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket
     */
    connect(socket) {
        let Base = mongoose.model(mongo_con.Base);

        let base = {
            status: mongo_con.connect,
            time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };

        // redis.hmset(list.ip,list);
        co(function* () {                           //mongo数据库存储,此时消耗性能没关系
            let result = yield Base.findOne({ip:base.ip});

            if(result) {    //更新数据
                result.status = base.status;
                result.time = base.time;
                yield result.save();
            } else {
                yield Base.create(base);
            }
        });

        base_pub.base(JSON.stringify(base));        //redis发布

    },

    /**
     * describe: 断开socket连接更新redis数据
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket
     */
    disconnect(socket) {
        let Base = mongoose.model(mongo_con.Base);

        let base = {
            status: mongo_con.disconnect,
            time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };

        // redis.hmset(list.ip,list);

        co(function* () {                           //数据库存储,此时消耗性能没关系
            let result = yield Base.findOne({ip:base.ip});

            if(result) {    //更新数据
                result.status = base.status;
                result.time = base.time;
                yield result.save();
            } else {
                //错误日志
            }
        });

        base_pub.base(JSON.stringify(base));        //redis发布

    }
};
