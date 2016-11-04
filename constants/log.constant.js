
module.exports = {
    //server.log
    master: 'master',                   //主进程
    worker: 'worker',                   //子进程
    //master_success: 'master_success',   //主进程监听成功
    master_exit: 'master_exit',         //主进程退出
    worker_reset: 'worker_reset',       //子进程重启

    //error.log
    uncaught: 'uncaught',               //未捕获异常
    domain: 'domain'                    //socket异常

};