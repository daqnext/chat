import {koaRouter,logger,ROOTDIR } from "../global.js";//all the global data and initialization
 
 
koaRouter.get('/login',async (ctx,next) =>{
     
    ctx.body="this is login page !";
    await next();
});