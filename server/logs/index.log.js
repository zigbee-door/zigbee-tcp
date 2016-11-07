
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
    process(type,worker) {
        let time = String(moment().format('YYYY-MM-DD HH:mm:ss')),
            spath = path.join(__dirname,'/txt/process.log.txt'),
            text;

        switch(type) {
            case log_con.master:
                text = `[${time}]: 主进程启动...\r\n`;
                break;
            case log_con.master_success:
                text = `[${time}]: 主进程启动监听tcp服务,监听的tcp服务端口号为${worker}...\r\n`;
                break;
            case log_con.master_exit:
                text = `[${time}]: 主进程退出!\r\n`;
                break;
            case log_con.worker:
                text = `[${time}]: 子进程启动...\r\n`;
                break;
            case log_con.worker_reset:
                text = `[${time}]: 子进程重启,重启进程ID: ${worker.process.pid}!\r\n`;
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
            spath = path.join(__dirname,'/txt/error.log.txt'),
            text;

        switch(type) {
            case log_con.uncaught:
                text = `[${time}]: 进程未捕获异常,${err}\r\n`;
                break;
            case log_con.domain:
                text = `[${time}]: socket异常,${err}!\r\n`;
                break;
            case log_con.server:
                text = `[${time}]: tcp服务异常,${err}\r\n`;
                break;
            case log_con.worker_reset:
                text = `[${time}]: 子进程重启,重启进程ID: ${worker.process.pid}!\r\n`;
                break;
            default:
                break;
        }

        file.write(spath,text); //写入文件
    },

    /**
     * describe: tcp服务日志
     * data:     16.11.04
     * author:   zhuxiankang
     * parm:     type,port
     */
    server(type,port) {
        let time = String(moment().format('YYYY-MM-DD HH:mm:ss')),
            spath = path.join(__dirname,'/txt/server.log.txt'),
            text;

        switch(type) {
            case log_con.server_start:
                text = `[${time}]: tcp服务启动,监听端口${port}...\r\n`;
                break;
            case log_con.server_stop:
                text = `[${time}]: tcp服务停止监听,端口${port}...\r\n`;
                break;
            default:
                break;
        }

        file.write(spath,text); //写入文件

    }





};


