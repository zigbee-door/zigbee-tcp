/**
 * describe: 数据接收
 * data:     16.12.28
 * author:   zhuxiankang
 * parm:     none
 */


/**
 * describe: Tcp接收构造对象
 * data:     16.12.28
 * author:   zhuxiankang
 * parm:     none
 */
function TcpReceive() {}




TcpReceive.prototype.receive = (tcp_data,redis_data) => {
    /*---------------------------------------------------------------------------------------------*/
    /* Command    0       1        2         3       4         5               6      7            */
    /*---------------------------------------------------------------------------------------------*/
    /* Name      SOP     LENG    FPB_CMD    DOOR_ID  RESP  Data[0]_Data[n-1]  LRC    EOP           */
    /*---------------------------------------------------------------------------------------------*/
    /* Values    0xAA                                                                0x0E          */
    /*---------------------------------------------------------------------------------------------*/
    /* No.Byte   2byte   1byte   1byte       2byte   1byte    nbyte    byte   1byte  1-byte        */
    /*---------------------------------------------------------------------------------------------*/

    const F = require('../constants/frame.constant')
        , doorList_pub = require('../pubs/doorList.pub');



    //先不采用轮询的方式接收，假设接收回来的数据每一帧都能及时处理
    for(let i= 0,len= tcp_data.length; i<len; i++){


        if(

            (tcp_data[i] == F.SOP) && (tcp_data[i+1] === F.SOP) &&  /*1.帧头SOP接收正确*/
            (len - i >= F.RECEIVE_ALL_MIN_LENG)                 &&  /*2 接收到帧头以后的数据符合一帧最小的数据长度*/
            (tcp_data[i+2] >= F.RECEIVE_MIN_LENG)               &&  /*3.LENG长度正确*/
            (tcp_data[i+3] <= F.MAX_CMD_NUM)                    &&  /*4.命令字符合要求*/
            (tcp_data[i+2+tcp_data[i+2]+2] === F.EOP)               /*5.帧尾EOP接收正确*/

        ) {
            //console.log('FRAME OK...');
            let validLength = tcp_data[i+2];    //有效帧长度,FPB_CMD~Data[n-1]

            let LRC = validLength;    //data[i+2]是有效帧长度
            for(let j=i+3,len1=i+3+validLength; j<len1; j++ ) {
                LRC ^= tcp_data[j];
            }

            /*6.LRC正确*/
            if(LRC === tcp_data[i+2+validLength+1]) {

                //如果返回的数据帧正确
                if(tcp_data[i+6] === F.RESP_OK) {
                    redis_data.cmd = tcp_data[i+3];                                 //命令字
                    redis_data.doorId = JSON.stringify(tcp_data.slice(i+4,i+6));    //门锁ID
                    redis_data.doorId = JSON.parse(redis_data.doorId).data;         //将buffer转化为数组

                    if(validLength > F.RECEIVE_MIN_LENG) {        //有数据
                        redis_data.data = JSON.stringify(tcp_data.slice(i+7,i+7+validLength-4));  //data数据
                        redis_data.data = JSON.parse(redis_data.data).data;         //将buffer转化为数组
                    } else {
                        redis_data.data = [];                                       //无数据
                    }

                    console.log('redis_data.data:', redis_data.data);
                    console.log(redis_data);

                    doorList_pub.doorList(redis_data);

                //发送的数据帧有错误
                } else {
                    console.log('发送的数据帧有错误，错误的RESP=',tcp_data[i+6]);
                }



                i = i + 2 + validLength + 3;     //继续判断下一帧的数据


            } else {
                console.log('接收的数据帧LRC校验错误');
            }
        }


    }

    console.log("接收到基站的Buffer数据：",tcp_data);                  //这里打印一下接收到的数据

};




module.exports = new TcpReceive();