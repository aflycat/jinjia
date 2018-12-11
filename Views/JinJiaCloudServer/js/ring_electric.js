$(function() {
	initConnectService();
//		meterCharts('ApowerId', '223', 'A');
});

//报警状态
function getErrorStatus() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/GetRealTimeData",
		timeout: 5000,
		data: {
			equip_no: "16",
			table_name: "ycp"
		},
		success: function(data) {
			$(data).find('string').each(function() {
				var result = JSON.parse($(this).text());
				var errorNum = 0;
				var warnNum = 0;
				for(var i = 0; i < result.length; i++) {
					if(result[i].m_YCValue.indexOf("通讯正常") > -1) {

					} else if(result[i].m_YCValue.indexOf("通讯中断") > -1) {
						errorNum++;
					} else {
						warnNum++;
					}
				}
				$("#errorNumId").html(errorNum);
				$("#warnNumId").html(warnNum);
			});
		}
	});
}

//漏水状态
function getWaterInfo() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/GetRealTimeData",
		timeout: 5000,
		data: {
			equip_no: "1",
			table_name: "ycp"
		},
		success: function(data) {
			$(data).find('string').each(function() {
				var result = JSON.parse($(this).text());
				var count = 0;
				for(var i = 0; i < result.length; i++) {
					if(result[i].m_YCNm.indexOf("漏水状态") > -1) {
						if(result[i].m_YCValue.indexOf("无告警") > -1) {
							count++;
						}
					}
				}
				if(count == 2) {
					$("#waterStausId").removeClass("color-abnormal");
					$("#waterStausId").addClass("color-normal");
					$("#waterStausId").html("正常");
				} else {
					$("#waterStausId").removeClass("color-abnormal");
					$("#waterStausId").addClass("color-normal");
					$("#waterStausId").html("异常");
				}

			});
		}
	});
}

//平均温度
function getTemperature() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/GetRealTimeData",
		timeout: 5000,
		data: {
			equip_no: "2",
			table_name: "ycp"
		},
		success: function(data) {
			$(data).find('string').each(function() {
				var result = JSON.parse($(this).text());
				var sumValue = 0;
				var count = 0;
				for(var i = 0; i < result.length; i++) {
					if(result[i].m_YCNm.indexOf("温度") > -1) {
						sumValue += parseFloat(result[i].m_YCValue);
						count++;
					}
				}
				if(count > 0) {
					$("#avgTemperatureId").html(parseInt(sumValue / count) + "<font>°C</font>");
				}

			});
		}
	});
}

//获取供电状态及市电信息
function getPowerLists() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/GetRealTimeData",
		timeout: 5000,
		data: {
			equip_no: "3",
			table_name: "ycp"
		},
		success: function(data) {
			$(data).find('string').each(function() {
				var result = JSON.parse($(this).text());
				for(var i = 0; i < result.length; i++) {
					if(result[i].m_YCNm == "A相电压") {
						meterCharts('ApowerId', parseFloat(result[i].m_YCValue).toFixed(1), 'V');
					}
					if(result[i].m_YCNm == "B相电压") {
						meterCharts('BpowerId', parseFloat(result[i].m_YCValue).toFixed(1), 'V');
					}
					if(result[i].m_YCNm == "C相电压") {
						meterCharts('CpowerId', parseFloat(result[i].m_YCValue).toFixed(1), 'V');
					}
					if(result[i].m_YCNm == "A相电流") {
						meterCharts('AelectricId', parseFloat(result[i].m_YCValue).toFixed(1), 'A');
					}
					if(result[i].m_YCNm == "B相电流") {
						meterCharts('BelectricId', parseFloat(result[i].m_YCValue).toFixed(1), 'A');
					}
					if(result[i].m_YCNm == "C相电流") {
						meterCharts('CelectricId', parseFloat(result[i].m_YCValue).toFixed(1), 'A');
					}
				}
			});
		}
	});
}

