import koa from 'koa';
import router from 'koa-router';
import path from 'path';
import {args} from  '../configs/args.js'
import log4js from 'log4js';
import ioredis from "ioredis";
import mysql from "mysql2";
import axios from "axios";
import randomstring from "randomstring";


//////////////////////////////////////////
let ROOTDIR=path.resolve();

//////////global koa//////////////
let koaApp = new koa();
let koaRouter = new router();



////////////global ioredis////////////
const redis = new ioredis({
    port:args.redis_port,
    host:args.redis_host,
    family:args.redis_family,
    password:args.redis_password,
    password:args.redis_db
});

// Create the connection pool. The pool-specific settings are the defaults
let sqlpool = mysql.createPool({
    host: args.db_host,
    user: args.db_username,
    password:args.db_password,
    database: args.db_name,
    waitForConnections: true,
    connectionLimit: args.db_pool_num,
    queueLimit: 0
}).promise();



///////////global log4js//////////////
log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: ROOTDIR+"/log/"+args.logfilename, 
            maxLogSize: 500000,
            backups: 5,
            replaceConsole: true,
        },
        console: {
            type: 'console',
            replaceConsole: true,
        },
    },
    categories: {
        default: { appenders: args.logtypes,level: args.loglevel },
    },
    disableClustering: true
});

let logger=log4js.getLogger('default');

export {args,ROOTDIR,koaApp,koaRouter,logger,redis,sqlpool,axios,randomstring};

