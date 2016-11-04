'use strict';

const fs = require('fs')
    , util = require('util')
    , co = require('co')
    , thunkify = require('thunkify');

const file = module.exports = {

    /**
     * describe: 写文件操作
     * data:     16.11.04
     * author:   zhuxiankang
     * parm:     path,data
     */
    write(path,data) {
       co(function*() {
           try {
               let open = thunkify(fs.open);
               let fd = yield open(path,'r+');
               if(fd) {
                   let append = thunkify(fs.appendFile),    //异步追加文件
                       close = thunkify(fs.close);
                   yield append(path,data,'UTF-8');
                   yield close(fd);
               }
           } catch(e) {
               //错误日志
           }
       }).catch(onerror);

        function onerror(e) {
            //错误日志
        }
    }
};


