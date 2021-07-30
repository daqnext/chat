import {koaRouter,logger,ROOTDIR } from "../global.js";//all the global data and initialization
 
 
koaRouter.post('/verify',async (ctx,next) =>{
    logger.info(ctx.request.body);
    ctx.body={result:true,username:'username',userid:1234};
    await next();
});