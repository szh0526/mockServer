"use strict";

module.exports = function() {
    //项目根目录
    global.CWD = process.cwd();

    //node服务地址
    global.SERVER = {
        port:3999,
        url:"http://localhost:3999"
    };

    //环境变量
    global.NODE_ENV = (process.env && process.env.NODE_ENV) ? process.env.NODE_ENV : "test";
}