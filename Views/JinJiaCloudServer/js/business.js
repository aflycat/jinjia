$(function() {
	getConsumptionRateCharts();
	getAmountStatisticsCharts();
	getCostReductionRateCharts();
	getCapacityCharts();
	getExtantQuantityCharts();
	getSparePartsCharts();
	getStockZhuCharts();
	getPersonnelMapCharts();
	getPersonalNumCharts();
	getHuanCharts();
});

//集团及区域人才结构图
function getHuanCharts() {
	var myChart = echarts.init(document.getElementById("talentStructureId"), "light");
	var resultData = [{
		name: "普通技师",
		value: 2864
	}, {
		name: "中级技师",
		value: 2064
	}, {
		name: "高级技师",
		value: 1075
	}, {
		name: "高管",
		value: 296
	}];
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '集团及区域人才结构图',
			left: 'center',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 44,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}:({d}%)"
		},
		series: [{
			name: '',
			type: 'pie',
			radius: ['41%', '55%'],
			center: ['50%', '55%'],
			color: ['#06F4FE', '#0C9EF3', '#146AE3', '#D92356', '#4C3ED4'],
			hoverAnimation: false,
			label: {
				normal: {
					formatter: "{b} \n {c}",
					textStyle: {
						color: '#D6D7D9',
						fontSize: 24,

					},
				}
			},
			labelLine: {
				normal: {
					width: 3,
					length: 20
				}
			},
			data: resultData
		}]
	};
	myChart.setOption(option);
}

//集团人数逐年统计图
function getPersonalNumCharts() {
	var myCostChart = echarts.init(document.getElementById("personalNumId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '集团人数逐年统计图',
			left: 'center',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 44,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		grid: {
			left: '6%',
			top: '18%',
			right: '6%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			axisLabel: {
				show: true,
				margin: 20,
				color: '#999798',
				fontSize: 18,
			},
			axisTick: {
				show: true,
				inside: true, // 控制小标记是否在grid里 
				length: 5, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#545766',
					width: 2
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#999798'
				}
			},
			boundaryGap: false,
			data: ['10年', '11年', '12年', '13年', '14年', '15年', '16年', '17年'],
		},
		yAxis: {
			type: 'value',
			//			name: '单位：人',
			//			nameGap: '20',
			nameTextStyle: {
				color: '#ffffff',
				fontSize: '16',
			},
			axisLabel: {
				show: true,
				margin: 25,
				color: '#999798',
				fontSize: 18,
				formatter: function(value) {
					if(value != 0 && Math.abs(value) >= 1000) {
						return value / 1000 + '千';
					} else {
						return value;
					}

				}
			},
			axisLine: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#9FA2A7',
					width: 2,
					type: 'dashed'
				}
			},
		},
		series: [{
			type: 'line',
			symbol: 'image://data:image/png;base64,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',
			symbolSize: 62,
			itemStyle: {
				normal: {
					color: 'rgba(255,255,255,0)',
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 1,
							color: '#545082'
						}, {
							offset: 0.5,
							color: '#2A5E86'
						}], false)
					}
				}
			},
			label: {
				normal: {
					show: true,
					position: [10, -20],
					textStyle: {
						color: '#F7FBFC',
						fontSize: '18',

					},
					formatter: function(param) {
						if(param.value >= 1000) {
							return param.value.toLocaleString();
						} else {
							return param.value;
						}

					}
				}
			},
			lineStyle: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
							offset: 0,
							color: '#4DECC6'
						},
						{
							offset: 1,
							color: '#5385DE'
						}
					]
				),
				width: 12,
				shadowColor: 'rgba(0, 0, 0, 0.2)',
				shadowBlur: 15,
				shadowOffsetX: -25,
				shadowOffsetY: 30
			},
			data: [3280, 3691, 3985, 4427, 4673, 5025, 5894, 6289]
		}]
	};

	myCostChart.setOption(option);
}

