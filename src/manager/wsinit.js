import WebSocket,{ WebSocketServer } from 'ws';
import { args,logger, time } from "../global.js";
import queryString from "query-string"
import axios from 'axios';
import {pubsubManager} from './pubsubManager.js';
import {chatRoom} from "./chatRoom.js";



let wss = new WebSocketServer({
  port: args.ws_port
});


 
  let AllSessions={};
  let KeyVeifiled={};
  wss.on('connection', async function connection(ws,request,client) {
    

      let userParams=queryString.parse(request.url.replace("/?",""));

      userParams.channel=Buffer.from(userParams.channel, 'base64').toString();
      userParams.verifyurl=Buffer.from(userParams.verifyurl, 'base64').toString();
      userParams.verifykey=Buffer.from(userParams.verifykey, 'base64').toString();
 
       
      if( userParams.channel&&userParams.channel.length>6&&
          userParams.verifyurl&&userParams.verifykey
          //&&userParams.userid&&userParams.username
      ){

          if(AllSessions[userParams.channel]){
          }else{
              AllSessions[userParams.channel]={};
          }

          //get past room message to this user
          let pastmessage=await chatRoom.getMsg(userParams.channel,50);
          ws.send(JSON.stringify(pastmessage));

          //old (channel,key) exist close it
          if( AllSessions[userParams.channel][userParams.verifykey]){
            AllSessions[userParams.channel][userParams.verifykey].close();
          }
          AllSessions[userParams.channel][userParams.verifykey]=ws;

          //////////////sub to some channel////////////////
          pubsubManager.newSub(userParams.channel,(channel, message) => {          
              for (const verifykey of Object.keys(AllSessions[userParams.channel])) {               
                  if(AllSessions[userParams.channel][verifykey].readyState === WebSocket.OPEN){
                      AllSessions[userParams.channel][verifykey].send(message);
                  }else{
                      delete AllSessions[userParams.channel][verifykey]; 
                  }    
              }
          }); 


          ws.on('message', async function message(msg) {
            ///verify the user
            if(!KeyVeifiled[userParams.verifykey]){
              try{
                      let vresponse = await axios.post(userParams.verifyurl,{verifykey:userParams.verifykey});
                      if(vresponse.data.result){
                          KeyVeifiled[userParams.verifykey]=
                          {
                              userid:vresponse.data.userid,
                              username:vresponse.data.username,
                              updatetime:time.Now()-args.chat_freq_secs-1
                          };
                      }else{
                        await ws.send(JSON.stringify({cmd:'login'}));
                        return;
                      } 
                  } catch (error) {
                      await ws.send(JSON.stringify({cmd:'login'}));
                      return;
                  }
            }

             //////////////verify passed//////////////

             //timing passed?
            if(KeyVeifiled[userParams.verifykey].updatetime<time.Now()-args.chat_freq_secs){
                KeyVeifiled[userParams.verifykey].updatetime=time.Now();
                let pub =pubsubManager.newPub(userParams.channel); 
                let jmsg=await chatRoom.addMsg(userParams.channel,KeyVeifiled[userParams.verifykey].userid,KeyVeifiled[userParams.verifykey].username,msg.toString());
                
                if(jmsg=="no_msg"||jmsg=="long_msg"){
                    await ws.send(JSON.stringify({cmd:jmsg}));
                }else{
                    await pub.redis.publish(pub.channel,jmsg);
                }
                
            }else{
                await ws.send(JSON.stringify({cmd:'time'}));
            }

          });

            ///////////////
            wss.on('close', function close() {
               // logger.info("closed");
            });

            const interval = setInterval(function ping() {
                if(ws.readyState === WebSocket.OPEN){
                    //logger.info("interval 30 , status check opn");
                    ws.ping(function(){});
                }else{
                    //logger.info(ws.readyState);
                    //logger.info("interval 30 , status check closed");
                    clearTimeout(interval);
                }
            }, 3000);

      }else{
        //wrong url link just do nothing
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