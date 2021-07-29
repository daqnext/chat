import WebSocket,{ WebSocketServer } from 'ws';
import { args,logger } from "../global.js";
import queryString from "query-string"
import axios from 'axios';
import {pubsubManager} from './pubsubManager.js';
import {chatRoom} from "./chatRoom.js";


let wss = new WebSocketServer({
  port: args.ws_port,  
  verifyClient: async function(info, done) {
      let userParams=queryString.parse(info.req.url.replace("/?",""));

      if( userParams.channel&&userParams.channel.length>6&&
          userParams.verifyurl&&userParams.key&&
          userParams.userid&&userParams.username
        ){
        try {
            let vurl=userParams.verifyurl+"?key="+userParams.key+'&userid='+
            userParams.userid+'&username='+userParams.username;
            let vresponse = await axios.get(vurl);
            if(vresponse.data.result){
                done(true);
            }else{
                done(false);
            } 
        } catch (error) {
            done(false);
        }
      }else{
        done(false);
      }
    }
});

 
  let AllSessions={};
  wss.on('connection', async function connection(ws,request,client) {
    
      let userParams=queryString.parse(request.url.replace("/?",""));

      if( userParams.channel&&userParams.channel.length>6&&
          userParams.verifyurl&&userParams.key&&
          userParams.userid&&userParams.username
      ){

          if(AllSessions[userParams.channel]){
          }else{
              AllSessions[userParams.channel]={};
          }

          //get past room message to this user
          let pastmessage=await chatRoom.getMsg(userParams.channel,50);
          ws.send(JSON.stringify(pastmessage));

          AllSessions[userParams.channel][userParams.key]=ws;

          
          //////////////sub to some channel////////////////
          pubsubManager.newSub(userParams.channel,(channel, message) => {          
              for (const key of Object.keys(AllSessions[userParams.channel])) {               
                  if(AllSessions[userParams.channel][key].readyState === WebSocket.OPEN){
                      AllSessions[userParams.channel][key].send(message);
                  }else{
                      delete AllSessions[userParams.channel][key]; 
                  }    
              }
          }); 

          ws.on('message', async function message(msg) {
            let pub =pubsubManager.newPub(userParams.channel); 
            let jmsg=await chatRoom.addMsg(userParams.channel,userParams.userid,userParams.username,msg.toString());
            await pub.redis.publish(pub.channel,jmsg);
          });
      }

  });

  


  //not take any effect 
  // wss.on('open', function open() {
  //   logger.info("websocket open");
  // });

  // wss.on('close', function close() {
  //   logger.info("websocket close");
  // });


export {};