//人事地图
function getPersonnelMapCharts() {
	var myChart = echarts.init(document.getElementById("personnelMapId"));
	var uploadedDataURL = "data/weibo.json";

	//	myChart.showLoading();
	$.getJSON(uploadedDataURL, function(weiboData) {
		myChart.hideLoading();

		weiboData = weiboData.map(function(serieData, idx) {
			var px = serieData[0] / 1000;
			var py = serieData[1] / 1000;
			var res = [
				[px, py]
			];

			for(var i = 2; i < serieData.length; i += 2) {
				var dx = serieData[i] / 1000;
				var dy = serieData[i + 1] / 1000;
				var x = px + dx;
				var y = py + dy;
				res.push([x, y, 1]);

				px = x;
				py = y;
			}
			return res;
		});
		myChart.setOption(option = {
			backgroundColor: 'rgba(255,255,255,0)',
			title: {
				show: false
			},
			legend: {
				right: '5%',
				bottom: '10%',
				data: ['劲嘉集团员工分布示意图'],
				textStyle: {
					color: '#fff',
					fontSize: 18
				}
			},
			geo: {
				name: '强',
				type: 'scatter',
				map: 'china',
				regions: [{
					name: '南海诸岛',
					value: 0,
					itemStyle: {
						normal: {
							opacity: 0,
							label: {
								show: false
							}
						}
					}
				}],
				layoutCenter: ['50%', '50%'],
				layoutSize: '125%',
				aspectScale: 0.95,
				layoutCenter: ['58%', '50%'],
				layoutSize: '155%',
				label: {
					emphasis: {
						show: false
					}
				},
				itemStyle: {
					normal: {
						areaColor: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#040318'
								},
								{
									offset: 1,
									color: '#03315A'
								}
							]
						),
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			grid: {
				top: '-11%',
				left: '1%',
				right: '4%',
				bottom: '3%'
			},
			series: [{
					name: '弱',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbolSize: 3,
					large: true,
					itemStyle: {
						normal: {
							shadowBlur: 2,
							shadowColor: 'rgba(176, 179, 134, 0.8)',
							color: 'rgba(176, 179, 134, 0.8)'
						}
					},
					data: weiboData[0]
				}, {
					name: '中',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbolSize: 3,
					large: true,
					itemStyle: {
						normal: {
							shadowBlur: 2,
							shadowColor: 'rgba(240, 248, 98, 0.8)',
							color: 'rgba(240, 248, 98, 0.8)'
						}
					},
					data: weiboData[1]
				}, {
					name: '劲嘉集团员工分布示意图',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbolSize: 3,
					large: true,
					itemStyle: {
						normal: {
							shadowBlur: 2,
							shadowColor: 'rgba(255, 247, 176, 0.8)',
							color: 'rgba(255, 247, 176, 0.8)'
						}
					},
					data: weiboData[2]
				},
				{
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: [{
						name: "深圳市",
						value: [114.07, 22.62, 199]
					}],
					showEffectOn: 'render',
					rippleEffect: {
						scale: 2,
						brushType: 'stroke'
					},
					symbolSize: 40,
					label: {
						normal: {
							position: 'right',
							show: true,
							/*verticalAlign:'bottom',
									align:'center',
									margin:100,
							formatter: '{b|{b}}',

							rich: {
								b: {
									width: 200,
									height: 150,
									color: 'rgba(4, 251, 255,1)',
									fontSize: 40,
									backgroundColor: 'rgba(26, 41, 64,.6)',
									borderColor: 'rgba(13, 197, 198,1)',
									borderWidth: 3,
									borderRadius: 0,
								}
							}*/
						},
						emphasis: {
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#06F5F8'
						}
					},
					zlevel: 2
				},
				{
					name: 'Top 5',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: [{
						name: "深圳市",
						value: [114.07, 22.62, 199]
					}],
					symbolSize: 80,
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: 'rgba(131, 229, 177,.5)',
							shadowBlur: 10,
							shadowColor: 'rgba(131, 229, 177,.5)'
						}
					},
					zlevel: 1
				},
				{
					name: '点',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'pin',
					symbolSize: 250,
					label: {
						normal: {
							show: true,
							formatter: "劲嘉集团总部",
							textStyle: {
								color: '#fff',
								fontSize: 22,
							},
						}
					},
					itemStyle: {
						normal: {
							color: '#F62157', //标志颜色
						}
					},
					zlevel: 6,
					data: [{
						name: "深圳市",
						value: [114.07, 22.62, 199]
					}],
				},
			]
		});
	});
}

