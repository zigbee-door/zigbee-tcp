
module.exports = {
    //process.log
    master: 'master',                   //主进程
    worker: 'worker',                   //子进程
    master_success: 'master_success',   //主进程监听tcp成功
    master_exit: 'master_exit',         //主进程退出
    worker_reset: 'worker_reset',       //子进程重启

    //error.log
    uncaught: 'uncaught',               //未捕获异常
    domain: 'domain',                   //socket异常
    server: 'server',                   //tcp服务错误

    //server.log
    server_start: 'server_start',       //tcp服务启动
    server_stop: 'server_stop'          //tcp服务停止

};