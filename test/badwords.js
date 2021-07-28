import {assert} from 'chai';
import {args,ROOTDIR,redis,sqlpool,axios,randomstring} from "../src/global.js";

import dwf from 'dirtywords_filter';
 
describe('dirty words', function() {
  it('filter of dirty words', function() {
      
      console.log(dwf.clean("fucking bad!"));

  });
});

 