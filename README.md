# zigbee-tcp

## 启动

```javascript
npm start   //本地环境,其他环境查看package.json或者config/config.js
```

## 服务

- 端口: `4003`(localhost)

## 配置

| 名称      |     描述 |
| :-------- | :--------|
| redis    |   `redis://localhost:6379`本地环境 |
| mongodb    |   `mongodb://localhost/zigbee` |

## 日志

| 名称      |     描述 |
| :-------- | :--------|
| 进程    |   主进程和子进程启动停止日志 |
| 服务    |   tcp服务启动和停止日志 |
| 错误    |   错误日志 |

>提示: 日志在`log/txt`文件夹下以记事本的形式存储.


## 目录

```javascript
.
├── app.js                      # 启动脚本
├── server                      # 服务
│   └── server.js               # tcp服务
├── config                      # 配置
│   ├── config.js               # 参数配置
│   └── index.config.js         # 导出配置
├── log                         # 日志
│   ├── file.js                 # 读写文件操作
│   ├── index.log.js            # 导出日志操作
│   └── txt                     # 日志文件
│       ├── error.log.txt       # 错误日志
│       ├── process.log.txt     # 进程日志
│       └── server.log.txt      # 服务日志
├── constants                   # 常量
│   ├── base.constant.js        # 基站连接状态常量
│   └── log.constant.js         # 日志常量
├── models                      # 数据库
│   ├── redis                   # redis
│   │   └── socket.model.js     # 基站连接和断开列表
│   └── mongodb                 # mongodb(暂时没用)
└── pub                         # 进程间通信(redis发布)
    └── socket.pub.js           # 基站连接状况发布
```

## 调试

- IDEA
- node-inspector
