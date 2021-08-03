import {redis} from "../global.js";
import moment from 'moment'
import dwf from 'dirtywords_filter';
import sanitizeHtml from 'sanitize-html';


class chatRoom{

    static async addMsg(roomId,userId,userName,msg){

        msg=msg.trim();
        if(msg.length==0){
            return 'no_msg';
        }

        if(msg.length>150){
            return "long_msg";
        }

        msg=sanitizeHtml(msg);

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