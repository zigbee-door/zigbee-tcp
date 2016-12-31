/**
 * describe: 基站连接数据存储和发布
 * data:     16.11.07
 * author:   zhuxiankang
 * parm:     none
 */

const moment = require('moment')
    , co = require('co')
    , mongo_con = require('../constants/mongo.constant')
    , base_pub = require('../pubs/base.pub.js');

module.exports = {

    /**
     * describe: 添加新连接的socket或更新已断开连接并重新连接的socket
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket -> 连接的socket对象
     *           socketList -> socket列表
     */
    connect(socket,socketList) {

        let redis_data = {
            status: mongo_con.connect,
            //time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };


        // //这里手动填充一下
        // switch(base.ip) {
        //     case '10.8.208.222':
        //         base.panId = '0xFFF1';
        //         break;
        //     case '10.8.208.111':
        //         base.panId = '0xFFF2';
        //         break;
        // }

        /*临时变量存储*/
        if(!socketList[socket.remoteAddress.slice(7)]) {   //如果变量列表不存在该socket，加入socket列表对象
            socketList[socket.remoteAddress.slice(7)] = socket;
        }

        // // redis.hmset(list.ip,list);
        // co(function* () {                           //mongo数据库存储,此时消耗性能没关系
        //     let result = yield Base.findOne({ip:base.ip});
        //
        //     if(result) {    //更新数据
        //         result.status = base.status;
        //         result.time = base.time;
        //         yield result.save();
        //     } else {
        //         yield Base.create(base);
        //     }
        // });

        base_pub.base(JSON.stringify(redis_data));        //redis发布

    },

    /**
     * describe: 断开socket连接更新redis数据
     * data:     16.11.06
     * author:   zhuxiankang
     * parm:     socket -> 连接的socket对象
     *           socketList -> socket列表
     */
    disconnect(socket,socketList) {

        let redis_data = {
            status: mongo_con.disconnect,
            //time: String(moment().format('YYYY-MM-DD HH:mm:ss')),
            ip: socket.remoteAddress.slice(7)
        };


        /*临时变量删除*/
        if(socketList[socket.remoteAddress.slice(7)]) {         //如果对象的属性存在，则删除
            delete socketList[socket.remoteAddress.slice(7)];
        }

        // redis.hmset(list.ip,list);

        // co(function* () {                           //数据库存储,此时消耗性能没关系
        //     let result = yield Base.findOne({ip:base.ip});
        //
        //     if(result) {    //更新数据
        //         result.status = base.status;
        //         result.time = base.time;
        //         yield result.save();
        //     } else {
        //         //错误日志
        //     }
        // });

        base_pub.base(JSON.stringify(redis_data));        //redis发布

    }
};