//收发存统计
function getStockZhuCharts() {
	var myChart = echarts.init(document.getElementById("stockZhuId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '收发存统计',
			left: 'center',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 36,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		grid: {
			top: '15%',
			left: '1%',
			right: '4%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			data: ['单铜纸', '金卡纸', '银卡纸', '牛皮纸', '双铜纸', '坑纸', '特种纸', '纸板'],
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				position: 'bottom',
				margin: 20,
				color: '#C7C5C6',
				fontSize: 20,
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			}
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				rotate: 0,
				nameLocation: 'start',
				margin: 15,
				color: '#C7C5C6',
				fontSize: 20,
				formatter: function(value) {
					if(value != 0 && Math.abs(value) >= 1000) {
						return value / 1000 + '千';
					} else {
						return value;
					}
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#1A6082',
					width: 2,
					type: 'dashed'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{
				name: '收量',
				type: 'bar',
				stack: '数量',
				barWidth: '48%',
				label: {
					show: true,
					position: 'top',
					color: '#E9EDF0',
					fontSize: 16,
				},
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0.2,
									color: '#50D4D6'
								},
								{
									offset: 1,
									color: '#066099'
								}
							]
						)
					}
				},
				data: [3339, 3034, 2969, 2780, 2590, 2107, 1890, 1682]
			},
			{
				name: '存量',
				type: 'bar',
				stack: '数量',
				barWidth: '50%',
				label: {
					show: true,
					position: 'bottom',
					color: '#E9EDF0',
					fontSize: 16,
				},
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#50D4D6'
								},
								{
									offset: 1,
									color: '#066099'
								}
							]
						)
					}
				},
				data: [-1858, -1975, -2620, -1423, -2132, -1676, -1060, -1288]
			}
		]
	};
	myChart.setOption(option);
}

//零配件统计
function getSparePartsCharts() {
	var myCostChart = echarts.init(document.getElementById("sparePartsId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '零配件统计',
			left: 'center',
			top: '5%',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 30,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			type: 'pie',
			radius: ['0%', '58%'],
			center: ['50%', '60%'],
			data: [{
				value: 3661,
				name: '材料1',
				itemStyle: {
					normal: {
						color: 'rgba(32, 67, 87,.4)'
					}
				},
			}]
		}, {
			name: '',
			type: 'pie',
			radius: '58%',
			center: ['50%', '60%'],
			color: ['#37E7E4', '#24C6F0', '#4DAFE6', '#1F87FB', '#2E5DE3', '#17388B', '#6D4EF2', '#CF3A60'],
			data: [{
				value: 3339,
				name: '单铜纸',
			}, {
				value: 3034,
				name: '金卡纸'
			}, {
				value: 2969,
				name: '银卡纸'
			}, {
				value: 2780,
				name: '牛皮纸'
			}, {
				value: 2590,
				name: '双铜纸',
			}, {
				value: 2107,
				name: '坑纸',
			}, {
				value: 1890,
				name: '特种纸'
			}, {
				value: 1682,
				name: '纸板',
			}],
			roseType: 'area',
			label: {
				show: true,
				fontSize: 18,
				color: '#FFFFFF',
				//				formatter: function(param) {
				//					return param.name + ":" + param.value + 'W';
				//				},
				formatter: '{b}%'
			},
			labelLine: {
				normal: {
					lineStyle: {
						width: 6,
					},
					smooth: 0.2,
					length: 10,
					length2: 15
				}
			},
			animationType: 'scale',
			animationEasing: 'elasticOut',
			animationDelay: function(idx) {
				return Math.random() * 200;
			}
		}]
	};
	myCostChart.setOption(option);
}

