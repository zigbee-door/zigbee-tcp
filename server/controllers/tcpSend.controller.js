/**
 * describe: 数据发送
 * data:     16.12.27
 * author:   zhuxiankang
 * parm:     none
 */


/**
 * describe: Tcp构造对象
 * data:     16.11.04
 * author:   zhuxiankang
 * parm:     none
 */
function TcpSend() {}

TcpSend.prototype.send = (socketList,data) => {
    /*-----------------------------------------------------------------------------*/
    /* Command    0      1     2        3             4            5      6        */
    /*-----------------------------------------------------------------------------*/
    /* Name      SOP    LENG   CMD   DOOR_ID   Data[0]_Data[n-1]  LRC    EOP       */
    /*-----------------------------------------------------------------------------*/
    /* Values    0xAA                                                    0x0E      */
    /*-----------------------------------------------------------------------------*/
    /* No.Byte   2byte  1byte 1byte   2byte         nbyte        1byte   1byte     */
    /*-----------------------------------------------------------------------------*/
    const F = require('../constants/frame.constant');

    let frame = []
        , LRC;


    // console.log(data);
    // console.log(data.baseIP);
    // console.log(socketList);

    /*1. 基站存活*/
    if(socketList[data.baseIP] && socketList[data.baseIP].writable) {

        /*1.SOP*/
        frame.push(F.SOP);
        frame.push(F.SOP);

        /*2.LENG*/
        frame.push(F.SEND_MIN_LENG + data.data.length);     //data.data是需要发送的数据，无数据时是0，从网页客户端获取

        /*3.CMD*/
        frame.push(data.cmd);                               //data.cmd是命令，从网页客户端获取

        /*4.DOOR_ID*/
        frame.push(data.doorId[0]);                         //doorId从网页获取
        frame.push(data.doorId[1]);

        /*5.Data[0]_Data[n-1]*/
        for(let i=0,len=data.data.length; i<len; i++) {
            frame.push(data.data[i]);
        }

        /*6.LRC*/
        LRC = frame[2];

        for(let i=3,len=frame.length;i<len;i++) {
            LRC = LRC ^ frame[i];
        }

        frame.push(LRC);

        /*7.EOP*/
        frame.push(F.EOP);

        let sendFrame = new Buffer(frame);              //使用buffer发送

        socketList[data.baseIP].write(sendFrame);       //发送数据给基站

        console.log(sendFrame);

    /*2. 基站不存活*/
    } else {
        //这里暂时不作设置
        console.log('TCP服务检测到基站不存活！');
    }




};







module.exports = new TcpSend();