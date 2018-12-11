$(function() {
	initConnectService();
	getZheCharts();
});

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
				getTemperature();
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

//实时温度趋势图表
function getZheCharts() {
	var outdata = {
		"message": "ok",
		"success": [{
			"timestamp": 1517016060,
			"value": 55041.333333333336
		}, {
			"timestamp": 1517016120,
			"value": 59392.26666666667
		}, {
			"timestamp": 1517016180,
			"value": 63010.666666666664
		}, {
			"timestamp": 1517016240,
			"value": 61314.4
		}, {
			"timestamp": 1517016300,
			"value": 62923.066666666666
		}, {
			"timestamp": 1517016360,
			"value": 62063.866666666665
		}, {
			"timestamp": 1517016420,
			"value": 61240.4
		}, {
			"timestamp": 1517016480,
			"value": 68407.2131147541
		}, {
			"timestamp": 1517016540,
			"value": 64823.18644067796
		}, {
			"timestamp": 1517016600,
			"value": 63034.62295081967
		}, {
			"timestamp": 1517016660,
			"value": 63481.35593220338
		}, {
			"timestamp": 1517016660,
			"value": 61481.35593220338
		}]
	};
	var indata = {
		"message": "ok",
		"success": [{
			"timestamp": 1517016480,
			"value": 39733.245901639344
		}, {
			"timestamp": 1517016540,
			"value": 36796.20338983051
		}, {
			"timestamp": 1517016600,
			"value": 38541.508196721312
		}, {
			"timestamp": 1517016660,
			"value": 34785.76271186441
		}, {
			"timestamp": 1517016720,
			"value": 40354.53333333333
		}, {
			"timestamp": 1517016780,
			"value": 39972.666666666664
		}, {
			"timestamp": 1517016840,
			"value": 43770.26666666667
		}, {
			"timestamp": 1517016900,
			"value": 44413.46666666667
		}, {
			"timestamp": 1517016960,
			"value": 39439.60655737705
		}, {
			"timestamp": 1517017020,
			"value": 40133.69491525424
		}, {
			"timestamp": 1517017080,
			"value": 41990.66666666667
		}, {
			"timestamp": 1517017140,
			"value": 82104.13333333333
		}]
	}
	var myChart = echarts.init(document.getElementById("temperatureCharts"));
	var inDataTime = [];
	var inDataValue = [];
	for(var i = 0; i < indata.success.length; i++) {
		inDataTime.push(getNowFormatDate((i + 1) * 5));
		inDataValue.push(conver(indata.success[i].value));
	}
	var outDataTime = [];
	var outDataValue = [];
	for(var i = 0; i < outdata.success.length; i++) {
		outDataTime.push(formatTime(outdata.success[i].timestamp));
		outDataValue.push(conver(outdata.success[i].value));
	}

	option = {
		title: {
			text: '实时温度趋势',
			left: 'center',
			top: '40',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 45,
				fontWeight: '500',
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: '#57617B'
				}
			}
		},
		legend: {
			show: false,
		},
		grid: {
			top: '22%',
			left: '1%',
			right: '3%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			position: 'left',
			nameLocation: 'end',
			nameTextStyle: {},
			boundaryGap: false,
			splitNumber: 12,
			axisLine: {
				show: true,
				lineStyle: {
					color: '#3BE0FB',
					width: 2,
					type: 'solid'
				}
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 8,
				color: '#3BE0FB',
				fontSize: 26
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: ['#3BE0FB'],
					width: 1,
					type: 'solid'
				}
			},
			splitArea: {
				show: false
			},
			data: inDataTime.reverse()
		},
		yAxis: [{
			type: 'value',
			//			name: '单位（°C）',

			max: 45,
			axisLine: {
				show: true,
				lineStyle: {
					color: '#3BE0FB',
					width: 2,
					type: 'solid'
				}
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 8,
				color: '#3BE0FB',
				fontSize: 26
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ['rgba(240, 240, 240,.3)'],
					width: 2,
					type: 'dashed'
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(21, 71, 98,.6)']
				}
			}
		}],
		series: [{
			name: '室内平均温度',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showSymbol: false,
			hoverAnimation: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(60, 221, 248, 0.7)'
					}, {
						offset: 0.8,
						color: 'rgba(60, 221, 248, 0.1)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.5)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: 'rgb(60, 221, 248)',
					borderColor: 'rgba(60, 221, 248,0)',
					borderWidth: 6

				}
			},
			data: outDataValue
		}]
	};
	myChart.setOption(option);
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