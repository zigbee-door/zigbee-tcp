
const cluster = require('cluster')
    , os = require('os')
    , log = require('./logs/index.log')                 //日志操作
    , log_con = require('./constants/log.constant')     //日志常量
    , base =  require('./controllers/base.controller'); //基站操作

exports.createServer =  () => {
    let s = new Server();
    s.serverInit();         //服务初始化
    //这里最终开启，这里先屏蔽
    //s.processRun(s);        //开启多进程并使用子进程启动tcp服务
    s.serverRun();          //启动tcp服务,最终打开上面那个，这里因为多进程捕捉了错误，所以错误容易被掩盖

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
    require('../config/index.config')();     //mongodb,redis配置初始化
};


/**
 * describe: 启动多进程
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     s
 */
Server.prototype.processRun =  (s) => {

    if(cluster.isMaster) {                      //主进程
        log.process(log_con.master);            //主进程启动日志


        //这里最终开启，这里先屏蔽
        // let cpus = os.cpus().length;         //MAC OS X默认是4核
        //
        // for(let i=0; i<cpus; i++) {
        //     cluster.fork();                  //开启多个进程
        // }

        cluster.fork();                         //先开一个进程方便调试,最后部署的时候开启多进程

        cluster.on('listening',(worker,addr) => {
            //log.server(clu.master_success,addr.port);
            //console.log('cluster master listening...');
            log.process(log_con.master_success,addr.port);
        });

        cluster.on('disconnect',(worker,addr) => {
            let work = cluster.fork();          //一旦子进程挂了,主进程起到了守护进程的作用,重新启动子进程
            log.process(log_con.worker_reset,work);
        });

        cluster.on('exit',(worker) => {
            log.process(log_con.master_exit);
        });

    } else {                                    //子进程
        log.process(log_con.worker);            //子进程启动日志
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
        , server = net.createServer()
        , domain = require('domain')
        , socketList = {}               //临时的socket列表对象
        , tcp = require('./controllers/tcpReceive.controller');

    //这里最终开启，这里先屏蔽

    /*大部分未知异常处理，包括程序异常*/
    // process.on("uncaughtException",(err) => {
    //     log.error(log_con.uncaught,err);        //进程未捕获异常日志
    // });

    /*有基站连接tcp服务器*/
    server.on('connection', (socket) => {

        //这里最终开启，这里先屏蔽

        // let d = domain.create();                 //捕捉socket异常
        //
        // d.on('error', err => {
        //     log.error(log_con.domain,err);      //异常日志
        //
        // });
        //
        // d.add(socket);                          //绑定socket到domain

        //console.log(socket.remoteFamily);     //ipv6
        //ip = socket.remoteAddress.slice(7);   //获取ipv4地址

        base.connect(socket,socketList);                   //添加或更新连接的基站(socket)到列表



        /*Socket超时触发*/
        socket.setTimeout(60000,() => {        //暂时设置1min,5分钟判断一次
            //console.log('111');
        });     //先设置5分钟，最终可以使用下面的注释方法

        //基站每隔1s会给一个心跳包，表明基站还活着
        //如果套接字处于非活动状态时，服务器发出超时事件之前会等待的时间是3s

        socket.on('timeout',function(){
            base.disconnect(socket,socketList);            //更新mongo断开socket连接
            socket.end();                       //超时断开
            if(!socket.destroy){
                socket.destroy();
            }
        });


        /*发送FIN包关闭Socket连接*/
        socket.on('end',() => {                     //这算是正常关闭
            base.disconnect(socket,socketList);     //更新redis断开socket连接
            socket.end();                           //该事件触发的是客户端的end事件
            if(!socket.destroy){
                socket.destroy();
            }
        });

        /*接受基站发送的数据帧时触发*/
        socket.on('data',function(tcp_data){
            let redis_data = {};
            redis_data.baseIP = socket.remoteAddress.slice(7);
            //console.log(data);
            tcp.receive(tcp_data,redis_data);
            //handler.handler['receiveData'].handler(socket,data);
        });


        /*关闭Socket连接时触发*/
        socket.on('close', () => {              //这算是非正常关闭,例如直接网线断开连接?
            base.disconnect(socket,socketList);            //更新redis断开socket连接
            socket.end();
        });

        /*错误处理*/
        socket.on('error',function(){
            base.disconnect(socket,socketList);            //更新mongo断开socket连接
            socket.end();
            if(!socket.destroy){
                socket.destroy();
            }
        });
    });


    /*tcp服务器端口监听*/
    server.listen(4003, () => {                 //tcp服务器端口监听

        log.server(log_con.server_start,4003);

        server.on('close', () => {              //所有客户端的连接都已经结束，服务器关闭时触发
            log.server(log_con.server_stop,4003);
        });


        server.on('error',(err) => {            //服务错误
            log.error(log_con.server,err);
        });
    });


    /*sub订阅*/
    require('./subs/doorList.sub')(socketList);     //订阅doorList页面信息

};


