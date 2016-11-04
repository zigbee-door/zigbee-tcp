
const cluster = require('cluster')
    , log = require('../log/server.log')
    , os = require('os')
    , clu = require('../constants/cluster.constant');   //clu是cluster的简写


exports.createServer =  () => {

    let s = new Server();
    s.serverInit(); //服务初始化
    s.processRun();  //启动多进程
};

/**
 * describe: Server构造对象
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     none
 */
function Server() {}

/**
 * describe: 服务初始化
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     none
 */
Server.prototype.serverInit =   () => {

    require('../config')();     //mongodb,redis配置初始化
};


/**
 * describe: 启动多进程
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     none
 */
Server.prototype.processRun =  () => {

    if(cluster.isMaster) {                      //主进程
        log.server(clu.master);                 //主进程启动日志

        // let cpus = os.cpus().length;         //MAC OS X默认是4核
        //
        // for(let i=0; i<cpus; i++) {
        //     cluster.fork();                  //开启多个进程
        // }

        cluster.fork();                         //先开一个进程方便调试,最后部署的时候开启多进程

        cluster.on('listening',(worker,addr) => {
            //log.server(clu.master_success,addr.port);
            console.log('cluster master listening...');
        });

        cluster.on('disconnect',(worker,addr) => {
            var worker = cluster.fork();        //一旦子进程挂了,主进程起到了守护进程的作用,重新启动子进程
            log.server(clu.worker_reset,worker);
        });

        cluster.on('exit',(worker) => {
            log.server(clu.master_fail);
        });

    } else {                                    //子进程
        log.server(clu.worker);                 //子进程启动日志

    }
};



Server.prototype.serverRun = () => {

};

