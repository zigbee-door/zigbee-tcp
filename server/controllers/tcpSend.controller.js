/**
 * describe: 数据发送
 * data:     16.12.27
 * author:   zhuxiankang
 * parm:     none
 */


/**
 * describe: Tcp发送构造对象
 * data:     16.12.27
 * author:   zhuxiankang
 * parm:     none
 */
function TcpSend() {}

TcpSend.prototype.send = (socketList,redis_data) => {
    /*-----------------------------------------------------------------------------*/
    /* Command    0      1     2        3             4            5      6        */
    /*-----------------------------------------------------------------------------*/
    /* Name      SOP    LENG   CMD   DOOR_ID   Data[0]_Data[n-1]  LRC    EOP       */
    /*-----------------------------------------------------------------------------*/
    /* Values    0xAA                                                    0x0E      */
    /*-----------------------------------------------------------------------------*/
    /* No.Byte   2byte  1byte 1byte   2byte         nbyte        1byte   1byte     */
    /*-----------------------------------------------------------------------------*/
    const F = require('../constants/frame.constant')
        , doorList_pub = require('../pubs/doorList.pub');

    let frame = []
        , LRC;


    // console.log(data);
    // console.log(data.baseIP);
    // console.log(socketList);

    /*1. 基站存活*/
    if(socketList[redis_data.baseIP] && socketList[redis_data.baseIP].writable) {

        /*1.SOP*/
        frame.push(F.SOP);
        frame.push(F.SOP);

        /*2.LENG*/
        frame.push(F.SEND_MIN_LENG + redis_data.data.length);     //data.data是需要发送的数据，无数据时是0，从网页客户端获取

        /*3.CMD*/
        frame.push(redis_data.cmd);                               //data.cmd是命令，从网页客户端获取

        /*4.DOOR_ID*/
        frame.push(redis_data.doorId[0]);                         //doorId从网页获取
        frame.push(redis_data.doorId[1]);

        /*5.Data[0]_Data[n-1]*/
        for(let i=0,len=redis_data.data.length; i<len; i++) {
            frame.push(redis_data.data[i]);
        }

        /*6.LRC*/
        LRC = frame[2];     //有效帧长度

        for(let i=3,len=frame.length;i<len;i++) {
            LRC = LRC ^ frame[i];
        }

        frame.push(LRC);

        /*7.EOP*/
        frame.push(F.EOP);

        let sendFrame = new Buffer(frame);              //使用buffer发送

        socketList[redis_data.baseIP].write(sendFrame);       //发送数据给基站

        console.log("发送给基站的数据帧:",sendFrame);                         //这里打印发送的数据命令

    /*2. 基站不存活*/
    } else {
        console.log('TCP服务检测到基站不存活！');
        redis_data.data=[0x01,0xFF];
        doorList_pub.doorList(redis_data);
    }
};


module.exports = new TcpSend();