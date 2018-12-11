$(function() {
	getManufacturePlanOneChart("manufacturePlanOneId","#165672");
	getManufacturePlanOneChart2("manufacturePlanTwoId","#244A6F");
	meterCharts('dsahChartId1', '中华香烟', '#0B8ADA', '#46D0BF', 70);
	meterCharts('dsahChartId2', 'vivo手机盒', '#B6D11D', '#18D401', 90);
	meterCharts('dsahChartId3', 'xx包装盒', '#048ACA', '#2BD466', 53);
});

function getManufacturePlanOneChart2(id,backgroundColor) {
	var myChart = echarts.init(document.getElementById(id));
	option = {
		backgroundColor: backgroundColor,
		title: {
			
		},
		grid: {
			left: '1%',
			top: '0%',
			right: '3%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: false,
			axisTick: {
				show: false,
				inside: true, // 控制小标记是否在grid里 
				length: 0, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#545766',
					width: 2
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#fff'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#B8C2CB',
					width: 1,
				}
			},
			axisLabel: {
				show: true,
				margin: 20,
				color: '#fff',
				fontSize: 16,
				formatter: function(value, i) {
					var data = ['2018-03-20', '2018-03-25', '2018-03-30', '2018-04-05', '2018-04-10', '2018-04-10', '2018-04-20'];
					return data[i].substring(5, 10).replace("-", "/") + '\n' + data[i].substring(0, 4);
				}
			}
		},
		yAxis: {
			type: 'category',
			nameTextStyle: {
				color: '#ffffff',
				fontSize: '16',
			},
			axisLabel: {
				show: true,
				margin: 20,
				color: '#FFFCFF',
				fontSize: 18,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#FFFCFF'
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#B8C2CB',
					width: 1,
				}
			},
			data: ['vivo手机盒', '镭射材料','卷烟包装','智能电子', '酒类包装','中华香烟']
		},
		color:['#0AFAF7','#EDF91D','#B42A3A'],
		series: [{
				type: 'bar',
				barWidth: '42%',
				stack: '计划',
				label:{
					show:false,
				},
				itemStyle: {
					normal: {
						barBorderColor: 'rgba(0,0,0,0)',
						color: 'rgba(0,0,0,0)'
					},
					emphasis: {
						barBorderColor: 'rgba(0,0,0,0)',
						color: 'rgba(0,0,0,0)'
					}
				},
				data: [3, 1, 10, 8, 5, 7]
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: [5, '-', '-', '-', 7, '-']
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: ['-', 5, '-', '-', '-', 3]
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: ['-', '-', 10, 6, '-', '-']
			}
		]
	};
	myChart.setOption(option);
}

function getManufacturePlanOneChart(id,backgroundColor) {
	var myChart = echarts.init(document.getElementById(id));
	option = {
		backgroundColor: backgroundColor,
		title: {
			
		},
		grid: {
			left: '1%',
			top: '0%',
			right: '3%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: false,
			axisTick: {
				show: false,
				inside: true, // 控制小标记是否在grid里 
				length: 0, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#545766',
					width: 2
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#fff'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#B8C2CB',
					width: 1,
				}
			},
			axisLabel: {
				show: true,
				margin: 20,
				color: '#fff',
				fontSize: 16,
				formatter: function(value, i) {
					var data = ['2018-03-20', '2018-03-25', '2018-03-30', '2018-04-05', '2018-04-10', '2018-04-10', '2018-04-20'];
					return data[i].substring(5, 10).replace("-", "/") + '\n' + data[i].substring(0, 4);
				}
			}
		},
		yAxis: {
			type: 'category',
			nameTextStyle: {
				color: '#ffffff',
				fontSize: '16',
			},
			axisLabel: {
				show: true,
				margin: 20,
				color: '#FFFCFF',
				fontSize: 18,
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#FFFCFF'
				}
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#B8C2CB',
					width: 1,
				}
			},
			data: ['vivo手机盒', '镭射材料','卷烟包装','智能电子', '酒类包装','中华香烟']
		},
		color:['#0AFAF7','#EDF91D','#B42A3A'],
		series: [{
				type: 'bar',
				barWidth: '42%',
				stack: '计划',
				label:{
					show:false,
				},
				itemStyle: {
					normal: {
						barBorderColor: 'rgba(0,0,0,0)',
						color: 'rgba(0,0,0,0)'
					},
					emphasis: {
						barBorderColor: 'rgba(0,0,0,0)',
						color: 'rgba(0,0,0,0)'
					}
				},
				data: [8, 7, 6, 4, 5, 0]
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: [10, '-', '-', '-', 5, '-']
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: ['-', 7, '-', '-', '-', 4]
			},
			{
				type: 'bar',
				stack: '计划',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: ['-', '-', 5, 10, '-', '-']
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
			y: '74%',
			text: title,
			textStyle: {
				fontSize: 30,
				fontWeight: '500',
				color: '#DCE0E1' // 主标题文字颜色
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
			radius: '80%',
			center: ['50%', '65%'], //整体的位置设置
			splitNumber: 10,
			axisLine: {
				lineStyle: {
					width: 5, //柱子的宽度
					color: [
						[1, new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
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
					color: 'auto',
					width: 2
				}
			},
			splitLine: {
				length: 20,
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto'
				}
			},
			axisLabel: {
				distance: -50,
				color: ['#37AE6C', '#1FAECC'],
				fontSize: 15,
				formatter: function(param) {
					return param
				}
			},
			pointer: {
				width: 8, //指针的宽度
				length: '62%', //指针长度，按照半圆半径的百分比
			},
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 1,
						color: '#F0C239'
					}, {
						offset: 0.3,
						color: '#DF303F'
					}], false)
				}
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
			radius: '52%',
			splitNumber: 10,
			axisLine: {
				lineStyle: {
					width: 5, //柱子的宽度
					color: [
						[1, new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
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

function planTimeFormatter(oldTime) {
	if(oldTime != null && oldTime != "") {
		var newTime = oldTime.substring(0, 4) + oldTime.substring(6, 10)
	} else {
		return "";
	}
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