import { args,koaApp,koaRouter,logger,ROOTDIR } from "./global.js";//all the global data and initialization
import json from "koa-json";
import koastatic from "koa-static";
import koabodyparser from "koa-bodyparser";
import fs from "fs"
import {} from "./manager/wsinit.js"


/////////ini koa //////////////////////////
koaApp.use(json());
koaApp.use(koastatic(ROOTDIR+'/assets/koa_static'));
koaApp.use(koabodyparser());

koaApp.use(async (ctx, next)=>{
    try{
            await next();   // execute code for descendants
            if(!ctx.body){  
                ctx.status = 404; ctx.body = "not found";
                logger.warn("not found 404:",ctx.request);
            }           
    }catch(e){
        ctx.status = 500; ctx.body = "server error";
        logger.error("server error:",ctx.request,e);
    }
});

/////////import all the controllers////////////
fs.readdirSync(ROOTDIR+"/src/controllers").forEach(function(file) {
    import (ROOTDIR+"/src/controllers/"+file)
});

koaApp.use(koaRouter.routes()).use(koaRouter.allowedMethods());

koaApp.listen(args.port, () => {
    logger.info('The application is listening on port : ',args.port);
})
 


///////////end of main////////////////////////

