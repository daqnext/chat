
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };


function inputcheck(element)
{
    var max_chars = 100;
    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if(event.keyCode == 13) {
        $('#chatsend').click();
    }
}

$(document).ready(function(){

    var div=$("#chatwindow");
    

    if(window.mobileCheck()){

        var bottombox=$("<div>",{"style":"height:58px;width:100%;background-color:#101012;position:absolute;top:0px;box-shadow: 2px 0px 0px 2px #303033;"});
        
        var inputbox=$("<input>",{"id":"chatinput","onkeydown":"inputcheck(this)", "style":"border-radius: 10px; padding: 5px 20px; height: 33px; background-color: #1b1b1d; border: 0px; margin: 10px 15px;width:62%; color: white; display: inline-block; float: right; font-size: 21px;"});
        
        var btn=$('<div>',{"id":"chatsend","style":"font-size: 21px;margin: 8px 20px 0px 3px;padding: 2px 15px;background-color: #1b3896;border-radius:5px;color:#fdfdfd;cursor:pointer;text-align:center;float:right;width:70px"});
         
 
        btn.html("send");

        bottombox.append(btn);
        bottombox.append(inputbox);
        
        div.append(bottombox);

        var innerdisplay=$("<div>",{"id":"chatdisplay","style":"background-color:#2f2f2f;width:100%;height:680px;position:absolute;top:58px;overflow-y:scroll;overflow-x: hidden;"});
        div.append(innerdisplay);


    }else{

        var innerdisplay=$("<div>",{"id":"chatdisplay","style":"background-color:#2f2f2f;width:100%;height:100%;position:absolute;top:-56px;overflow-y:scroll;overflow-x: hidden;"});
        div.append(innerdisplay);

        var bottombox=$("<div>",{"style":"height:54px;width:100%;background-color:#101012;position:absolute;bottom:0px;box-shadow: 2px 0px 0px 2px #303033;"});
        
        var inputbox=$("<input>",{"id":"chatinput","onkeydown":"inputcheck(this)", "style":"height: 30px;background-color: #2f2f2f;border:0px;margin:10px;font-size: 14px;width: 200px;color:white;display: inline-block;"});
        
        var btn=$('<div>',{"id":"chatsend","style":"font-size: 16px;margin: 5px 0px 0px 3px;padding: 5px 15px;background-color: #1b3896;border-radius:5px;color:#fdfdfd;display:inline-block;cursor:pointer;text-align:center"});
        btn.html("send");

        bottombox.append(inputbox);
        bottombox.append(btn);
        div.append(bottombox);

        addchatmsg("","");
        addchatmsg("","");

    }
      
   
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

    if(window.mobileCheck()){
        msgdiv=$('<div>',{"style":"margin:5px 0px;padding:3px 10px;background:none;"});
    }

    let namespan=$('<span>',{"style":"color:#d4d4d4;font-size:15px;font-weight:bold;margin-right:5px"});
    if(window.mobileCheck()){
        namespan=$('<span>',{"style":"color:#d4d4d4;font-size:18px;font-weight:bold;margin-right:5px"});
    }
    if(name){
        namespan.html(name+' : ');
    }else{
        namespan.html('&nbsp');
    }
 
    let textspan=$('<div>',{"style":"width:270px;color:#d4d4d4;font-size:14px;word-wrap:break-word !important;word-break:break-all !important;white-space:pre-wrap !important;"});
    if(window.mobileCheck()){
        textspan=$('<div>',{"style":"width:98%;color:#d4d4d4;font-size:16px;word-wrap:break-word !important;word-break:break-all !important;white-space:pre-wrap !important;"});
    }

    textspan.html(msg);

    if(timestr){
        let timediv=$('<div>',{"style":"font-style: italic;color:#797979;font-size:9px;"});
        if(window.mobileCheck()){
            timediv=$('<div>',{"style":"font-style: italic;color:#797979;font-size:13px;"});
        }
        timediv.html(timestr);
        msgdiv.append(timediv); 
    }

    textspan.prepend(namespan);
    msgdiv.append(textspan);
 
    if(window.mobileCheck()){
        $("#chatdisplay").prepend(msgdiv);
    }else{
        $("#chatdisplay").append(msgdiv);
    }
}

function chatupdate(){
    if(window.mobileCheck()){
        $("#chatdisplay").animate({ scrollTop: 0}, 500);
    }else{
        $("#chatdisplay").animate({ scrollTop: $("#chatdisplay")[0].scrollHeight}, 500);
    }
     
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




function startChat(wsendpoint,channel,verifyurl,verifykey){

        if (window.WebSocket) {

            window.socket = new WebSocket(wsendpoint+"?channel="+btoa(channel)+
                "&verifyurl="+btoa(verifyurl)+"&verifykey="+btoa(verifykey));

            window.socket.onmessage = function (event) {
                var result=JSON.parse(event.data);
                if(result instanceof Array ){

                    if(window.mobileCheck()){

                        result.reverse().forEach(jmsg => {
                            msg=JSON.parse(jmsg);
                            addchatmsg(msg.username,msg.msg,msg.time);
                         });

                    }else{
                            result.reverse().forEach(jmsg => {
                                 msg=JSON.parse(jmsg);
                                 addchatmsg(msg.username,msg.msg,msg.time);
                             });
                    }
                         
                }else{

                    if(result.cmd){
                        if(result.cmd=='login'){
                            addchatmsg("system","Please signin before chating ","now");
                        }

                        if(result.cmd=='time'){
                            addchatmsg("system"," too frequent","now");
                        }

                        if(result.cmd=='no_msg'){
                            addchatmsg("system","no message ","now");
                        }

                        if(result.cmd=='long_msg'){
                            addchatmsg("system"," too long message","now");
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


 