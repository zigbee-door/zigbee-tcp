
const path = require('path')
    , file = require('./file')
    , log_con = require('../constants/log.constant')   //clu = cluster
    , moment = require('moment');

module.exports = {

    /**
     * describe: 进程日志
     * data:     16.11.04
     * author:   zhuxiankang
     * parm:     type,worker
     */
    server(type,worker) {
        let time = String(moment().format('YYYY-MM-DD HH:mm:ss')),
            spath = path.join(__dirname,'/server.log.txt'),
            text;

        switch(type) {
            case log_con.master:
                text = `[${time}]: 主进程启动...\r\n`;
                break;
            case log_con.master_exit:
                text = `[${time}]: 主进程退出!\r\n\r\n`;
                break;
            case log_con.worker:
                text = `[${time}]: 子进程启动...\r\n\r\n`;
                break;
            case log_con.worker_reset:
                text = `[${time}]: 子进程重启,重启进程ID: ${worker.process.pid}!\r\n\r\n`;
                break;
            default:
                break;
        }

        file.write(spath,text); //写入文件
    },

    /**
     * describe: 错误日志
     * data:     16.11.04
     * author:   zhuxiankang
     * parm:     type,err
     */
    error(type,err) {
        let time = String(moment().format('YYYY-MM-DD HH:mm:ss')),
            spath = path.join(__dirname,'/error.log.txt'),
            text;

        switch(type) {
            case log_con.uncaught:
                text = `[${time}]: 进程未捕获异常,${err}\r\n`;
                break;
            case log_con.domain:
                text = `[${time}]: socket异常,${err}!\r\n\r\n`;
                break;
            case log_con.worker:
                text = `[${time}]: 子进程启动...\r\n\r\n`;
                break;
            case log_con.worker_reset:
                text = `[${time}]: 子进程重启,重启进程ID: ${worker.process.pid}!\r\n\r\n`;
                break;
            default:
                break;
        }

        file.write(spath,text); //写入文件
    }

};


