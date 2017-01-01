/**
 * describe: redis发布和订阅常量
 * data:     16.11.06
 * author:   zhuxiankang
 * parm:     none
 */

module.exports = {
    //index.html
    index: 'index',                         //基站连接状态, index频道, 首先由tcp -> http发起
    //doorList.html
    doorList_send:  'doorList_send',        //http服务发起，发送获取门锁关联列表命令, doorList_send频道
    doorList_receive: 'doorList_receive',   //tcp服务发起, 接收来自基站的数据后发送给http服务, doorList_recieve频道


    //时间戳
    timetamp: 'timetamp',
    timetampValue: 1000                     //暂时1s存入一次时间戳

};



