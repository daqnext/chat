import {koaRouter,logger,ROOTDIR } from "../global.js";//all the global data and initialization
 
 
koaRouter.get('/verify',async (ctx,next) =>{
     
    ctx.body={result:true};
    await next();
});