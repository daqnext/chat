import {koaRouter,ROOTDIR,randomstring } from "../global.js";//all the global data and initialization
import {pubsubManager} from "../manager/pubsubManager.js"


koaRouter.get('/pub',async (ctx,next) =>{
 
    if(ctx.query.channel&&ctx.query.channel.length>5&ctx.query.channel.length<20){
 
            setInterval(async () =>   {
                let pub =pubsubManager.newPub(ctx.query.channel); 
                let msg= randomstring.generate(26);
                let _= await pub.redis.publish(pub.channel,msg);
                console.log("pubmsg:",msg);
            }, 2000);

            ctx.body={msg:'pub successfully',channel:ctx.query.channel};
            await next();

    }else{
        ctx.body={msg:'channel error, channel length must be >5 and < 20 '};
        await next();
    }
    
});