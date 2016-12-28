'use strict';




// //数据初始化
// FRAME.INIT = {
//     VAL:                    0x00
// };
//
//
//
// //命令类型 数值固定
// FRAME.FPB_CMD  = {
//
//
// };
//
// //接收进度
// FRAME.PRO = {
//     SOP_START:              0x01,
//     SOP_CHECK:              0x02,
//     FPB_CMD:                0x03,
//     LENGTH:                 0x04,
//     SEQ:                    0x05,
//     BASE_ID:                 0x06,
//     DOOR_ID:                 0x07,
//     RESP:                   0x08,
//     DATA:                   0x09,
//     LRC:                    0x10,
//     EOP:                    0x11
// };
//
// //接收结果状态
// FRAME.STA = {
//     START:                  0x01,
//     OK:                     0x02,
//     ERR:                    0x03
// };
//
// //反馈状态 数值固定
// FRAME.RESP = {
//     OK:                     0xEE
// };
//
//
//
//
//
//
//
// //数据长度 数值固定
// FRAME.LENG = {
//     SEND:                   0x06,
//     RECEIVE:                0x06,
//     MIN:                    0x0C,       //完整一帧数据的最小长度是12
//     DEV_ID:                 0x02
// };



module.exports = {
    //帧头
    SOP:                    0xAA,
    //帧尾
    EOP:                    0x0E,


    //RESP
    RESP_OK:                0xEE,
    RESP_NO_DOOR_LIST:      0x20,

    //发送的最小数据长度
    SEND_MIN_LENG:          0x03,
    //接收的有效最小数据长度，有效数据长度从FPB_CMD ~ DATA[N]
    RECEIVE_MIN_LENG:       0x04,
    //接收到的一完整帧的最小数据长度
    RECEIVE_ALL_MIN_LENG:   0x09,
    //当前拥有的最大命令数，这个需要随命令增加而增加
    MAX_CMD_NUM:            0x02
};
