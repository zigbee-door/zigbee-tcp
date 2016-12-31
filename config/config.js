/**
 * node:        config.js
 * data:        16.11.01
 * author:      zhuxiankang
 * describe:    redis等数据配置文件
 */

module.exports = {
    redis: {
        'local': 'redis://localhost:6379',
        'development':'redis://10.33.31.234:6379',
        'production': 'redis://10.33.31.234:6379'
    }
};

