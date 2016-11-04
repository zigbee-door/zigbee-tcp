
const path = require('path')
    , file = require('./file')
    , clu = require('../constants/cluster.constant')   //clu = cluster
    , moment = require('moment');




const log = module.exports = {

    server(type,worker) {
        let time = String(moment().format('YYYY-MM-DD HH:mm:ss')),
            spath = path.join(__dirname,'/server.log.txt'),
            text;

        switch(type) {
            case clu.master:
                text = `[${time}]: 主进程启动...\r\n`;
                break;
            case clu.master_fail:
                text = `[${time}]: 主进程退出!\r\n\r\n`;
                break;
            case clu.worker:
                text = `[${time}]: 子进程启动...\r\n\r\n`;
                break;
            case clu.worker_reset:
                text = `[${time}]: 子进程重启,重启进程ID: ${worker.process.pid}!\r\n\r\n`;
                break;
            default:
                break;
        }

        file.write(spath,text); //写入文件
    }

};

