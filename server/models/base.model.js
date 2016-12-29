/**
 * describe: 基站数据库
 * data:     16.11.07
 * author:   zhuxiankang
 * parm:     none
 */

const mongoose = require('mongoose')
    , moment = require('moment')
    , mongo_con = require('../constants/mongo.constant')
    , co = require('co');



/*基站下的门锁对象*/
let DoorSchema = new mongoose.Schema({
    //门锁网络地址
    shortAddr: {
        type:Number,
        default:0x0000      //注意所有的值都给默认值
    },

    //门锁MAC地址
    macAddr: {
        type:Array,
        default:[]
    },

    //门锁房间号
    doorNum: {
        type:String,
        default:'未设置'
    },

    //电池百分比
    battery: {
        type:Number,
        default:0x0000
    },

    //信号强度
    lqi: {
        type:Number,
        default:0x0000
    },

    //信息获取时间
    infoTime: {
        type:String,
        default: String(moment().format('YYYY-MM-DD HH:mm:ss'))
    }
});



/*基站对象*/
let BaseSchema = new mongoose.Schema({
    ip:{            //基站IP
        type:String,
        index:1,
        unique:true,
        require:true,
        default:''
    },

    panId:{
        type:String,
        default:''
    },

    location:{       //地理位置
        type:String,
        require:true,
        default:mongo_con.position2,
        enum:[mongo_con.position1,mongo_con.position2]
    },

    status:{         //连接状态
        type:String,
        require:true,
        default:mongo_con.disconnect,
        enum:[mongo_con.connect,mongo_con.disconnect]
    },

    time: {
        type:String,
        default: String(moment().format('YYYY-MM-DD HH:mm:ss')),
        require:true
    },

    door_list: [DoorSchema]     //门锁列表
});


//发布Model
let Base = mongoose.model(mongo_con.Base,BaseSchema);