//现存量统计
function getExtantQuantityCharts() {
	var myCostChart = echarts.init(document.getElementById("extantQuantityId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '现存量统计',
			left: 'center',
			top: '15%',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 30,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
				name: '库存情况',
				type: 'pie',
				radius: '58%',
				center: ['50%', '65%'],
				clockwise: true,
				data: [{
							value: 13,
							name: '卷烟包装产品',
							selected: true
						},
						{
							value: 9,
							name: '新型烟草制品'
						},
						{
							value: 10,
							name: '镭射全息材料'
						},
						{
							value: 8,
							name: '酒类包装产品'
						},
						{
							value: 7,
							name: '智能电子产品',
						},
						{
							value: 10,
							name: '其他社会产品',
						}],
					label: {
						show: false
					},
					labelLine: {
						show: false
					},
					itemStyle: {
						normal: {
							borderWidth: 0,
						},
						emphasis: {
							borderWidth: 0,
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}],
			color: ['#37E7E4', '#24C6F0', '#4DAFE6', '#1F87FB', '#2E5DE3', '#17388B', '#6D4EF2', '#CF3A60'],
		};
		myCostChart.setOption(option);
	}

	//产能
	function getCapacityCharts() {
		var myCostChart = echarts.init(document.getElementById("capacityChartsId"));
		var option = {
			backgroundColor: 'rgba(255,255,255,0)',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '8%',
				right: '8%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				name: 'W',
				nameTextStyle: {
					padding: [85, 0, 0, 16],
					fontSize: 28,
					color: '#CECCCD',
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					margin: 30,
					color: '#CECCCD',
					fontSize: 28
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#CAD2DF',
						width: 2,
						type: 'dashed'
					}
				},
				data: ['0', '5', '10', '15', '20', '25']
			},
			yAxis: {
				boundaryGap: false,
				axisLine: {
					show: true,
					lineStyle: {
						color: '#C9D3DF',
					}
				},
				axisLabel: {
					show: true,
					margin: 30,
					color: '#E9EDEE',
					fontSize: 28
				},
				axisTick: {
					show: false,
				},
				data: ['卷烟包装产品', '新型烟草制品', '镭射全息材料', '酒类包装产品', '智能电子产品', '其他社会产品']
			},
			series: [{
					name: '建设用地规划许可',
					type: 'bar',
					stack: '总量',
					barWidth: 25,
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					itemStyle: {
						normal: {
							color: '#36EAE7'
						}
					},
					data: [6, 5, 7, 4, 5, 6]
				},
				{
					name: '土地使用权登记',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					itemStyle: {
						normal: {
							color: '#FFE536'
						}
					},
					data: [7, 4, 3, 4, 2, 4]
				}
			]
		};
		myCostChart.setOption(option);
	}

	//采购成本降低率
	function getCostReductionRateCharts() {
		var myCostChart = echarts.init(document.getElementById("costReductionRateId"));
		var option = {
			backgroundColor: 'rgba(255,255,255,0)',
			title: {
				text: '采购成本降低率',
				left: 'center',
				top: '5%',
				textStyle: {
					fontFamily: 'zhsrxt',
					fontSize: 44,
					fontWeight: '500',
					color: '#fff' // 主标题文字颜色
				},

			},
			grid: {
				left: '1%',
				top: '31.5%',
				right: '6%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				axisLabel: {
					show: true,
					margin: 20,
					color: '#999798',
					fontSize: 18,
				},
				axisTick: {
					show: true,
					inside: true, // 控制小标记是否在grid里 
					length: 5, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: '#545766',
						width: 2
					}
				},
				axisLine: {
					lineStyle: {
						color: '#545766',
					}
				},
				boundaryGap: false,
				data: ['08年', '09年', '10年', '11年', '12年', '13年', '14年', '15年', '16年', '17年'],
			},
			yAxis: {
				type: 'value',
				//			name: '单位：人',
				//			nameGap: '20',
				nameTextStyle: {
					color: '#ffffff',
					fontSize: '16',
				},
				axisLabel: {
					show: true,
					margin: 20,
					color: '#999798',
					fontSize: 18,
					formatter: function(value) {
						return value + '%';
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#999798',
						fontSize: 24,
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#9FA2A7',
						width: 2,
						type: 'dashed'
					}
				},
			},
			series: [{
				type: 'line',
				symbol: 'image://data:image/png;base64,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',
				symbolSize: 62,
				itemStyle: {
					normal: {
						color: 'rgba(255,255,255,0)',
						areaStyle: {
							color: new echarts.graphic.LinearGradient(1, 0, 0.8, 1, [{
								offset: 1,
								color: '#2B2843'
							}, {
								offset: 0.5,
								color: '#117487'
							}], false)
						}
					}
				},
				label: {
					normal: {
						show: true,
						position: [10, -20],
						textStyle: {
							color: '#F7FBFC',
							fontSize: '20',

						},
						formatter: function(param) {
							return param.value + '%';
						}
					}
				},
				lineStyle: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#4DECC6'
							},
							{
								offset: 1,
								color: '#5385DE'
							}
						]
					),
					width: 15,
					shadowColor: 'rgba(0, 0, 0, 0.2)',
					shadowBlur: 15,
					shadowOffsetX: -25,
					shadowOffsetY: 50
				},
				data: ['23', '22.2', '21.3', '21.8', '20.9', '17.4', '17.1', '14.6', '13.6', '12.6']
			}]
		};

		myCostChart.setOption(option);
	}

	//各材料2017年采购金额统计图
	function getAmountStatisticsCharts() {
		var myChart = echarts.init(document.getElementById("amountStatisticsId"));
		var option = {
			backgroundColor: 'rgba(255,255,255,0)',
			title: {
				text: '各材料2017年采购金额统计图',
				left: 'center',
				textStyle: {
					fontFamily: 'zhsrxt',
					fontSize: 44,
					fontWeight: '500',
					color: '#fff' // 主标题文字颜色
				},

			},
			grid: {
				top: '16%',
				left: '1%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				data: ['单铜纸', '金卡纸', '银卡纸', '牛皮纸', '双铜纸', '坑纸', '特种纸', '纸板'],
				axisLabel: {
					show: true,
					margin: 20,
					color: '#CECCD1',
					fontSize: 20,
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: true,
					rotate: 0,
					nameLocation: 'start',
					margin: 8,
					color: '#DCE3E7',
					fontSize: 22,
					formatter: function(value) {
						if(value != 0 && value >= 1000) {
							return value / 1000 + '千';
						} else {
							return value;
						}
					}
				},
				splitLine: {
					show: false
				}
			},
			dataZoom: [{
				type: 'inside'
			}],
			series: [{
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#17475D'
						}
					},
					silent: true,
					barWidth: '48%',
					barGap: '-100%',
					barCategoryGap: '40%',
					data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
					animation: false
				},
				{
					type: 'bar',
					barWidth: '48%',
					label: {
						show: true,
						position: 'top',
						color: '#E9EDF0',
						fontSize: 16,
					},
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
										offset: 0,
										color: '#50D4D6'
									},
									{
										offset: 1,
										color: '#066099'
									}
								]
							)
						}
					},
					data: [3339, 3034, 2969, 2780, 2590, 2107, 1890, 1682]
				}
			]
		};
		myChart.setOption(option);
	}

	//各材料用量占比情况
	function getConsumptionRateCharts() {
		var myChart = echarts.init(document.getElementById("consumptionRateId"));
		var colorArr = ['#37E7E4', '#24C6F0', '#4DAFE6', '#1F87FB', '#2E5DE3', '#17388B', '#6D4EF2', '#CF3A60'];

		function getData(percent, num) {
			return [{
				value: percent,
				name: percent,
				itemStyle: {
					normal: {
						color: colorArr[num]
					}
				}
			}, {
				value: 1 - percent,
				itemStyle: {
					normal: {
						color: 'transparent'
					}
				}
			}];
		}
		var placeHolderStyle = {
			normal: {
				label: {
					show: false,
					position: 'outside'

				},
				labelLine: {
					show: false,
				}

			}
		};
		var option = {
			backgroundColor: 'rgba(255,255,255,0)',
			title: {
				text: '各材料用量占比情况',
				left: 'center',
				textStyle: {
					fontFamily: 'zhsrxt',
					fontSize: 44,
					fontWeight: '500',
					color: '#fff' // 主标题文字颜色
				},
			},
			tooltip: {
				trigger: 'item',
				formatter: function(params, ticket, callback) {

					return params.seriesName + ": " + params.name * 100 + "%";
				}
			},
			legend: {
				top: "80",
				left: "37%",
				itemGap: 8,
				itemWidth: 0,
				itemHeight: 0,
				data: ['单铜纸', '金卡纸', '银卡纸', '牛皮纸', '双铜纸', '坑纸', '特种纸', '纸板'],
				textStyle: {
					color: '#DCE3E7',
					fontSize: 12
				},

				selectedMode: true,
				orient: "vertical",

			},
			series: [{
				name: '单铜纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [165, 180],
				itemStyle: placeHolderStyle,
				data: getData(0.75, 0)
			}, {
				name: '金卡纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [145, 160],
				itemStyle: placeHolderStyle,
				data: getData(0.68, 1)
			}, {
				name: '银卡纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [125, 140],
				itemStyle: placeHolderStyle,
				data: getData(0.66, 2)
			}, {
				name: '牛皮纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [105, 120],
				itemStyle: placeHolderStyle,
				data: getData(0.62, 3)
			}, {
				name: '双铜纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [85, 100],
				itemStyle: placeHolderStyle,
				data: getData(0.58, 4)
			}, {
				name: '坑纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [65, 80],
				itemStyle: placeHolderStyle,
				data: getData(0.47, 5)
			}, {
				name: '特种纸',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [45, 60],
				itemStyle: placeHolderStyle,
				data: getData(0.42, 6)
			}, {
				name: '纸板',
				type: 'pie',
				clockWise: true, //顺时加载
				hoverAnimation: false, //鼠标移入变大
				radius: [25, 40],
				itemStyle: placeHolderStyle,
				data: getData(0.37, 7)
			}]
		};
		myChart.setOption(option);
	}