import {koaRouter,ROOTDIR } from "../global.js";//all the global data and initialization
import {HelloWorld} from "../manager/HelloWorld.js"


koaRouter.get('/hello/world',async (ctx,next) =>{
    ctx.body={msg:HelloWorld.echo()};
    await next();
});