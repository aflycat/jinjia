var powerTwelveData;
$(function() {
	initConnectService();
});

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
						var realValue = 0;
						if(result[i].m_YCValue != null && result[i].m_YCValue != "") {
							var realValue = result[i].m_YCValue.toString().split("/")[0];
						}
						resultData.push("{name:'" + result[i].m_YCNm + "',value:'" + (parseFloat(realValue) / 1000).toFixed(2) + "'}");
					}
					if(result[i].m_iYCNo == 15) {
						powerTwelveData = result[i].m_YCValue;
						getZheCharts();
					}
				}
				var resultData = eval("[" + resultData + "]");
				var sumValue = 0;
				for(var i = 0; i < resultData.length; i++) {
					sumValue += parseFloat(parseFloat(resultData[i].value).toFixed(2));
				}
				sumValue = Math.floor(sumValue * 100) / 100;
				var myChart = echarts.init(document.getElementById("powerCharts"));
				var option = {
					title: {
						text: sumValue + 'MW',
						subtext: '总用电',
						left: 'center',
						top: 'center',
						textStyle: {
							fontFamily: 'Digital-7Mono',
							fontSize: 42,
							fontWeight: '500',
							color: '#fff' // 主标题文字颜色
						},
						subtextStyle: {
							fontSize: 32,
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
						radius: ['40%', '55%'],
						color: ['#06F4FE', '#0C9EF3', '#146AE3', '#4C3ED4', '#D92356'],
						hoverAnimation: false,
						label: {
							normal: {
								formatter: "{b}：{c}",
								textStyle: {
									color: '#fff',
									fontSize: 26,

								}
							}
						},
						labelLine: {
							lineStyle: {
								width: 3,
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

function getZheCharts() {console.log(getAllMonths())
	var powerTwelveDataArr = [];
	if(powerTwelveData != null && powerTwelveData != "") {console.log(powerTwelveData)
		powerTwelveDataArr = powerTwelveData.split("/");console.log(powerTwelveDataArr)
		var realPowerData=[];
		for(var i=0;i<powerTwelveDataArr.length;i++){
			var strData=Math.floor(powerTwelveDataArr[i] * 100) / 100
			if(strData!=0&&strData!=NaN){
				realPowerData.push(parseFloat((strData / 1000).toFixed(2)));
			}
		}console.log(realPowerData)
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
				marginTop: 130,
				options3d: {
					enabled: true,
					alpha: -1,
					beta: 0,
					depth: 35
				}
			},
			title: {
				text: '近一年总用电趋势',
				align: 'center',
				y: 50,
				style: {
					color: "#FEFEFE",
					fontSize: 46,
					fontFamily: "zhsrxt",
					fontWeight: '500'
				}
			},
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
				data: realPowerData.reverse()
			}]
		});
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
	size = (limit / (1024) / 1.5).toFixed(2);

	var sizestr = size + "";
	var len = sizestr.indexOf("\.");
	var dec = sizestr.substr(len + 1, 2);
	if(dec == "00") { //当小数点后为00时 去掉小数部分  
		return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
	}
	return sizestr;
}

function getAllMonths() {
	var dataArr = [];
	var data = new Date();
	var year = data.getFullYear();
	data.setMonth(data.getMonth()) //获取到当前月份,设置月份
	for(var i = 0; i < 12; i++) {
		data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
		dataArr.push((data.getMonth() + 1) + '月');
		//        dataArr.push(year+"/"+(data.getMonth()+1) + '')
	}
	return dataArr.reverse();
}