//水球图表+刻度
function meterCharts(id, value, unit) {console.log(value,unit)
	var myChart = echarts.init(document.getElementById(id));
	option = {
		series: [{
			name: '指标',
			type: 'gauge',
			max: 100,
			startAngle: 360,
			endAngle: 0.0001,
			radius: '97%',
			center: ['50%', '50%'],
			splitNumber: 10,
			axisLine: {
				show: false,
				lineStyle: {
					width: 0,
					opacity: 0,
					color: [
						[0.1, '#99778E'],
						[0.2, '#B89C9B'],
						[0.3, '#C7C490'],
						[0.4, '#88A7A7'],
						[0.5, '#67A4C9'],
						[0.6, '#85ABB2'],
						[0.7, '#C2C890'],
						[0.8, '#A7A199'],
						[0.9, '#AE949A'],
						[1, '#AF7E98']
					]
				}
			},
			axisTick: {
				splitNumber: 5,
				length: 15,
				lineStyle: {
					color: 'auto',
					width: 2,
				}
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			},
			pointer: {
				show: false
			},
			detail: {
				show: false
			},
			data: [{
				value: '',
			}]
		}, {
			name: '指标',
			type: 'gauge',
			max: 100,
			startAngle: 360, //总的360，设置180就是半圆
			endAngle: 0.0001,
			radius: '100%',
			center: ['50%', '50%'], //整体的位置设置
			splitNumber: 10,
			axisLine: {
				show: false,
				lineStyle: {
					width: 0,
					opacity: 0
				}
			},
			axisTick: {
				show: false
			},
			splitLine: {
				length: 24,
				lineStyle: {
					color: '#568DAC',
					width: 2,
				}
			},
			axisLabel: {
				show: false
			},
			pointer: {
				show: false
			},
			detail: {
				show: false
			},
			data: [{
				value: 0,
			}]
		}, {
			type: 'liquidFill',
			color: ['#F5E315', '#1A9C87'],
			center: ['50%', '50%'],
			radius: '80%',
			amplitude: '8%',
			waveLength: '80%',
			phase: 'auto',
			period: 'auto',
			direction: 'right',
			shape: 'circle',

			waveAnimation: true,
			animationEasing: 'linear',
			animationEasingUpdate: 'linear',
			animationDuration: 2000,
			animationDurationUpdate: 1000,

			label: {
				position: ['50%', '50%'],
				formatter: function() {
					return '{labelValue|' + value + '}{labelUnit|' + unit + '}';
				},
				rich: {
					labelValue: {
						fontSize: 62,
						fontFamily: 'Digital-7 Mono',
						color: '#F5E315',
						insideColor: '#F5E315',
					},
					labelUnit: {
						padding: [0, 0, 0, 5],
						fontSize: 52,
						color: '#F5E315',
						insideColor: '#F5E315',
					}
				}
			},
			outline: {
				show: true,
				borderDistance: 8,

				itemStyle: {
					color: 'none',
					borderColor: '#294D99',
					borderWidth: 0,
					shadowBlur: 20,
					shadowColor: 'rgba(255, 0, 0, 0.25)'
				}
			},
			backgroundStyle: {
				color: 'rgba(224, 246, 255,0)'
			},
			itemStyle: {
				opacity: 0.95,
				shadowBlur: 50,
				shadowColor: 'rgba(0, 0, 0, 0.4)',
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgba(245, 227, 21, 0.7)'
				}, {
					offset: 0.3,
					color: 'rgba(26, 156, 135, 0.9)'
				}], false)
			},
			data: [0.5, 0.45]
		}]
	};
	myChart.setOption(option);
}

//连接服务器
function initConnectService() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/ConnectService",
		timeout: 5000,
		data: {
			user_name: 'admin',
		},
		success: function(data) {
			var datas = $(data).find("string").text();
			if(datas != null && datas != "" && datas != "false") {
				getPowerLists();
				getWaterInfo();
				getErrorStatus();
			}
		},
		complete: function(XMLHttpRequest, status) {
			if(status == 'timeout') {
				if(checkConnectNum < 3) {
					checkConnectNum++;
					initConnectService();
				} else {
					alert("数据服务暂未启动，请稍后再试...");
				}

			}
		}
	});
}


//Unix时间戳转换为普通时间
function formatTime(time) {
	var unixtime = time;
	var unixTimestamp = new Date(unixtime * 1000);
	var h = unixTimestamp.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = unixTimestamp.getMinutes();
	return h + ':' + minute;
}

//单位转换 KB转MB
function conver(limit) {
	var size = "";
	size = (limit / (1024) / 3).toFixed(2);

	var sizestr = size + "";
	var len = sizestr.indexOf("\.");
	var dec = sizestr.substr(len + 1, 2);
	if(dec == "00") { //当小数点后为00时 去掉小数部分  
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
	}
	return sizestr;
}

//获取前12个月份
function getAllTimes() {
	var dataArr = [];
	var data = new Date();
	var year = data.getFullYear();
	data.setMonth(data.getMonth() + 1) //获取到当前月份,设置月份
	for(var i = 0; i < 12; i++) {
		data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
		dataArr.push(data.getFullYear() + "-" + (data.getMonth() + 1) + '月')
	}
	return dataArr.reverse();
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
	var hour = date.getHours();
	var minutes = date.getMinutes();
	if(hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if(minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	var currentdate = hour + seperator2 + minutes;
	return currentdate;
}