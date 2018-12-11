//首页事件
function onHomePage() {
    // mainView.router.loadPage("productTechnology.html")
// mainView.router.loadPage("videoMonitor.html")
 // mainView.router.loadPage("smartCom.html")
   // mainView.router.loadPage("MovingRing.html")
   // mainView.router.loadPage("CloudPlatform.html")
    // mainView.router.loadPage("ManageEnergy.html")
// mainView.router.loadPage("MovingRing.html")
    $('html').removeClass('with-statusbar-overlay');
    $("#jinJia .menu li").find("a").css({color:"#34cbbd"})
    $("#jinJia .menu li").each(function(){
    	$(this).off().click(function(){
    		$(this).find("a").css({color:"#f8c936"})
    	})
    })
    
    $("#jinJia .btnTouch").each(function(){
    	$(this).off().click(function(){
    		var hasDown=$(this).hasClass("bgDown");
    		var hasOpen=$(this).hasClass("goOpen");   		
    		var eq_no=$(this).attr("eq_no");
    		var set_no=$(this).attr("set_no");

    		
    		$("#jinJia .btnTouch").find(".menu").fadeOut(300);
			$("#jinJia .btnTouch").removeClass("bgDown").find("p,i").css({color:"#34cbbd"})   
    		if(hasDown){
    			$(this).removeClass("bgDown");
    			$(this).find("p,i").css({color:"#34cbbd"})   
    			$(this).find(".menu").fadeOut(300)
    		}else{
    			$(this).addClass("bgDown");
    			$(this).find("p,i").css({color:"#f8c936"});
    			if(hasOpen){

    				 GetSetParmItem(eq_no,set_no)
    			}else{

    				$(this).find(".menu").fadeIn(500)
    			}                						
    		}
    	})
    })
  document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
  document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
    $("#voiceList").find("option").each(function () {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
            $("#voiceListName>.item-after").html($(this).html());
        }
    });
    try {
        myJavaFun.VoiceOpen();
    }
    catch (ex) {

    }
    
    
}
function GetSetParmItem(equip_no,set_no){
	$.ajax({
    type: "POST",
    url: "/GWService.asmx/GetSetParmItem",
    timeout: 5000,
    data: {
    	equip_no: equip_no,        
        set_no: set_no             
    },success: function (data) {
    	console.log(data)
        $(data).find('string').each(function() {
        	var res=JSON.parse($(this).text());
        		var main_ins=res[0].main_instruction,
        			minor_ins=res[0].minor_instruction,
        			value=res[0].value;

				SetupsCommand(equip_no,main_ins,minor_ins,value)

        		

        });
    },
        complete:function(){
            $("#loading").hide()
            $("#jinJia .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
        }

	});
}
function SetupsCommand(equip_no,main_ins,minor_ins,value){
	$.ajax({
    type: "POST",
    url: "/GWService.asmx/SetupsCommand",
    timeout: 5000,
    data: {            
        equip_no: equip_no,        
        main_instruction: main_ins,        
        minor_instruction:minor_ins,     
        value: value,        
        user_name: window.localStorage.userName
    },
    success: function (data) {
//  	console.log(data)
   
       	$("#loading").hide();
		$("#jinJia .btnTouch").removeClass("bgDown");
		$("#jinJia .btnTouch").find("p,i").css({color:"#34cbbd"});
        
    },
	    complete:function(){
	    	$("#loading").hide()
	    	$("#jinJia .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	    }
});
}
function doAndLink(equip_no,set_no,links){
	$.ajax({
    type: "POST",
    url: "/GWService.asmx/GetSetParmItem",
    timeout: 5000,
    data: {
    	equip_no: equip_no,        
        set_no: set_no             
    },success: function (data) {

        $(data).find('string').each(function() {
        	var res=JSON.parse($(this).text());
        		var main_ins=res[0].main_instruction,
        			minor_ins=res[0].minor_instruction,
        			value=res[0].value;
				$.ajax({
					    type: "POST",
					    url: "/GWService.asmx/SetupsCommand",
					    timeout: 5000,
					    data: {
					    	equip_no: equip_no,        
					        main_instruction: main_ins,               
					        minor_instruction:minor_ins,            
					        value:value,               
					        user_name: window.localStorage.userName
					    },success: function (data) {
					        $(data).find('string').each(function() {
					        		$("#loading").hide();
					        		$("#jinJia .btnTouch").removeClass("bgDown");
					        		$("#jinJia .btnTouch").find("p,i").css({color:"#34cbbd"})	
					        		mainView.router.loadPage(links)
					        });
					    }
				
					});	
        });
    }
	});
			
}
function loadPage(dom){
    doAndLink(300,22,"")
    $(dom).removeClass("bgDown").css({color:"#f8c936"});
    // mainView.router.loadPage("smartProduct.html");

}

//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        }
        else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}


function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
}
var isVoices = false;
function onTouchStart(event) {
     event.preventDefault();
$("#voiceSwit_ho").addClass("cirlbgDown").find("i").css({color:"#f8c936"})
$("#voiceMessage_ho").html("");
   $("#voiceMessage_ho").show();
    $("#wavaPos").hide()
    $("#waveAnim_ho").show();
    //$(".voicetest").html("已按下");
    try {
        isVoices = true;
        if (window.localStorage.voiceList == "0") {
            myJavaFun.StartVice();
        }
        else {
            myJavaFun.StartVoice(window.localStorage.voiceList);
        }
    } catch (ex) {
        $("#voiceMessage_ho").html("无法使用此功能，请下载最新app！");
    }
}
//释放手指并识别语音
function onTouchEnd() {
	$("#voiceSwit_ho").removeClass("cirlbgDown").find("i").css({color:"#34cbbd"})
    if (!isVoices) {
        return;
    }
    if ($(this).hasClass("voiceActive")) {

        $("#voiceMessage_ho").show();

        $("#waveAnim_ho").hide();

    }
$("#voiceMessage_ho").show()
	$("#waveAnim_ho").hide();
//	$("#wavaPos").show();
    document.getElementById("voiceSwit_ho").removeEventListener('touchstart', onTouchStart);
    document.getElementById("voiceSwit_ho").removeEventListener('touchend', onTouchEnd);
    setTimeout(function () {
        try {
            if (window.localStorage.voiceList == "0") {
                myJavaFun.StopVice();
            }
            else {
                myJavaFun.StopVoice();
            }
        } catch (ex) {
            isVoices = false;
            $("#voiceMessage_ho").html("无法使用此功能，请下载最新app！");
            document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
            document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
            setTimeout(function () {
                if (isVoices == false) {
                    $("#voiceMessage_ho").html("按住说话");
                    document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
                    document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}

//接收回调数据并上传至服务器
function callbackVoiceBuffer(dt) {
    var _url = "/GWServices.asmx/ServiceSetVCtrol";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            $("#voiceMessage_ho").html("未识别！");
            setTimeout(function(){
            	$("#voiceMessage_ho").hide();
            },2000)
        }
        else {
        	
            $("#voiceMessage_ho").html(rets);
            setTimeout(function(){
            	$("#voiceMessage_ho").hide();
            },2000)
        }
        isVoices = false;
        document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        $("#voiceMessage_ho").html("服务器出错！");
        isVoices = false;
        document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                $("#voiceMessage_ho").html("按住说话");
            }
        }, 3000);
    }
}

function StartVoiceXF() {
    try {
        $("#voiceBtn_xf").unbind();
        $("#voiceBtn_xf").addClass("disabled");
        $("#waveAnim_xf").show();
        $("#voiceMessage_xf1").hide();
        $("#voiceMessage_xf2").hide();
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    }
    catch (ex) {
        $("#waveAnim_xf").hide();
        $("#voiceMessage_xf1").html("无法使用此功能！");
        $("#voiceBtn_xf").removeClass("disabled");
        $("#voiceMessage_xf1").show();
        $("#voiceMessage_xf2").html("");
        $("#voiceMessage_xf2").show();
    }
}
function callbackVoiceXFMessage(dt) {
    $("#voiceMessage_ho").html(dt);
    $("#voiceMessage_ho").show();
    $("#waveAnim_ho").hide();
//   $("#wavaPos").show();
    isVoices = false;
    document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
}
function callbackVoiceXFData(dt) {
    var _url = "/GWServices.asmx/ServiceSetVCtrol1";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);
    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            $("#voiceMessage_ho").html("处理：未识别！");
            setTimeout(function(){
            	$("#voiceMessage_ho").hide();
            },2000)
        }
        else {
            $("#voiceMessage_ho").html("处理：" + rets);
            setTimeout(function(){
            	$("#voiceMessage_ho").hide();
            },2000)
        }
        isVoices = false;
        document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
    }
    function _error(qXHR, textStatus, errorThrown) {
        $("#voiceMessage_ho").html("服务器出错！");
        isVoices = false;
        document.getElementById("voiceSwit_ho").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceSwit_ho").addEventListener('touchend', onTouchEnd);
        setTimeout(function () {
            if (isVoices == false) {
                $("#voiceMessage_ho").html("按住说话");
            }
        }, 3000);
    }
}