import {koaRouter,ROOTDIR } from "../global.js";//all the global data and initialization
import {pubsubManager} from "../manager/pubsubManager.js"
 
koaRouter.get('/sub',async (ctx,next) =>{

    if(ctx.query.channel&&ctx.query.channel.length>6&ctx.query.channel.length<40){
 
            let sub =pubsubManager.newSub(ctx.query.channel,(channel, message) => {
                console.log(`Received ${message} from ${channel}`);
              }); 

            ctx.body={msg:'sub successfully',channel:sub.channel};
            await next();

    }else{
        ctx.body={msg:'channel error, channel length must be >5 and < 20 '};
        await next();
    }
    
});