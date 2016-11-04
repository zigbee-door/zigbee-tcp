
const cluster = require('cluster')
    , log = require('../log/log')
    , os = require('os')
    , log_con = require('../constants/log.constant');


exports.createServer =  () => {

    let s = new Server();
    s.serverInit();         //服务初始化
    s.processRun(s);        //开启多进程并使用子进程启动tcp服务
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
 * parm:     s
 */
Server.prototype.processRun =  (s) => {



    if(cluster.isMaster) {                      //主进程
        log.server(log_con.master);             //主进程启动日志

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
            let work = cluster.fork();          //一旦子进程挂了,主进程起到了守护进程的作用,重新启动子进程
            log.server(log_con.worker_reset,work);
        });

        cluster.on('exit',(worker) => {
            log.server(log_con.master_exit);
        });

    } else {                                    //子进程
        log.server(log_con.worker);             //子进程启动日志
        s.serverRun();                          //启动tcp服务
    }
};

/**
 * describe: 启动tcp服务
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     none
 */
Server.prototype.serverRun = () => {
    const net = require('net')
        , server = net.createServer()           //创建tcp服务器
        , domain = require('domain');

    //进程未捕获异常
    process.on("uncaughtException",function(err){
        log.error(log_con.uncaught,err);        //异常日志
    });

    //socket连接(这里可以连接多个socket,每个socket对象都是一个基站连接实例)
    server.on('connection', (socket) => {
        let d = domain.create();                //捕捉socket异常

        d.on('error', err => {
            log.error(log_con.domain,err);      //异常日志

        });

        d.add(socket);                          //绑定socket到domain


    });


    //tcp服务器端口监听
    server.listen(4003, () => {
        console.log("Tcp server listening on port 4003!");

        //所有客户端的连接都已经结束，否则不会触发
        server.on('close', () => {
            console.log('Server Terminated');
        });

        //服务错误
        server.on('error',function(err){
            console.log('Server Error:', JSON.stringify(err));
        });
    })


};


