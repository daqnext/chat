import {assert} from 'chai';
import {args,ROOTDIR,redis,sqlpool,axios,randomstring} from "../src/global.js";


 
 
describe('redis test', function() {
  it('array test', async function() {
    
    ///reverse order 
    await redis.del('test')
    await redis.lpush('test',1,2,3,4);

    let result= await redis.lrange('test',0,10);
    console.log(result);

  });
});

 