import {koaRouter,logger,ROOTDIR } from "../global.js";//all the global data and initialization
 
 
koaRouter.get('/userinfo',async (ctx,next) =>{
     
    ctx.body={name:'leo',userid:'12',userpage_pre:'http://localhost:3600/userpage/'};
    await next();
});