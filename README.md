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
├── config                      # 配置
│   ├── config.js               # 参数配置
│   └── index.config.js         # 导出配置
├── server                      # 服务
│   ├── constants               # 常量
│   ├── controllers             # 逻辑
│   ├── logs                    # 日志
│   ├── models                  # 数据
│   ├── pubs                    # 发布
│   └── server.js               # tcp服务脚本
└── app.js                      # 启动脚本
```


## 进度记录

| 日期      |     进度 |
| :-------- | :--------|
| 2016/11/06    |   模拟socket连接和断开成功,redis缓存socket列表,redis发布成功 |


