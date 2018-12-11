$(function() {
	initConnectService();
});

//获取每日用电情况 环形图展示
function getHuanCharts() {
	$.ajax({
		type: "POST",
		url: "/GWService.asmx/GetRealTimeData",
		timeout: 5000,
		data: {
			equip_no: "20",
			table_name: "ycp"
		},
		success: function(data) {
			$(data).find('string').each(function() {
				var result = JSON.parse($(this).text());
				var resultData = [];
				for(var i = 0; i < result.length; i++) {
					if(result[i].m_iYCNo <= 1 || (result[i].m_iYCNo >= 11 && result[i].m_iYCNo <= 14)) {
						resultData.push("{name:'" + result[i].m_YCNm + "',value:'" + (parseFloat(result[i].m_YCValue) / 1000).toFixed(2) + "'}");
					}
				}
				console.log(resultData);
				var resultData = eval("[" + resultData + "]");
				var sumValue = 0;
				for(var i = 0; i < resultData.length; i++) {
					sumValue += parseFloat(resultData[i].value);
				}
				console.log(sumValue);
				var scale = 1;
				var rich = {
					yellow: {
						color: "#ffc72b",
						fontSize: 30 * scale,
						padding: [5, 4],
						align: 'right'
					},
					total: {
						color: "#ffc72b",
						fontSize: 40 * scale,
						align: 'center'
					},
					white: {
						color: "#fff",
						align: 'center',
						fontSize: 24 * scale,
						padding: [14, 0]
					},
					blue: {
						color: '#49dff0',
						fontSize: 16 * scale,
						align: 'center'
					},
					hr: {
						borderColor: '#0b5263',
						width: '100%',
						borderWidth: 5,
						height: 0,
					}
				}

				var myChart = echarts.init(document.getElementById("powerCharts"), "light")
				var option = {
					title: {
						text: sumValue.toFixed(2) + 'MW',
						subtext: '总用电',
						left: 'center',
						top: 'center',
						textStyle: {
							fontFamily: 'Digital-7Mono',
							fontSize: 50,
							fontWeight: '500',
							color: '#fff' // 主标题文字颜色
						},
						subtextStyle: {
							fontSize: 36,
							fontWeight: '500',
							color: '#05F4FD' // 主标题文字颜色
						},
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}:({d}%)"
					},
					series: [{
						name: '',
						type: 'pie',
						radius: ['40%', '48%'],
//						center: ['55%', '50%'],
						color: ['#06F4FE', '#0C9EF3', '#146AE3', '#4C3ED4', '#D92356'],
						hoverAnimation: false,
						label: {
							normal: {
								formatter: function(params) {
									var percent = 0; //考生占比
									percent = ((params.value / sumValue) * 100).toFixed(1);
									return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n';
								},
								rich: rich
							},
						},
						labelLine: {
							normal: {
								length: 45 * scale,
								lineStyle: {
									width: 5,
									color: '#0b5263'
								}
							}
						},
						data: resultData
					}]
				};
				myChart.setOption(option);
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
				getHuanCharts();
				getZheCharts();
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

//3D柱状图 全年用电情况统计图表
function getZheCharts() {
	var colors = ['rgba(4, 249, 252,1)', 'rgba(3, 129, 213,1)']
	Highcharts.getOptions().colors = Highcharts.map(colors, function(color) {
		return {
			linearGradient: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 1
			},
			stops: [
				[0, color],
				[1, 'rgba(3, 129, 213,1)']
			]
		};
	});
	$('#powerZheCharts').highcharts({
		chart: {
			type: 'column',
			backgroundColor: 'rgba(255,255,255,0)',
//			marginLeft: 125,
			marginRight: 45,
			marginTop: 60,
			marginBottom: 160,
			options3d: {
				enabled: true,
				alpha: -1,
				beta: 0,
				depth: 35
			}
		},
		title:{
			text:null
		},
//		title: {
//			text: '近一年总用电趋势',
//			align: 'center',
//			y: 50,
//			style: {
//				color: "#FEFEFE",
//				fontSize: 46,
//				fontFamily: "zhsrxt",
//				fontWeight: '500'
//			}
//		},
		tooltip: {
			formatter: function() {
				return '<b>' + this.x +
					'</b> ： <b>' + this.y + '</b>';
			}
		},
		legend: {
			enabled: false,
		},
		xAxis: {
			categories: getAllMonths(),
			gridLineWidth: 0,
			tickAmount: 7,
			labels: {
				rotation: 0,
				y: 30,
				style: {
					color: "#B0BCC9",
					fontSize: 22
				}
			},
			lineColor: '#B0BCC9',
			lineWidth: 4
		},
		yAxis: {
			title: {
				text: '单位（兆瓦）',
				style: {
					color: '#B0BCC9',
					fontSize: 22,
				}
			},
			tickWidth: 0,
			tickAmount: 7,
			gridLineDashStyle: 'Dash',
			gridLineWidth: 1,
			gridLineColor: '#B0BCC9',
			labels: {
				rotation: 0,
				y: 20,
				style: {
					color: "#B0BCC9",
					fontSize: 22
				}
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: '数量',
			data: [1890, 1990, 1744, 1800, 1898, 1750, 1850, 1800, 2000, 2050, 2100, 2050]
		}]
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
	size = (limit / (1024) / 1.5).toFixed(2);

	var sizestr = size + "";
	var len = sizestr.indexOf("\.");
	var dec = sizestr.substr(len + 1, 2);
	if(dec == "00") { //当小数点后为00时 去掉小数部分  
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
	}
	return sizestr;
}

//获取前12个月份
function getAllMonths() {
	var dataArr = [];
	var data = new Date();
	var year = data.getFullYear();
	data.setMonth(data.getMonth() + 1) //获取到当前月份,设置月份
	for(var i = 0; i < 12; i++) {
		data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
		dataArr.push((data.getMonth() + 1) + '月');
		//        dataArr.push(year+"/"+(data.getMonth()+1) + '')
	}
	return dataArr.reverse();
}