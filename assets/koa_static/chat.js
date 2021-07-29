
$(document).ready(function(){
    var div=$("<div>", {"style": "background-color:#0f0f11;height:60%;width:360px;position:absolute;top:80px;right:50px;border: 1px solid #777777;overflow:hidden;border-radius:5px;box-shadow: 1px 1px 1px #b1b1b1;"});
    
    var innerdisplay=$("<div>",{"id":"chatdisplay","style":"background-color:#2f2f2f;width:100%;height:100%;position:absolute;top:-56px;overflow-y:scroll;overflow-x: hidden;"});
    div.append(innerdisplay);

    var bottombox=$("<div>",{"style":"height:54px;width:100%;background-color:#101012;position:absolute;bottom:0px;box-shadow: 2px 0px 0px 2px #303033;"});
    
    var inputbox=$("<input>",{"id":"chatinput","style":"height: 30px;background-color: #2f2f2f;border:0px;margin:10px;font-size: 14px;width: 260px;color:white;display: inline-block;"});
    
    var btn=$('<div>',{"id":"chatsend","style":"font-size: 16px;margin: 5px 0px 0px 3px;padding: 5px 15px;background-color: #1b3896;border-radius:5px;color:#fdfdfd;display:inline-block;cursor:pointer;"});
    btn.html("send");
 

    bottombox.append(inputbox);
    bottombox.append(btn);
    div.append(bottombox);
    $('body').append(div);

    addchatmsg("","");
    addchatmsg("","");
    chatupdate();
});

function sendCallBack(callback){

    $('#chatsend').click(function(){     
        callback($("#chatinput").val());
        $("#chatinput").val('');
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
 
    let textspan=$('<span>',{"style":"color:#d4d4d4;font:14px;"});
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

 

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
}
return result;
}

///////////////websocket////////////////////

var socket;
if (!window.WebSocket) {
window.WebSocket = window.MozWebSocket;
}
if (window.WebSocket) {
socket = new WebSocket("ws://localhost:3601?channel=room11111&key="+makeid(8)
+"&verifyurl=http://localhost:3600/verify"
+"&username=leo"
+"&userid=123"
);
socket.onmessage = function (event) {

    var result=JSON.parse(event.data);
    
    if(result instanceof Array ){
            result.reverse().forEach(jmsg => {
                msg=JSON.parse(jmsg);
                addchatmsg(msg.username,msg.msg,msg.time);
        });

    }else{
        msg=result;
        addchatmsg(msg.username,msg.msg,msg.time);
        
    }

    
    chatupdate();
      
};
// socket.onopen = function (event) {
// 	var ta = document.getElementById('responseText');
// 	ta.value = "连接开启!";
// };
// socket.onclose = function (event) {
// 	var ta = document.getElementById('responseText');
// 	ta.value = ta.value + "连接被关闭";
// };
} else {
alert("你的浏览器不支持 WebSocket！");
}

function send(message) {
if (!window.WebSocket) {
    return;
}
if (socket.readyState == WebSocket.OPEN) {
    socket.send(message);
} else {
    alert("连接没有开启.");
}
}

$(function(){
        sendCallBack(function(inputmsg){
        send(inputmsg);
    });
});

