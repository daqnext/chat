import ioredis from "ioredis";
import { args,logger } from "../global.js";


class pubsubManager{

    static pubs={};
    static subs={};

    static newPub(channelname){
        if(pubsubManager.pubs[channelname]){
            return pubsubManager.pubs[channelname];
        }


        pubsubManager.pubs[channelname]=  {
            channel:channelname,
            redis:new ioredis({
                port:args.redis_port,
                host:args.redis_host,
                family:args.redis_family,
                db:args.redis_db
            })
        }

        return pubsubManager.pubs[channelname];
    }

    static newSub(channelname,callback){
        if(pubsubManager.subs[channelname]){
            return pubsubManager.subs[channelname];
        }

        pubsubManager.subs[channelname]= {
            channel:channelname,
            redis:new ioredis({
                port:args.redis_port,
                host:args.redis_host,
                family:args.redis_family,
                db:args.redis_db
            })
        };

        //////////////
        pubsubManager.subs[channelname].redis.subscribe(channelname, (err, count) => {
            if (err) {
                logger.error("Failed to subscribe",err.message);
            } else {
                logger.info(channelname+"Subscribed +1 ,all counts:",count);
            }
          });
        /////////////////
        pubsubManager.subs[channelname].redis.on("message", (channel, message) => {
            callback(channel,message)
          });

        return pubsubManager.subs[channelname];
    } 



}


export {pubsubManager};
