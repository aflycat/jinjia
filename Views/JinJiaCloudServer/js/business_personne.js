$(function() {
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
				aspectScale: 0.75,
				layoutCenter: ['58%', '50%'],
				layoutSize: '125%',
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
					symbolSize: 200,
					label: {
						normal: {
							show: true,
							formatter: "劲嘉集团",
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

//人事地图
function getPersonnelMapCharts2() {
	var myChart = echarts.init(document.getElementById("personnelMapId"));
	var uploadedDataURL = "data/weibo.json";
	
	
	
	var data = [{
			name: '长春',
			value: 195
		},
		{
			name: '济南',
			value: 190
		},
		{
			name: '合肥',
			value: 180
		},
		{
			name: '上海',
			value: 150
		},
		{
			name: '南昌',
			value: 160
		},
		{
			name: '广州',
			value: 100
		},
		{
			name: '重庆',
			value: 90
		},
		{
			name: '贵阳',
			value: 110
		},
		{
			name: '昆明',
			value: 120
		},
		{
			name: '深圳',
			value: 150
		},
		{
			name: '泉州',
			value:  10    
		},
		{
			name: '莱西',
			value:  10    
		},
		{
			name: '日照',
			value:  10    
		},
		{
			name: '胶南',
			value:  10    
		},
		{
			name: '南通',
			value:  10    
		},
		{
			name: '拉萨',
			value:  10    
		},
		{
			name: '云浮',
			value:  10    
		},
		{
			name: '梅州',
			value:  10    
		},
		{
			name: '文登',
			value:  10    
		},
		{
			name: '攀枝花',
			value:  10    
		},
		{
			name: '威海',
			value:  10    
		},
		{
			name: '承德',
			value:  10    
		},
		{
			name: '厦门',
			value:  10    
		},
		{
			name: '汕尾',
			value:  10    
		},
		{
			name: '潮州',
			value:  10    
		},
		{
			name: '丹东',
			value:  10    
		},
		{
			name: '太仓',
			value:  10    
		},
		{
			name: '曲靖',
			value:  10    
		},
		{
			name: '烟台',
			value:  10    
		},
		{
			name: '福州',
			value:  10    
		},
		{
			name: '瓦房店',
			value:  10    
		},
		{
			name: '即墨',
			value:  10    
		},
		{
			name: '抚顺',
			value:  10    
		},
		{
			name: '玉溪',
			value:  10    
		},
		{
			name: '张家口',
			value:  10    
		},
		{
			name: '阳泉',
			value:  10    
		},
		{
			name: '莱州',
			value:  10    
		},
		{
			name: '湖州',
			value:  10    
		},
		{
			name: '汕头',
			value:  10    
		},
		{
			name: '昆山',
			value:  10    
		},
		{
			name: '宁波',
			value:  10    
		},
		{
			name: '湛江',
			value:  10    
		},
		{
			name: '揭阳',
			value:  10    
		},
		{
			name: '荣成',
			value:  10    
		},
		{
			name: '连云港',
			value:  10    
		},
		{
			name: '葫芦岛',
			value:  10    
		},
		{
			name: '常熟',
			value:  10    
		},
		{
			name: '东莞',
			value:  10    
		},
		{
			name: '河源',
			value:  10    
		},
		{
			name: '淮安',
			value:  10    
		},
		{
			name: '泰州',
			value:  10    
		},
		{
			name: '南宁',
			value:  10    
		},
		{
			name: '营口',
			value:  10    
		},
		{
			name: '惠州',
			value:  10    
		},
		{
			name: '江阴',
			value:  10    
		},
		{
			name: '蓬莱',
			value:  10    
		},
		{
			name: '韶关',
			value:  10    
		},
		{
			name: '嘉峪关',
			value:  10    
		},
		{
			name: '延安',
			value:  10    
		},
		{
			name: '太原',
			value:  10    
		},
		{
			name: '清远',
			value:  10    
		},
		{
			name: '中山',
			value:  10    
		},
		{
			name: '寿光',
			value:  10    
		},
		{
			name: '盘锦',
			value:  10    
		},
		{
			name: '长治',
			value:  10    
		},
		{
			name: '珠海',
			value:  10    
		},
		{
			name: '宿迁',
			value:  10    
		},
		{
			name: '咸阳',
			value:  10    
		},
		{
			name: '铜川',
			value:  10    
		},
		{
			name: '平度',
			value:  10    
		},
		{
			name: '佛山',
			value:  10    
		},
		{
			name: '海口',
			value:  10    
		},
		{
			name: '江门',
			value:  10    
		},
		{
			name: '章丘',
			value:  10    
		},
		{
			name: '肇庆',
			value:  10    
		},
		{
			name: '大连',
			value:  10    
		},
		{
			name: '临汾',
			value:  10    
		},
		{
			name: '吴江',
			value:  10    
		},
		{
			name: '石嘴山',
			value:  10    
		},
		{
			name: '沈阳',
			value:  10    
		},
		{
			name: '苏州',
			value:  10    
		},
		{
			name: '茂名',
			value:  10    
		},
		{
			name: '嘉兴',
			value:  10    
		},
		{
			name: '胶州',
			value:  10    
		},
		{
			name: '银川',
			value:  10    
		},
		{
			name: '张家港',
			value:  10    
		},
		{
			name: '三门峡',
			value:  10    
		},
		{
			name: '锦州',
			value:  10    
		},
		{
			name: '柳州',
			value:  10    
		},
		{
			name: '三亚',
			value:  10    
		},
		{
			name: '自贡',
			value:  10    
		},
		{
			name: '吉林',
			value:  10    
		},
		{
			name: '阳江',
			value:  10    
		},
		{
			name: '泸州',
			value:  10    
		},
		{
			name: '西宁',
			value:  10    
		},
		{
			name: '宜宾',
			value:  10    
		},
		{
			name: '呼和浩特',
			value:  10    
		},
		{
			name: '成都',
			value:  10    
		},
		{
			name: '大同',
			value:  10    
		},
		{
			name: '镇江',
			value:  10    
		},
		{
			name: '桂林',
			value:  10    
		},
		{
			name: '张家界',
			value:  10    
		},
		{
			name: '宜兴',
			value:  10    
		},
		{
			name: '北海',
			value:  10    
		},
		{
			name: '西安',
			value:  10    
		},
		{
			name: '金坛',
			value:  10    
		},
		{
			name: '东营',
			value:  10    
		},
		{
			name: '牡丹江',
			value:  10    
		},
		{
			name: '遵义',
			value:  10    
		},
		{
			name: '绍兴',
			value:  10    
		},
		{
			name: '扬州',
			value:  10    
		},
		{
			name: '常州',
			value:  10    
		},
		{
			name: '潍坊',
			value:  10    
		},
		{
			name: '台州',
			value:  10    
		},
		{
			name: '南京',
			value:  10    
		},
		{
			name: '滨州',
			value:  10    
		},
		{
			name: '无锡',
			value:  10    
		},
		{
			name: '本溪',
			value:  10    
		},
		{
			name: '克拉玛依',
			value:  10    
		},
		{
			name: '渭南',
			value:  10    
		},
		{
			name: '马鞍山',
			value:  10    
		},
		{
			name: '宝鸡',
			value:  10    
		},
		{
			name: '焦作',
			value:  10    
		},
		{
			name: '句容',
			value:  10    
		},
		{
			name: '北京',
			value:  10    
		},
		{
			name: '徐州',
			value:  10    
		},
		{
			name: '衡水',
			value:  10    
		},
		{
			name: '包头',
			value:  10    
		},
		{
			name: '绵阳',
			value:  10    
		},
		{
			name: '乌鲁木齐',
			value:  10    
		},
		{
			name: '枣庄',
			value:  10    
		},
		{
			name: '杭州',
			value:  10    
		},
		{
			name: '淄博',
			value:  10    
		},
		{
			name: '鞍山',
			value:  10    
		},
		{
			name: '溧阳',
			value:  10    
		},
		{
			name: '库尔勒',
			value:  10    
		},
		{
			name: '安阳',
			value:  10    
		},
		{
			name: '开封',
			value:  10    
		},
		{
			name: '德阳',
			value:  10    
		},
		{
			name: '温州',
			value:  10    
		},
		{
			name: '九江',
			value:  10    
		},
		{
			name: '邯郸',
			value:  10    
		},
		{
			name: '临安',
			value:  10    
		},
		{
			name: '兰州',
			value:  10    
		},
		{
			name: '沧州',
			value:  10    
		},
		{
			name: '临沂',
			value:  10    
		},
		{
			name: '南充',
			value:  10    
		},
		{
			name: '天津',
			value:  10    
		},
		{
			name: '富阳',
			value:  10    
		},
		{
			name: '泰安',
			value:  10    
		},
		{
			name: '诸暨',
			value:  10    
		},
		{
			name: '郑州',
			value:  10    
		},
		{
			name: '哈尔滨',
			value:  10    
		},
		{
			name: '聊城',
			value:  10    
		},
		{
			name: '芜湖',
			value:  10    
		},
		{
			name: '唐山',
			value:  10    
		},
		{
			name: '平顶山',
			value:  10    
		},
		{
			name: '邢台',
			value:  10    
		},
		{
			name: '德州',
			value:  10    
		},
		{
			name: '济宁',
			value:  10    
		},
		{
			name: '荆州',
			value:  10    
		},
		{
			name: '宜昌',
			value:  10    
		},
		{
			name: '义乌',
			value:  10    
		},
		{
			name: '丽水',
			value:  10    
		},
		{
			name: '洛阳',
			value:  10    
		},
		{
			name: '秦皇岛',
			value:  10    
		},
		{
			name: '株洲',
			value:  10    
		},
		{
			name: '石家庄',
			value:  10    
		},
		{
			name: '莱芜',
			value:  10    
		},
		{
			name: '常德',
			value:  10    
		},
		{
			name: '保定',
			value:  10    
		},
		{
			name: '湘潭',
			value:  10    
		},
		{
			name: '金华',
			value:  10    
		},
		{
			name: '岳阳',
			value:  10    
		},
		{
			name: '长沙',
			value:  10    
		},
		{
			name: '衢州',
			value:  10    
		},
		{
			name: '廊坊',
			value:  10    
		},
		{
			name: '菏泽',
			value:  10    
		},
		{
			name: '武汉',
			value:  10    
		},
		{
			name: '大庆',
			value:  10    
		}
	];
	var geoCoordMap = {
		'海门': [121.15, 31.89],
		'鄂尔多斯': [109.781327, 39.608266],
		'招远': [120.38, 37.35],
		'舟山': [122.207216, 29.985295],
		'齐齐哈尔': [123.97, 47.33],
		'盐城': [120.13, 33.38],
		'赤峰': [118.87, 42.28],
		'青岛': [120.33, 36.07],
		'乳山': [121.52, 36.89],
		'金昌': [102.188043, 38.520089],
		'泉州': [118.58, 24.93],
		'莱西': [120.53, 36.86],
		'日照': [119.46, 35.42],
		'胶南': [119.97, 35.88],
		'南通': [121.05, 32.08],
		'拉萨': [91.11, 29.97],
		'云浮': [112.02, 22.93],
		'梅州': [116.1, 24.55],
		'文登': [122.05, 37.2],
		'上海': [121.48, 31.22],
		'攀枝花': [101.718637, 26.582347],
		'威海': [122.1, 37.5],
		'承德': [117.93, 40.97],
		'厦门': [118.1, 24.46],
		'汕尾': [115.375279, 22.786211],
		'潮州': [116.63, 23.68],
		'丹东': [124.37, 40.13],
		'太仓': [121.1, 31.45],
		'曲靖': [103.79, 25.51],
		'烟台': [121.39, 37.52],
		'福州': [119.3, 26.08],
		'瓦房店': [121.979603, 39.627114],
		'即墨': [120.45, 36.38],
		'抚顺': [123.97, 41.97],
		'玉溪': [102.52, 24.35],
		'张家口': [114.87, 40.82],
		'阳泉': [113.57, 37.85],
		'莱州': [119.942327, 37.177017],
		'湖州': [120.1, 30.86],
		'汕头': [116.69, 23.39],
		'昆山': [120.95, 31.39],
		'宁波': [121.56, 29.86],
		'湛江': [110.359377, 21.270708],
		'揭阳': [116.35, 23.55],
		'荣成': [122.41, 37.16],
		'连云港': [119.16, 34.59],
		'葫芦岛': [120.836932, 40.711052],
		'常熟': [120.74, 31.64],
		'东莞': [113.75, 23.04],
		'河源': [114.68, 23.73],
		'淮安': [119.15, 33.5],
		'泰州': [119.9, 32.49],
		'南宁': [108.33, 22.84],
		'营口': [122.18, 40.65],
		'惠州': [114.4, 23.09],
		'江阴': [120.26, 31.91],
		'蓬莱': [120.75, 37.8],
		'韶关': [113.62, 24.84],
		'嘉峪关': [98.289152, 39.77313],
		'广州': [113.23, 23.16],
		'延安': [109.47, 36.6],
		'太原': [112.53, 37.87],
		'清远': [113.01, 23.7],
		'中山': [113.38, 22.52],
		'昆明': [102.73, 25.04],
		'寿光': [118.73, 36.86],
		'盘锦': [122.070714, 41.119997],
		'长治': [113.08, 36.18],
		'深圳': [114.07, 22.62],
		'珠海': [113.52, 22.3],
		'宿迁': [118.3, 33.96],
		'咸阳': [108.72, 34.36],
		'铜川': [109.11, 35.09],
		'平度': [119.97, 36.77],
		'佛山': [113.11, 23.05],
		'海口': [110.35, 20.02],
		'江门': [113.06, 22.61],
		'章丘': [117.53, 36.72],
		'肇庆': [112.44, 23.05],
		'大连': [121.62, 38.92],
		'临汾': [111.5, 36.08],
		'吴江': [120.63, 31.16],
		'石嘴山': [106.39, 39.04],
		'沈阳': [123.38, 41.8],
		'苏州': [120.62, 31.32],
		'茂名': [110.88, 21.68],
		'嘉兴': [120.76, 30.77],
		'长春': [125.35, 43.88],
		'胶州': [120.03336, 36.264622],
		'银川': [106.27, 38.47],
		'张家港': [120.555821, 31.875428],
		'三门峡': [111.19, 34.76],
		'锦州': [121.15, 41.13],
		'南昌': [115.89, 28.68],
		'柳州': [109.4, 24.33],
		'三亚': [109.511909, 18.252847],
		'自贡': [104.778442, 29.33903],
		'吉林': [126.57, 43.87],
		'阳江': [111.95, 21.85],
		'泸州': [105.39, 28.91],
		'西宁': [101.74, 36.56],
		'宜宾': [104.56, 29.77],
		'呼和浩特': [111.65, 40.82],
		'成都': [104.06, 30.67],
		'大同': [113.3, 40.12],
		'镇江': [119.44, 32.2],
		'桂林': [110.28, 25.29],
		'张家界': [110.479191, 29.117096],
		'宜兴': [119.82, 31.36],
		'北海': [109.12, 21.49],
		'西安': [108.95, 34.27],
		'金坛': [119.56, 31.74],
		'东营': [118.49, 37.46],
		'牡丹江': [129.58, 44.6],
		'遵义': [106.9, 27.7],
		'绍兴': [120.58, 30.01],
		'扬州': [119.42, 32.39],
		'常州': [119.95, 31.79],
		'潍坊': [119.1, 36.62],
		'重庆': [106.54, 29.59],
		'台州': [121.420757, 28.656386],
		'南京': [118.78, 32.04],
		'滨州': [118.03, 37.36],
		'贵阳': [106.71, 26.57],
		'无锡': [120.29, 31.59],
		'本溪': [123.73, 41.3],
		'克拉玛依': [84.77, 45.59],
		'渭南': [109.5, 34.52],
		'马鞍山': [118.48, 31.56],
		'宝鸡': [107.15, 34.38],
		'焦作': [113.21, 35.24],
		'句容': [119.16, 31.95],
		'北京': [116.46, 39.92],
		'徐州': [117.2, 34.26],
		'衡水': [115.72, 37.72],
		'包头': [110, 40.58],
		'绵阳': [104.73, 31.48],
		'乌鲁木齐': [87.68, 43.77],
		'枣庄': [117.57, 34.86],
		'杭州': [120.19, 30.26],
		'淄博': [118.05, 36.78],
		'鞍山': [122.85, 41.12],
		'溧阳': [119.48, 31.43],
		'库尔勒': [86.06, 41.68],
		'安阳': [114.35, 36.1],
		'开封': [114.35, 34.79],
		'济南': [117, 36.65],
		'德阳': [104.37, 31.13],
		'温州': [120.65, 28.01],
		'九江': [115.97, 29.71],
		'邯郸': [114.47, 36.6],
		'临安': [119.72, 30.23],
		'兰州': [103.73, 36.03],
		'沧州': [116.83, 38.33],
		'临沂': [118.35, 35.05],
		'南充': [106.110698, 30.837793],
		'天津': [117.2, 39.13],
		'富阳': [119.95, 30.07],
		'泰安': [117.13, 36.18],
		'诸暨': [120.23, 29.71],
		'郑州': [113.65, 34.76],
		'哈尔滨': [126.63, 45.75],
		'聊城': [115.97, 36.45],
		'芜湖': [118.38, 31.33],
		'唐山': [118.02, 39.63],
		'平顶山': [113.29, 33.75],
		'邢台': [114.48, 37.05],
		'德州': [116.29, 37.45],
		'济宁': [116.59, 35.38],
		'荆州': [112.239741, 30.335165],
		'宜昌': [111.3, 30.7],
		'义乌': [120.06, 29.32],
		'丽水': [119.92, 28.45],
		'洛阳': [112.44, 34.7],
		'秦皇岛': [119.57, 39.95],
		'株洲': [113.16, 27.83],
		'石家庄': [114.48, 38.03],
		'莱芜': [117.67, 36.19],
		'常德': [111.69, 29.05],
		'保定': [115.48, 38.85],
		'湘潭': [112.91, 27.87],
		'金华': [119.64, 29.12],
		'岳阳': [113.09, 29.37],
		'长沙': [113, 28.21],
		'衢州': [118.88, 28.97],
		'廊坊': [116.7, 39.53],
		'菏泽': [115.480656, 35.23375],
		'合肥': [117.27, 31.86],
		'武汉': [114.31, 30.52],
		'大庆': [125.03, 46.58]
	};

	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if(geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		return res;
	};

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
			aspectScale: 0.75,
			layoutCenter: ['58%', '50%'],
			layoutSize: '125%',
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
		series: [
		{
            name: '人数',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 2;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        },
        {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            })),
            symbolSize: function (val) {
                return val[2] / 5;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
//                  shadowBlur: 10,
//                  shadowColor: '#333'
                }
            },
            zlevel: 1
        }
		]
	});

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
				}
			],
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