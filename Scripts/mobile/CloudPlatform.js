function CloudPlatform(){
	$("#CloudPlat .touchBtn").each(function(){
		$(this).off().click(function(){
			var hasDown=$(this).hasClass("bgDown");
			var eq_no=$(this).attr("eq_no");
    		var set_no=$(this).attr("set_no");
			console.log(eq_no,set_no)
			if(hasDown){
				$(this).removeClass("bgDown");
				$(this).find("p,i").css({color:"#34cbbd"})
			}else{
				$(this).addClass("bgDown");
				$(this).find("p,i").css({color:"#f8c936"})
				
				if(eq_no!=""&&set_no!=""){
					$("#loading").show()
					GetSetParmItemClo(eq_no,set_no)
				}else{
					$("#CloudPlat .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
				}
				

			}
		})
	})
//	document.getElementById("voiceSwit_clo").addEventListener('touchstart', onTouchStart);
//  document.getElementById("voiceSwit_clo").addEventListener('touchend', onTouchEnd);
}
function GetSetParmItemClo(eq_no,set_no){
	$.ajax({
    type: "POST",
    url: "/GWService.asmx/GetSetParmItem",
    timeout: 5000,
    data: {        
        equip_no: eq_no,        
        set_no: set_no
    },
    success: function (data) {
        $(data).find('string').each(function() {
           var res=JSON.parse($(this).text());
        		var main_ins=res[0].main_instruction,
        			minor_ins=res[0].minor_instruction,
        			value=res[0].value;
        		console.log(eq_no,main_ins,minor_ins,value)
				SetupsCommandClo(eq_no,main_ins,minor_ins,value)
        });
    },
	    complete:function(){
	    	$("#loading").hide()
	    	$("#CloudPlat .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	    }
});
}
function SetupsCommandClo(eq_no,main_ins,minor_ins,value){
	$.ajax({
	    type: "POST",
	    url: "/GWService.asmx/SetupsCommand",
	    timeout: 5000,
	    data: {            
	        equip_no: eq_no,        
	        main_instruction: main_ins,        
	        minor_instruction: minor_ins,     
	        value: value,        
	        user_name: window.localStorage.userName
	    },
	    success: function (data) {
	    	console.log(data)
	    	$("#loading").hide()
	    	$("#CloudPlat .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	       
	   },
	    complete:function(){
	    	$("#loading").hide()
	    	$("#CloudPlat .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	    }

	});
}
