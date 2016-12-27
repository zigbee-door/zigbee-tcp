/**
 * describe: redis发布和订阅常量
 * data:     16.11.06
 * author:   zhuxiankang
 * parm:     none
 */

module.exports = {
    //index.html
    index: 'index',            //基站连接状态, index频道, 首先由tcp -> http发起
    //doorList.html
    doorList:  'doorList'       //获取门锁关联列表, doorList频道, 首先由http -> tcp发起
};



