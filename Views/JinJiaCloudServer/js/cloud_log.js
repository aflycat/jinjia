$(function() {
	getNewAddResource();
	getOperatorLogs();
});

//获取当日资源新增、删除数量
function getNewAddResource() {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8099/api/JinJiaApi/GetResourceInfo',
		data: null,
		cache: false,
		timeout: 5000,
		success: function(data) {
			var resultData = JSON.parse(data.HttpData);
			result = resultData.data;
			for(var i = 0; i < result.length; i++) {
				if(result[i].resource_type == "instance") {
					$("#instanceAddId").html(result[i].created);
					$("#instanceDeletelId").html(result[i].deleted);
				} else if(result[i].resource_type == "volume") {
					$("#volumeAddId").html(result[i].created);
					$("#volumeDeletelId").html(result[i].deleted);
				} else if(result[i].resource_type == "network") {
					$("#networkAddId").html(result[i].created);
					$("#networkDeletelId").html(result[i].deleted);
				} else if(result[i].resource_type == "router") {
					$("#routerAddId").html(result[i].created);
					$("#routerDeletelId").html(result[i].deleted);
				}
			}
		}
	});
}

//获取操作日志列表
function getOperatorLogs() {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8099/api/JinJiaApi/OperateLog',
		data: null,
		cache: false,
		timeout: 5000,
		success: function(data) {
			var resultData = JSON.parse(data.HttpData);
			result = resultData.data.logs;
			var strData = "";
			for(var i = 0; i < result.length; i++) {
				var strOperator = "";
				if(result[i].resources != null) {
					strOperator += result[i].operation + " " + result[i].resources.resources[0].type + " " + result[i].resources.resources[0].name;
				} else {
					strOperator += result[i].operation;
				}
				if(i == 9) {
					strData += '<li class="operator-log-dark operator-log-light"><div class="content-list"><div class="content-list-left"><div class="list-header">' +
						result[i].start_time +
						"</div><div class='list-desc'>" + strOperator + "</div></div>";
				} else {
					strData += '<li class="operator-log-dark"><div class="content-list"><div class="content-list-left"><div class="list-header">' +
						result[i].start_time +
						"</div><div class='list-desc'>" + strOperator + "</div></div>";
				}

				if(result[i].result == "Success" || result[i].result == "成功") {
					strData += '<div class="content-list-right"><div class="list-user">' +
						result[i].operator_name +
						'</div><div class="list-result color-success">\u6210\u529F</div></div></div></li>';
				} else {
					strData += '<div class="content-list-right"><div class="list-user">' +
						result[i].operator_name +
						'</div><div class="list-result color-fail">\u5931\u8D25</div></div></div></li>';
				}
			}
			var resultLength = result.length;
			$("#operatorLogId").html(strData);
			$('#testId').animate({
				scrollTop: (height / 6 + 2) * resultLength
			}, 0);
			var MyMar = setInterval(Marquee, 5000);
			var countNum = resultLength - 6;
			var boxIdscrollTop = 0;
			var height = $("#operatorLogId").height();
			$('#operatorBoxId').animate({
				scrollTop: (height / 6 + 2) * 15
			}, 0);
			var realScrollTopValue = document.getElementById("operatorBoxId").scrollTop;

			function Marquee() {
				var operatorBoxId = document.getElementById("operatorBoxId");
				var operatorLogId = document.getElementById("operatorLogId");
				var height = $("#operatorLogId").height();
				if(operatorBoxId.scrollTop <= 2 * resultLength || countNum == 0) {
					operatorBoxId.scrollTop = realScrollTopValue;
					countNum = resultLength - 6;
					boxIdscrollTop = 0;
					$("#operatorLogId li").eq(9).addClass("operator-log-light animated bounceInDown");
					$("#operatorLogId li").eq(0).removeClass("operator-log-light animated bounceInDown");
				} else {
					$("#operatorLogId li").eq(countNum).removeClass("operator-log-light animated bounceInDown");
					countNum--;
					boxIdscrollTop += height / 6 + 2;
					$('#operatorBoxId').animate({
						scrollTop: realScrollTopValue - boxIdscrollTop
					}, 800);
					$("#operatorLogId li").eq(countNum).addClass("operator-log-light animated bounceInDown");
				}
			}
		}
	});
}


//Unix时间戳转换为普通时间
function formatTime(time) {
	let unixtime = time
	let unixTimestamp = new Date(unixtime * 1000);
	var h = unixTimestamp.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = unixTimestamp.getMinutes();
	return h + ':' + minute;
}

//单位转换 KB转MB
function conver(limit) {
	var size = "";
	size = (limit / (1024 * 1024)).toFixed(2);

	var sizestr = size + "";
	var len = sizestr.indexOf("\.");
	var dec = sizestr.substr(len + 1, 2);
	if(dec == "00") { //当小数点后为00时 去掉小数部分  
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
	}
	return sizestr;
}

//获取当前时间
function getCurrentTime() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

//获取前n分钟时间
function getNowFormatDate(numValue) {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	//前十分钟时间
	var minutes = parseInt(numValue);

	var interTimes = minutes * 60 * 1000;

	var interTimes = parseInt(interTimes);
	date = new Date(Date.parse(date) - interTimes);

	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if(minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + hour + seperator2 + minutes +
		seperator2 + date.getSeconds();
	return currentdate;
}

//获取unix时间戳
function getUnixTime(stdTime) {
	return Math.round(Date.parse(stdTime) / 1000)
}