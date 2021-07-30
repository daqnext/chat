
$(document).ready(function(){

    var div=$("<div>", {"style": "background-color:#0f0f11;height:60%;width:360px;position:absolute;top:80px;right:50px;border: 1px solid #777777;overflow:hidden;border-radius:5px;box-shadow: 1px 1px 1px #b1b1b1;"});
    
    var innerdisplay=$("<div>",{"id":"chatdisplay","style":"background-color:#2f2f2f;width:100%;height:100%;position:absolute;top:-56px;overflow-y:scroll;overflow-x: hidden;"});
    div.append(innerdisplay);

    var bottombox=$("<div>",{"style":"height:54px;width:100%;background-color:#101012;position:absolute;bottom:0px;box-shadow: 2px 0px 0px 2px #303033;"});
    
    var inputbox=$("<input>",{"id":"chatinput","style":"height: 30px;background-color: #2f2f2f;border:0px;margin:10px;font-size: 14px;width: 260px;color:white;display: inline-block;"});
    
    var btn=$('<div>',{"id":"chatsend","style":"font-size: 16px;margin: 5px 0px 0px 3px;padding: 5px 15px;background-color: #1b3896;border-radius:5px;color:#fdfdfd;display:inline-block;cursor:pointer;width:35px;text-align:center"});
    btn.html("send");
 

    bottombox.append(inputbox);
    bottombox.append(btn);
    div.append(bottombox);
    $('body').append(div);

    addchatmsg("","");
    addchatmsg("","");
    chatupdate();
});

function chatShowLogin(){

}

function chatShowConnectionClosed(){
    addchatmsg("SYSTEM","chat session closed | refresh page to open it!","now");
    chatupdate();
}


//default is 15 seconds
window.send_frequency_secs=15; 
window.send_tag=true;
function sendCallBack(callback){

    $('#chatsend').click(function(){  
        
        if($("#chatinput").val().trim()==''){
            return;
        }
        
        if(window.send_tag){

            window.send_tag=false;
            let start=window.send_frequency_secs;
            $('#chatsend').html(''+start);
            $('#chatsend').css("background-color","#2f2f2f");
            $('#chatsend').css("color","gray");

            var refreshIntervalId = setInterval(function(){
                start=start-1;
                $('#chatsend').html(''+start);
            }, 1000);

            callback($("#chatinput").val().trim());
            $("#chatinput").val('');

            setTimeout(function(){ 
                clearInterval(refreshIntervalId);
                $('#chatsend').html('send');
                $('#chatsend').css("background-color","#1b3896");
                $('#chatsend').css("color","#fdfdfd");
                window.send_tag=true;        
            }, window.send_frequency_secs*1000);

        }
         
    });

}

function addchatmsg(name,msg,timestr){
    let msgdiv=$('<div>',{"style":"width:335px;margin:5px 0px;padding:3px 10px;background:none;"});

    let namespan=$('<span>',{"style":"color:#d4d4d4;font:15px;font-weight:bold;margin-right:5px"});
    if(name){
        namespan.html(name+' : ');
    }else{
        namespan.html('&nbsp');
    }
 
    let textspan=$('<span>',{"style":"color:#d4d4d4;font-size:14px;"});
    textspan.html(msg);

    if(timestr){
        let timediv=$('<div>',{"style":"font-style: italic;color:#797979;font-size:9px;"});
        timediv.html(timestr);
        msgdiv.append(timediv); 
    }
    msgdiv.append(namespan);
    msgdiv.append(textspan);

    $("#chatdisplay").append(msgdiv);
     
}

function chatupdate(){
    $("#chatdisplay").animate({ scrollTop: $("#chatdisplay")[0].scrollHeight}, 500);
}

///////////////websocket////////////////////

if (!window.WebSocket) {
window.WebSocket = window.MozWebSocket;
}

function send(message) {
    if (!window.WebSocket) {
        return;
    }
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
    } else {
        chatShowConnectionClosed();
    }
}


$(function(){
            sendCallBack(function(inputmsg){
                    send(inputmsg);
            });
});




function startChat(channel,verifyurl,verifykey,){

        if (window.WebSocket) {

            window.socket = new WebSocket("ws://chat.hotcat.live:3601?channel="+channel
            +"&verifyurl="+verifyurl +"&verifykey="+verifykey);

            window.socket.onmessage = function (event) {
                var result=JSON.parse(event.data);
                if(result instanceof Array ){
                        result.reverse().forEach(jmsg => {
                            msg=JSON.parse(jmsg);
                            addchatmsg(msg.username,msg.msg,msg.time);
                    });
                }else{

                    if(result.cmd){
                        if(result.cmd=='login'){
                            addchatmsg("system","Please signin before chating ","now");
                        }

                        if(result.cmd=='time'){
                            addchatmsg("system"," too frequent","now");
                        }
                        
                        chatupdate();
                    }else{
                        msg=result;
                        addchatmsg(msg.username,msg.msg,msg.time); 
                    }                            
                }
                chatupdate();                
            };


            //not functioning
            // socket.onopen = function (event) {
            // };
            socket.onclose = function (event) {
                chatShowConnectionClosed();
            };

        } else {
            addchatmsg("system","Error: your browser don't support websocket","now");
            chatupdate();
        }
 
}


 