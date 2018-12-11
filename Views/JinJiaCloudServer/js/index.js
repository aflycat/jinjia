$(function() {
	getNewAddResource();
	getResources();
	getOperatorLogs();
	getNetworkFlux();
	setInterval(getNetworkFlux, 60000);
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

//获取CPU等资源使用情况
function getResources() {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8099/api/JinJiaApi/GetUseInfo',
		data: null,
		cache: false,
		timeout: 5000,
		success: function(data) {
			var resultData = JSON.parse(data.HttpData);
			result = resultData.data;
			for(var i = 0; i < result.length; i++) {
				if(result[i].resource_type == "cpu") {
					$("#cpuTotalId").html(result[i].total);
					$("#cpuUseId").html(result[i].used);
					$("#cpuUnUseId").html(result[i].available);
					getHuanCharts("cpuRateCharts", result[i].ratio);
				} else if(result[i].resource_type == "memory") {
					$("#memoryTotalId").html((parseFloat(result[i].total) / 1024).toFixed(2));
					$("#memoryUseId").html((parseFloat(result[i].used) / 1024).toFixed(2));
					$("#memoryUnUseId").html((parseFloat(result[i].available) / 1024).toFixed(2));
					getHuanCharts("memoryRateCharts", result[i].ratio);
				} else if(result[i].resource_type == "storage") {
					$("#storageTotalId").html((parseFloat(result[i].total) / 1024).toFixed(2));
					$("#storageUseId").html((parseFloat(result[i].used) / 1024).toFixed(2));
					$("#storageUnUseId").html((parseFloat(result[i].available) / 1024).toFixed(2));
					getHuanCharts("storageRateCharts", result[i].ratio);
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

//获取实时网络流量
function getNetworkFlux() {
	var nowTime = getUnixTime(getNowFormatDate(1));
	var lastTime = getUnixTime(getNowFormatDate(13));
	$.ajax({
		type: 'get',
		url: "http://localhost:8099/api/JinJiaApi/NetworkTrafficIn",
		data: null,
		timeout: 5000,
		cache: false,
		success: function(data) {
			indata = JSON.parse(data.HttpData);
			$.ajax({
				type: 'get',
				url: "http://localhost:8099/api/JinJiaApi/NetworkTrafficOut",
				data: null,
				timeout: 5000,
				cache: false,
				success: function(data) {
					outdata = JSON.parse(data.HttpData);
					var myChart = echarts.init(document.getElementById("realFluxCharts"));
					var inDataTime = [];
					var inDataValue = [];
					for(var i = 0; i < indata.success.length; i++) {
						inDataTime.push(formatTime(indata.success[i].timestamp));
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
							text: '实时网络流量',
							left: '3%',
							top: '10',
							textStyle: {
								fontFamily: 'zhsrxt',
								fontSize: 52,
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
							right: '4%',
							top: '30',
							textStyle: {
								fontSize: 24,
								color: '#fff' // 图例文字颜色
							},
							data: ['网络下行流量', '网络上行流量']
						},
						grid: {
							top: '16%',
							left: '1%',
							right: '4%',
							bottom: '3%',
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
							data: inDataTime
						},
						yAxis: [{
							type: 'value',
							name: '',
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
									width: 1,
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
							name: '网络上行流量',
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
										color: 'rgba(255, 244, 48, 0.7)'
									}, {
										offset: 0.8,
										color: 'rgba(255, 244, 48, 0.1)'
									}], false),
									shadowColor: 'rgba(0, 0, 0, 0.1)',
									shadowBlur: 10
								}
							},
							itemStyle: {
								normal: {
									color: 'rgb(255, 244, 48)',
									borderColor: 'rgba(255, 244, 48,0.8)',
									borderWidth: 6

								}
							},
							data: inDataValue
						}, {
							name: '网络下行流量',
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
									shadowColor: 'rgba(0, 0, 0, 0.1)',
									shadowBlur: 10
								}
							},
							itemStyle: {
								normal: {
									color: 'rgb(60, 221, 248)',
									borderColor: 'rgba(60, 221, 248,0.8)',
									borderWidth: 6

								}
							},
							data: outDataValue
						}]
					};
					myChart.setOption(option);
				}
			});
		}
	});

}

//展示CPU、内存、存储百分比图表
function getHuanCharts(chartId, rateNumber) {
	var myChart = echarts.init(document.getElementById(chartId));
	var option = {
		title: {
			show: false
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}:({d}%)"
		},
		series: [{
			type: 'liquidFill',
			color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
			center: ['50%', '50%'],
			radius: '52%',
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

			outline: {
				show: true,
				borderDistance: 0,
				itemStyle: {
					color: 'none',
					borderColor: '#294D99',
					borderWidth: 0,
					shadowBlur: 0,
					shadowColor: 'rgba(0, 0, 0, 0.25)'
				}
			},

			backgroundStyle: {
				color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
					offset: 0,
					color: 'rgba(25, 193, 213, 1)'
				}, {
					offset: 0.9,
					color: 'rgba(1, 83, 138, 1)'
				}], false),
			},

			itemStyle: {
				opacity: 0.95,
				shadowBlur: 50,
				color: '#22c8e4',
			},

			label: {
				show: true,
				position: ['50%', '50%'],
				formatter: function() {
					return '{labelValue|' + rateNumber + '}{labelUnit|%}';
				},
				rich: {
					labelValue: {
						fontSize: 52,
						fontFamily: 'Digital-7 Mono',
						color: '#FFF600',
						insideColor: '#F5E315',
					},
					labelUnit: {
						padding: [0, 0, 0, 5],
						fontSize: 42,
						color: '#FFF600',
						insideColor: '#F5E315',
					}
				}
			},

			emphasis: {
				itemStyle: {
					opacity: 0.8
				}
			},
			data: [{
				value: parseFloat(rateNumber)/100,
				itemStyle: {
					color: '#029fd2',
					opacity: 1
				},
			}, {
				value: parseFloat(rateNumber)/100,
				itemStyle: {
					color: '#22c8e4',
					opacity: 1
				},
			}]
		}, {
			name: '',
			type: 'pie',
			radius: ['52%', '68%'],
			color: ['rgba(1, 53, 96,.5)'],
			hoverAnimation: false,
			data: [{
				value: 0,
				name: ''
			}]
		}, {
			name: '',
			type: 'pie',
			radius: ['66%', '82%'],
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgba(25, 193, 213, 1)'
			}, {
				offset: 0.8,
				color: 'rgba(9, 113, 184, 1)'
			}], false),
			hoverAnimation: false,
			label: {
				normal: {
					show: false
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
				value: 6,
				name: ''
			}]
		}]
	};
	myChart.setOption(option);
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