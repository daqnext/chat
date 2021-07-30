var common = {
  //log-level
  loglevel:'DEBUG',
  logfilename:'default.log',
  logtypes:['console','file'],
  /// server port 
  port: 3600,

  //sqldb 
  db_host:'localhost',
  db_port:'3306',
  db_username:'root',
  db_password:'',
  db_name:'test',
  db_pool_num:5,

  //////////use things below/////////////////

  //redis
  redis_host: "mesoncenter-redis.vktrsm.0001.usw1.cache.amazonaws.com",
  redis_port:6379,
  redis_password:"",
  redis_db:10,
  redis_family:4,

  //websocket
  ws_port:3601,

  //cache
  cache_prefix:'chat_',


  //chat frequency secs
  chat_freq_secs:12
 
};

export  {common}