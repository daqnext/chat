import { WebSocketServer } from 'ws';
import { args,logger } from "../global.js";
import queryString from "query-string"
import axios from 'axios';
import {pubsubManager} from './pubsubManager.js';


let wss = new WebSocketServer({
  port: args.ws_port,  
  verifyClient: async function(info, done) {
      let userParams=queryString.parse(info.req.url.replace("/?",""));
      if(userParams.channel&&userParams.channel.length>6&&userParams.verifyurl&&userParams.key){
        try {
            let vurl=userParams.verifyurl+"?key="+userParams.key;
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
  wss.on('connection', function connection(ws,request,client) {
    
      let userParams=queryString.parse(request.url.replace("/?",""));

      if(userParams.channel&&userParams.channel.length>6&&userParams.verifyurl&&userParams.key){

          if(AllSessions[userParams.channel]){
          }else{
              AllSessions[userParams.channel]={};
          }

          AllSessions[userParams.channel][userParams.key]=ws;
           
          //////////////sub to some channel////////////////
          pubsubManager.newSub(userParams.channel,(channel, message) => {          
              for (const value of Object.values(AllSessions[userParams.channel])) { 
                    value.send("received"+message+"from "+channel);
              }
          }); 

          ws.on('message', async function message(msg) {
            let pub =pubsubManager.newPub(userParams.channel); 
            await pub.redis.publish(pub.channel,msg);
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