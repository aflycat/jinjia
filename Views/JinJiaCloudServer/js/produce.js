$(function() {
	getProjectPlan();
	meterCharts('dsahChartId1', '中华香烟', '#0B8ADA', '#46D0BF', 70);
	meterCharts('dsahChartId2', 'vivo手机盒', '#B6D11D', '#18D401', 90);
	meterCharts('dsahChartId3', 'xx包装盒', '#048ACA', '#2BD466', 53);
	getDuiZhuChart("duiZhuChartId");
	getZheCharts("zheAreaChartId");
});

function getZheCharts(id) {
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
	var myChart = echarts.init(document.getElementById(id));
	var inDataTime = [];
	var inDataValue = [];
	for(var i = 0; i < indata.success.length; i++) {
		inDataTime.push(getNowFormatDate((i+1)*5));
		inDataValue.push(conver(indata.success[i].value));
	}
	var outDataTime = [];
	var outDataValue = [];
	for(var i = 0; i < outdata.success.length; i++) {
		outDataTime.push(formatTime(outdata.success[i].timestamp));
		outDataValue.push(conver(outdata.success[i].value));
	}

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: '#57617B'
				}
			}
		},
		legend: {
			show:false
		},
		grid: {
			top: '5%',
			left: '5%',
			right: '5%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			boundaryGap: false,
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
				margin: 12,
				color: '#E0E2E2',
				fontSize: 20
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
			data: ['中华香烟1','vivo手机盒1','vivo手机盒2','xx包装盒1','xx包装盒2']
		},
		yAxis: [{
			type: 'value',
			max:100,
			axisLine: {
				show: false
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 15,
				color: '#E0E2E2',
				fontSize: 20
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#E3E3E9'],
					width: 1,
					type: 'dashed'
				}
			},
		}],
		series: [{
				name: '室内平均温度',
				type: 'line',
				smooth: false,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				hoverAnimation: false,
				lineStyle: {
					normal: {
						width: 5,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: 'rgba(93, 51, 233, 1)'
						}, {
							offset: 0.8,
							color: 'rgba(22, 231, 236, 1)'
						}], false),
						
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: 'rgba(93, 51, 233, .6)'
						}, {
							offset: 0.8,
							color: 'rgba(22, 231, 236, .6)'
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
				data: ['40','50','100','35','55']
			}
		]
	};
	myChart.setOption(option);
}

function getDuiZhuChart(id) {
	var myChart = echarts.init(document.getElementById(id));
	option = {
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
				var relVal = params[0].name;
				var value = 0;
				for(var i = 0, l = params.length; i < l; i++) {
					value += params[i].value;
				}
				for(var i = 0, l = params.length; i < l; i++) {
					relVal += '<br/>' + params[i].seriesName + ' : ' + (100 * parseFloat(params[i].value) / parseFloat(value)).toFixed(2) + "%";
				}
				return relVal;
			},
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			show: false
		},
		grid: {
			top: '5%',
			left: '0%',
			right: '2%',
			bottom: '2%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true,
				lineStyle: {
					color: '#587691',
					width: 2,
					type: 'solid'
				}
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 12,
				color: '#E0E2E2',
				fontSize: 20
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			data: ['1区', '2区', '3区', '4区', '5区', '6区', '7区', '8区', '9区', '10区']
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				show: false
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 12,
				color: '#E0E2E2',
				fontSize: 20
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ['#E3E3E9'],
					width: 1,
					type: 'dashed'
				}
			},
		}],
		series: [{
				name: '百度',
				type: 'bar',
				barWidth: '40%',
				stack: '搜索引擎',
				itemStyle: {
					normal: {
						show: true,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: '#95A632'
						}, {
							offset: 1,
							color: 'yellow'
						}]),
						shadowColor: 'rgba(0, 0, 0, 0.4)',
						shadowBlur: 20
					}
				},
				data: [220, 332, 301, 334, 290, 330, 320, 320, 320, 320]
			},
			{
				name: '必应',
				type: 'bar',
				stack: '搜索引擎',
				itemStyle: {
					normal: {
						show: true,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: '#79423A'
						}, {
							offset: 1,
							color: '#DE674A'
						}]),
						shadowColor: 'rgba(0, 0, 0, 0.4)',
						shadowBlur: 20
					}
				},
				data: [60, 72, 71, 74, 190, 130, 110, 110, 110, 110]
			},
			{
				name: '谷歌',
				type: 'bar',
				stack: '搜索引擎',
				itemStyle: {
					normal: {
						show: true,
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: '#1198AD'
						}, {
							offset: 1,
							color: '#53EBFD'
						}]),
						shadowColor: 'rgba(0, 0, 0, 0.4)',
						shadowBlur: 20
					}
				},
				data: [120, 132, 101, 134, 290, 230, 220, 230, 220, 220]
			}
		]
	};
	myChart.setOption(option);
}

