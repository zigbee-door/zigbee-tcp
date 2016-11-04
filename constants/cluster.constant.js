
module.exports = {
    master: 'master',                   //主进程
    worker: 'worker',                   //子进程
    //master_success: 'master_success',   //主进程监听成功
    master_fail: 'master_fail',         //主进程退出
    worker_reset: 'worker_reset'        //子进程重启
};