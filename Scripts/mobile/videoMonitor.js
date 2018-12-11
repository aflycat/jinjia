
function videoMonitor(){
	$("#videoMonitor .touchBtn").each(function(){
		$(this).off().click(function(){
			var hasDown=$(this).hasClass("bgDown");
			var eq_no=$(this).attr("eq_no");
			var set_no=$(this).attr("set_no");
			if(hasDown){
				$(this).removeClass("bgDown");
				$(this).find("p,i").css({color:"#34cbbd"})
			}else{
				$(this).addClass("bgDown");
				$(this).find("p,i").css({color:"#f8c936"})
				$("#loading").show()
				GetSetParmItemVid(eq_no,set_no)
				// $("#loading").hide()
	   //  		$("#videoMonitor .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
			}
		})
	})

	
}
function GetSetParmItemVid(eq_no,set_no){
	$.ajax({
    type: "POST",
    url: "/GWService.asmx/GetSetParmItem",
    timeout: 5000,
    data: {        
        equip_no: eq_no,        
        set_no: set_no
    },success: function (data) {
        $(data).find('string').each(function() {
        	var txt=$(this).text();          
           if(txt!=""){
           		var res=JSON.parse($(this).text());
           		var main_ins=res[0].main_instruction,
        			minor_ins=res[0].minor_instruction,
        			value=res[0].value;
				SetupsCommandVid(eq_no,main_ins,minor_ins,value)
           }
        		
        });
    },complete:function(){
    		console.log(1)
	    	$("#loading").hide()
	    	$("#videoMonitor .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	    }
	});
}
function SetupsCommandVid(eq_no,main_ins,minor_ins,value){
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
	    	$("#videoMonitor .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	       
	   },
	    complete:function(){
	    	$("#loading").hide()
	    	$("#videoMonitor .touchBtn").removeClass("bgDown").find("p,i").css({color:"#34cbbd"});
	    }

	});
}
