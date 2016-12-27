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
    /* Command    0      2     1        3             4            5      6        */
    /*-----------------------------------------------------------------------------*/
    /* Name      SOP    CMD   LENG   DOOR_ID   Data[0]_Data[n-1]  LRC    EOP       */
    /*-----------------------------------------------------------------------------*/
    /* Values    0xAA                                                    0x0E      */
    /*-----------------------------------------------------------------------------*/
    /* No.Byte   2byte  1byte 1byte   2byte         nbyte        1byte   1byte     */
    /*-----------------------------------------------------------------------------*/
    let tcpFrame = []
        , LRC;

    console.log(data);
    console.log(data.baseIP);
    console.log(socketList);

    /*1. 基站存活*/
    if(socketList[data.baseIP] && socketList[data.baseIP].writable) {
        console.log('send');

    /*2. 基站不存活*/
    } else {

    }




};







module.exports = new TcpSend();