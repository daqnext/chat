import {assert} from 'chai';
import {chatRoom} from "../src/manager/chatRoom.js";


 
describe('chatRoom test', function() {
  it('msg test ', async function() {
    
        await chatRoom.addMsg('roomid1',123,'leo','this is a fucking bad 1');
        await chatRoom.addMsg('roomid1',4314,'leo','二二二');
        await chatRoom.addMsg('roomid1',1234,'leo','   ');
        let msgs= await chatRoom.getMsg('roomid1',10); 
        console.log(msgs);

  });
});

 