function meterCharts(id, title, color1, color2, value) {
	var myChart = echarts.init(document.getElementById(id));
	option = {
		title: {
			//show:false,
			x: "center",
			y: '72%',
			text: title,
			textStyle: {
				fontSize: 36,
				fontWeight: '500',
				color: '#DDDEE0' // 主标题文字颜色
			}
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		series: [{
			name: '指标',
			type: 'gauge',
			max: 100,
			startAngle: 180, //总的360，设置180就是半圆
			endAngle: 0,
			radius: '90%',
			center: ['50%', '65%'], //整体的位置设置
			splitNumber: 10,
			axisLine: {
				lineStyle: {
					width: 5, //柱子的宽度
					color: [
						[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#37AE6C'
						}, {
							offset: 1,
							color: '#1FAECC'
						}])]
					]
				}
			},
			axisTick: {
				splitNumber: 5,
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
			},
			splitLine: {
				length: 20,
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
			},
			axisLabel: {
				distance: -52,
				color: ['#37AE6C', '#1FAECC'],
				fontSize: 18,
				formatter: function(param) {
					return param
				}
			},
			pointer: {
				width: 8, //指针的宽度
				length: '62%', //指针长度，按照半圆半径的百分比
			},
			detail: {
				show: false
			},
			data: [{
				value: value,
			}]
		}, {
			name: '指标',
			type: 'gauge',
			max: 100,
			startAngle: 180, //总的360，设置180就是半圆
			endAngle: 0,
			center: ['50%', '65%'], //整体的位置设置
			radius: '62%',
			splitNumber: 10,
			axisLine: {
				lineStyle: {
					width: 5, //柱子的宽度
					color: [
						[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#37AE6C'
						}, {
							offset: 1,
							color: '#1FAECC'
						}])],
						[1, '#8493A8']
					]
				}
			},
			axisTick: {
				show: false
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
			}
		}]
	};
	myChart.setOption(option);
}

function getProjectPlan() {
	var timeData = {
		"msg": "",
		"data": [{
			"month": "2018-01",
			"date": "28,29,30,31"
		}, {
			"month": "2018-02",
			"date": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
		}],
		"ok": true
	};
	var planData = {
		"msg": "",
		"data": [{
			"plan_name": "中华香烟1",
			"plan_times": "28,29,30,31"
		}, {
			"plan_name": "vivo手机盒1",
			"plan_times": "1,2,3,4,5,6"
		}, {
			"plan_name": "vivo手机盒2",
			"plan_times": "31,1,2,3,4,5,6,7,8,9,10"
		}, {
			"plan_name": "xx包装盒1",
			"plan_times": "2,3,4,5,6,7,8"
		}, {
			"plan_name": "xx包装盒2",
			"plan_times": "9,10,11,12,13,14"
		}],
		"ok": true
	}
	var timeResultData = timeData.data;
	console.log(timeResultData);
	$("#planTableId tr th").attr("colspan", timeResultData.length + 1);
	$("#planTableId2 tr th").attr("colspan", timeResultData.length + 1);
	var dateArr = [];
	var strTimeData = "";
	for(var i = 0; i < timeResultData.length; i++) {
		dateArr = timeResultData[i].date.split(",");
		strTimeData += "<div class='table-content-header'>" + timeResultData[i].month + "</div><ul class='table-content-time'>";
		for(var j = 0; j < dateArr.length; j++) {
			strTimeData += "<li>" + dateArr[j] + "</li>"
		}
		strTimeData += "</ul>";
		$("#planTableId .table-content").eq(i).html(strTimeData);
		$("#planTableId2 .table-content").eq(i).html(strTimeData);
		strTimeData = "";
	}

	/*var planResultData = planData.data;
	var planArr=[];
	var strPlanData="";
	for(var i = 0; i < planResultData.length; i++) {
		strPlanData+="<tr><td>"+planResultData[i].plan_name+"</td><td><span class='produce-plan-design'></span></td><td></td></tr>";
		planArr=planResultData[i].date.split(",");
		strTimeData+="<div class='table-content-header'>"+timeResultData[i].month+"</div><ul class='table-content-time'>";
		for(var j=0;j<dateArr.length;j++){
			strTimeData+="<li>"+dateArr[j]+"</li>"
		}
		strTimeData+="</ul>";
		$("#planTableId .table-content").eq(i).html(strTimeData);
		strTimeData="";
	}*/
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

function getUnixTime(stdTime) {
	return Math.round(Date.parse(stdTime) / 1000)
}