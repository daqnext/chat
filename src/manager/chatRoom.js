import {redis} from "../global.js";
import moment from 'moment'
import dwf from 'dirtywords_filter';


class chatRoom{

    static async addMsg(roomId,userId,userName,msg){

        msg=msg.trim();
        if(msg.length==0){
            return ;
        }

        let jmsg=JSON.stringify({
            roomid:roomId,
            userid:userId,
            username:userName,
            msg:dwf.clean(msg),
            time:moment().format('YYYY-MM-DD h:mm:ss')});

        await redis.lpush(roomId,jmsg);

        return jmsg;
    }

    static async getMsg(roomId,count){
        return await redis.lrange(roomId,0,count);
    }
    
}

export {chatRoom}