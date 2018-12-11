$(function() {
	getMarketMapChart();
	getMarketBarChart();
});

function getMarketBarChart() {
	var myChart = echarts.init(document.getElementById("marketBarId"));
	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		grid: {
			left: '3%',
			right: '6%',
			bottom: '3%',
			top: 40,
			containLabel: true
		},
		xAxis: {
			type: 'value',
			show: true,
			position: 'top',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
					fontSize: 20,
				},
			},
			splitLine: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			axisLine: {
				show: true
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
					fontSize: 20,
				},
			},
			splitLine: {
				show: false
			},
			data: ['长春', '济南', '合肥', '上海', '南昌', '广州', '重庆', '贵阳', '昆明', '深圳']
		},
		series: [{
			name: '全部',
			type: 'bar',
			barCategoryGap: '45%',
			label: {
				normal: {
					show: true
				},
				emphasis: {
					show: true,
				}
			},
			itemStyle: {
				normal: {
					color: "#00CCFF"
				}
			},
			data: [{
					name: '长春',
					value: 70
				}, {
					name: '济南',
					value: 86
				}, {
					name: '合肥',
					value: 96
				}, {
					name: '上海',
					value: 95
				},
				{
					name: '南昌',
					value: 90
				},
				{
					name: '广州',
					value: 80
				},
				{
					name: '重庆',
					value: 70
				},
				{
					name: '南昌',
					value: 80
				},
				{
					name: '贵阳',
					value: 90
				},
				{
					name: '昆明',
					value: 100
				},
				{
					name: '深圳',
					value: 120
				}
			]
		}]
	};
	myChart.setOption(option);
}

function getMarketMapChart() {

	var myChart = echarts.init(document.getElementById("marketMapId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		color: ['gold', 'aqua', 'lime'],
		tooltip: {
			trigger: 'item',
			formatter: '{b}'
		},
		dataRange: {
			min: 0,
			max: 200,
			calculable: true,
			color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
			textStyle: {
				color: '#fff'
			}
		},
		series: [{
				name: '全国',
				type: 'map',
				roam: true,
				hoverable: false,
				mapType: 'china',
				itemStyle: {
					normal: {
						color: '#003366',
						borderColor: 'rgba(108, 247, 242,.3)',
						borderWidth: 5,
						//					shadowColor: 'rgba(84, 243, 244, 0.8)',
						shadowBlur: 0,
					},
					emphasis: {
						color: 'rgba(37, 43, 61, .5)'
					}
				},
				data: [],
				markLine: {
					smooth: true,
					symbol: ['none', 'circle'],
					symbolSize: 1,
					itemStyle: {
						normal: {
							color: '#fff',
							borderWidth: 1,
							borderColor: 'rgba(30,144,255,0.5)'
						}
					},
					data: [
						[{
							name: '深圳'
						}, {
							name: '广州'
						}]
					],
				},
				geoCoord: {
					'上海': [121.4648, 31.2891],
					'东莞': [113.8953, 22.901],
					'东营': [118.7073, 37.5513],
					'中山': [113.4229, 22.478],
					'临汾': [111.4783, 36.1615],
					'临沂': [118.3118, 35.2936],
					'丹东': [124.541, 40.4242],
					'丽水': [119.5642, 28.1854],
					'乌鲁木齐': [87.9236, 43.5883],
					'佛山': [112.8955, 23.1097],
					'保定': [115.0488, 39.0948],
					'兰州': [103.5901, 36.3043],
					'包头': [110.3467, 41.4899],
					'北京': [116.4551, 40.2539],
					'北海': [109.314, 21.6211],
					'南京': [118.8062, 31.9208],
					'南宁': [108.479, 23.1152],
					'南昌': [116.0046, 28.6633],
					'南通': [121.1023, 32.1625],
					'厦门': [118.1689, 24.6478],
					'台州': [121.1353, 28.6688],
					'合肥': [117.29, 32.0581],
					'呼和浩特': [111.4124, 40.4901],
					'咸阳': [108.4131, 34.8706],
					'哈尔滨': [127.9688, 45.368],
					'唐山': [118.4766, 39.6826],
					'嘉兴': [120.9155, 30.6354],
					'大同': [113.7854, 39.8035],
					'大连': [122.2229, 39.4409],
					'天津': [117.4219, 39.4189],
					'太原': [112.3352, 37.9413],
					'威海': [121.9482, 37.1393],
					'宁波': [121.5967, 29.6466],
					'宝鸡': [107.1826, 34.3433],
					'宿迁': [118.5535, 33.7775],
					'常州': [119.4543, 31.5582],
					'广州': [113.5107, 23.2196],
					'廊坊': [116.521, 39.0509],
					'延安': [109.1052, 36.4252],
					'张家口': [115.1477, 40.8527],
					'徐州': [117.5208, 34.3268],
					'德州': [116.6858, 37.2107],
					'惠州': [114.6204, 23.1647],
					'成都': [103.9526, 30.7617],
					'扬州': [119.4653, 32.8162],
					'承德': [117.5757, 41.4075],
					'拉萨': [91.1865, 30.1465],
					'无锡': [120.3442, 31.5527],
					'日照': [119.2786, 35.5023],
					'昆明': [102.9199, 25.4663],
					'杭州': [119.5313, 29.8773],
					'枣庄': [117.323, 34.8926],
					'柳州': [109.3799, 24.9774],
					'株洲': [113.5327, 27.0319],
					'武汉': [114.3896, 30.6628],
					'汕头': [117.1692, 23.3405],
					'江门': [112.6318, 22.1484],
					'沈阳': [123.1238, 42.1216],
					'沧州': [116.8286, 38.2104],
					'河源': [114.917, 23.9722],
					'泉州': [118.3228, 25.1147],
					'泰安': [117.0264, 36.0516],
					'泰州': [120.0586, 32.5525],
					'济南': [117.1582, 36.8701],
					'济宁': [116.8286, 35.3375],
					'海口': [110.3893, 19.8516],
					'淄博': [118.0371, 36.6064],
					'淮安': [118.927, 33.4039],
					'深圳': [114.5435, 22.5439],
					'清远': [112.9175, 24.3292],
					'温州': [120.498, 27.8119],
					'渭南': [109.7864, 35.0299],
					'湖州': [119.8608, 30.7782],
					'湘潭': [112.5439, 27.7075],
					'滨州': [117.8174, 37.4963],
					'潍坊': [119.0918, 36.524],
					'烟台': [120.7397, 37.5128],
					'玉溪': [101.9312, 23.8898],
					'珠海': [113.7305, 22.1155],
					'盐城': [120.2234, 33.5577],
					'盘锦': [121.9482, 41.0449],
					'石家庄': [114.4995, 38.1006],
					'福州': [119.4543, 25.9222],
					'秦皇岛': [119.2126, 40.0232],
					'绍兴': [120.564, 29.7565],
					'聊城': [115.9167, 36.4032],
					'肇庆': [112.1265, 23.5822],
					'舟山': [122.2559, 30.2234],
					'苏州': [120.6519, 31.3989],
					'莱芜': [117.6526, 36.2714],
					'菏泽': [115.6201, 35.2057],
					'营口': [122.4316, 40.4297],
					'葫芦岛': [120.1575, 40.578],
					'衡水': [115.8838, 37.7161],
					'衢州': [118.6853, 28.8666],
					'西宁': [101.4038, 36.8207],
					'西安': [109.1162, 34.2004],
					'贵阳': [106.6992, 26.7682],
					'连云港': [119.1248, 34.552],
					'邢台': [114.8071, 37.2821],
					'邯郸': [114.4775, 36.535],
					'郑州': [113.4668, 34.6234],
					'鄂尔多斯': [108.9734, 39.2487],
					'重庆': [107.7539, 30.1904],
					'金华': [120.0037, 29.1028],
					'铜川': [109.0393, 35.1947],
					'银川': [106.3586, 38.1775],
					'镇江': [119.4763, 31.9702],
					'长春': [125.8154, 44.2584],
					'长沙': [113.0823, 28.2568],
					'长治': [112.8625, 36.4746],
					'阳泉': [113.4778, 38.0951],
					'青岛': [120.4651, 36.3373],
					'韶关': [113.7964, 24.7028]
				}
			},
			{
				name: '深圳',
				type: 'map',
				mapType: 'china',
				data: [],
				markLine: {
					smooth: true,
					effect: {
						show: true,
						scaleSize: 1,
						period: 15,
						color: '#fff',
						shadowBlur: 10
					},
					itemStyle: {
						normal: {
							borderWidth: 2,
							lineStyle: {
								type: 'solid',
								shadowBlur: 10
							}
						}
					},
					data: [
						[{
							name: '深圳',
						}, {
							name: '长春',
							value: 145
						}],
						[{
							name: '深圳'
						}, {
							name: '济南',
							value: 130
						}],
						[{
							name: '深圳'
						}, {
							name: '合肥',
							value: 160
						}],
						[{
							name: '深圳'
						}, {
							name: '上海',
							value: 150
						}],
						[{
							name: '深圳'
						}, {
							name: '南昌',
							value: 160
						}],
						[{
							name: '深圳'
						}, {
							name: '广州',
							value: 150
						}],
						[{
							name: '深圳'
						}, {
							name: '重庆',
							value: 170
						}],
						[{
							name: '深圳'
						}, {
							name: '贵阳',
							value: 130
						}],
						[{
							name: '深圳'
						}, {
							name: '昆明',
							value: 120
						}]
					]
				},
				markPoint: {
					symbol: 'emptyCircle',
					symbolSize: function(v) {
						return 10 + v / 3
					},
					effect: {
						show: true,
						period: 45,
						shadowBlur: 0
					},
					itemStyle: {
						normal: {
							label: {
								show: false
							}
						},
						emphasis: {
							label: {
								position: 'top'
							}
						}
					},
					data: [{
							name: '长春',
							value: 70
						}, {
							name: '济南',
							value: 86
						}, {
							name: '合肥',
							value: 96
						}, {
							name: '上海',
							value: 95
						},
						{
							name: '南昌',
							value: 90
						},
						{
							name: '广州',
							value: 80
						},
						{
							name: '重庆',
							value: 70
						},
						{
							name: '南昌',
							value: 80
						},
						{
							name: '贵阳',
							value: 90
						},
						{
							name: '昆明',
							value: 100
						},
						{
							name: '深圳',
							value: 120
						}
					]
				}
			}
			/*, */
		]
	};
	myChart.setOption(option);
	//window.addEventListener('resize', function () {
	//eobj_map.resize();
	//})
}

//市场分布地图
function getMarketMapChart2() {
	var myCostChart = echarts.init(document.getElementById("marketMapId"));
	var geoCoordMap = {
		'上海': [121.4648, 31.2891],
		'东莞': [113.8953, 22.901],
		'东营': [118.7073, 37.5513],
		'中山': [113.4229, 22.478],
		'临汾': [111.4783, 36.1615],
		'临沂': [118.3118, 35.2936],
		'丹东': [124.541, 40.4242],
		'丽水': [119.5642, 28.1854],
		'乌鲁木齐': [87.9236, 43.5883],
		'佛山': [112.8955, 23.1097],
		'保定': [115.0488, 39.0948],
		'兰州': [103.5901, 36.3043],
		'包头': [110.3467, 41.4899],
		'北京': [116.4551, 40.2539],
		'北海': [109.314, 21.6211],
		'南京': [118.8062, 31.9208],
		'南宁': [108.479, 23.1152],
		'南昌': [116.0046, 28.6633],
		'南通': [121.1023, 32.1625],
		'厦门': [118.1689, 24.6478],
		'台州': [121.1353, 28.6688],
		'合肥': [117.29, 32.0581],
		'呼和浩特': [111.4124, 40.4901],
		'咸阳': [108.4131, 34.8706],
		'哈尔滨': [127.9688, 45.368],
		'唐山': [118.4766, 39.6826],
		'嘉兴': [120.9155, 30.6354],
		'大同': [113.7854, 39.8035],
		'大连': [122.2229, 39.4409],
		'天津': [117.4219, 39.4189],
		'太原': [112.3352, 37.9413],
		'威海': [121.9482, 37.1393],
		'宁波': [121.5967, 29.6466],
		'宝鸡': [107.1826, 34.3433],
		'宿迁': [118.5535, 33.7775],
		'常州': [119.4543, 31.5582],
		'广州': [113.5107, 23.2196],
		'廊坊': [116.521, 39.0509],
		'延安': [109.1052, 36.4252],
		'张家口': [115.1477, 40.8527],
		'徐州': [117.5208, 34.3268],
		'德州': [116.6858, 37.2107],
		'惠州': [114.6204, 23.1647],
		'成都': [103.9526, 30.7617],
		'扬州': [119.4653, 32.8162],
		'承德': [117.5757, 41.4075],
		'拉萨': [91.1865, 30.1465],
		'无锡': [120.3442, 31.5527],
		'日照': [119.2786, 35.5023],
		'昆明': [102.9199, 25.4663],
		'杭州': [119.5313, 29.8773],
		'枣庄': [117.323, 34.8926],
		'柳州': [109.3799, 24.9774],
		'株洲': [113.5327, 27.0319],
		'武汉': [114.3896, 30.6628],
		'汕头': [117.1692, 23.3405],
		'江门': [112.6318, 22.1484],
		'沈阳': [123.1238, 42.1216],
		'沧州': [116.8286, 38.2104],
		'河源': [114.917, 23.9722],
		'泉州': [118.3228, 25.1147],
		'泰安': [117.0264, 36.0516],
		'泰州': [120.0586, 32.5525],
		'济南': [117.1582, 36.8701],
		'济宁': [116.8286, 35.3375],
		'海口': [110.3893, 19.8516],
		'淄博': [118.0371, 36.6064],
		'淮安': [118.927, 33.4039],
		'深圳': [114.5435, 22.5439],
		'清远': [112.9175, 24.3292],
		'温州': [120.498, 27.8119],
		'渭南': [109.7864, 35.0299],
		'湖州': [119.8608, 30.7782],
		'湘潭': [112.5439, 27.7075],
		'滨州': [117.8174, 37.4963],
		'潍坊': [119.0918, 36.524],
		'烟台': [120.7397, 37.5128],
		'玉溪': [101.9312, 23.8898],
		'珠海': [113.7305, 22.1155],
		'盐城': [120.2234, 33.5577],
		'盘锦': [121.9482, 41.0449],
		'石家庄': [114.4995, 38.1006],
		'福州': [119.4543, 25.9222],
		'秦皇岛': [119.2126, 40.0232],
		'绍兴': [120.564, 29.7565],
		'聊城': [115.9167, 36.4032],
		'肇庆': [112.1265, 23.5822],
		'舟山': [122.2559, 30.2234],
		'苏州': [120.6519, 31.3989],
		'莱芜': [117.6526, 36.2714],
		'菏泽': [115.6201, 35.2057],
		'营口': [122.4316, 40.4297],
		'葫芦岛': [120.1575, 40.578],
		'衡水': [115.8838, 37.7161],
		'衢州': [118.6853, 28.8666],
		'西宁': [101.4038, 36.8207],
		'西安': [109.1162, 34.2004],
		'贵阳': [106.6992, 26.7682],
		'连云港': [119.1248, 34.552],
		'邢台': [114.8071, 37.2821],
		'邯郸': [114.4775, 36.535],
		'郑州': [113.4668, 34.6234],
		'鄂尔多斯': [108.9734, 39.2487],
		'重庆': [107.7539, 30.1904],
		'金华': [120.0037, 29.1028],
		'铜川': [109.0393, 35.1947],
		'银川': [106.3586, 38.1775],
		'镇江': [119.4763, 31.9702],
		'长春': [125.8154, 44.2584],
		'长沙': [113.0823, 28.2568],
		'长治': [112.8625, 36.4746],
		'阳泉': [113.4778, 38.0951],
		'青岛': [120.4651, 36.3373],
		'韶关': [113.7964, 24.7028]
	};
	var SZData = [
		[{
			name: '深圳',
		}, {
			name: '长春',
			value: 95,
			level: 1
		}],
		[{
			name: '深圳'
		}, {
			name: '济南',
			value: 90,
			level: 2
		}],
		[{
			name: '深圳'
		}, {
			name: '合肥',
			value: 80,
			level: 3
		}],
		[{
			name: '深圳'
		}, {
			name: '上海',
			value: 150,
			level: 4
		}],
		[{
			name: '深圳'
		}, {
			name: '南昌',
			value: 60,
			level: 5
		}],
		[{
			name: '深圳'
		}, {
			name: '广州',
			value: 50,
			level: 6
		}],
		[{
			name: '深圳'
		}, {
			name: '重庆',
			value: 90,
			level: 7
		}],
		[{
			name: '深圳'
		}, {
			name: '贵阳',
			value: 110,
			level: 8
		}],
		[{
			name: '深圳'
		}, {
			name: '昆明',
			value: 120,
			level: 9
		}]
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var levelColorMap = {
		'1': 'rgba(241, 109, 115, 1)',
		'2': 'rgba(255, 235, 59, 1)',
		'3': 'rgba(147, 235, 248, 1)',
		'4': 'rgba(18, 147, 204, 1)',
		'5': 'rgba(113, 62, 253, 1)',
		'6': 'rgba(0, 232, 255, 1)',
		'7': 'rgba(41, 96, 251, 1)',
		'8': 'rgba(0, 153, 255, 1)',
		'9': 'rgba(51, 255, 153, 1)',
		'10': 'rgba(153, 51, 255, 1)'
	};

	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			var fromCoord = geoCoordMap[dataItem[0].name];
			var toCoord = geoCoordMap[dataItem[1].name];
			if(fromCoord && toCoord) {
				res.push({
					fromName: dataItem[0].name,
					toName: dataItem[1].name,
					coords: [fromCoord, toCoord]
				});
			}
		}
		return res;
	};

	var color = ['#a6c84c', '#ffa022', '#46bee9'];
	var series = [];
	[
		['深圳', SZData]
	].forEach(function(item, i) {
		series.push({
			name: item[0] + ' Top10',
			type: 'lines',
			zlevel: 1,
			effect: {
				show: true,
				symbol: 'arrow',
				period: 6,
				trailLength: 0,
				color: '#FEDE00',
				symbolSize: 18,
				opacity: 1
			},
			lineStyle: {
				normal: {
					color: '#E4E70E',
					width: 5,
					curveness: 0.2,
					opacity: 1
				}
			},
			data: convertData(item[1])
		}, {
			name: item[0] + ' Top10',
			type: 'lines',
			zlevel: 2,
			symbol: ['none', 'arrow'],
			symbolSize: 26,

			lineStyle: {
				normal: {
					color: color[i],
					width: 1,
					opacity: 0.6,
					curveness: 0.2
				}
			},
			data: convertData(item[1])
		}, {
			name: item[0] + ' Top10',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				brushType: 'fill'
			},
			label: {
				normal: {
					show: true,
					position: 'right', //[40,0],
					formatter: '{b}',
					fontSize: 22,
					color: '#EBF3F7'
				}
			},
			symbolSize: function(val) {
				return val[2] / 2;
			},
			itemStyle: {
				normal: {
					color: function(params) {
						return levelColorMap[params.data.level];
					},
				}
			},
			data: item[1].map(function(dataItem) {
				return {
					name: dataItem[1].name,
					value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
					level: dataItem[1].level
				};
			})
		});
	});

	option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			show: false
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			show: false
		},
		geo: {
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
			aspectScale: 0.75,
			layoutCenter: ['50%', '50%'],
			layoutSize: '115%',
			label: {
				emphasis: {
					show: false
				}
			},
			roam: true,
			itemStyle: {
				normal: {
					areaColor: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(11, 54, 122,.5)'
							},
							{
								offset: 1,
								color: 'rgba(16, 50, 104,.6)'
							}
						]
					),
					borderColor: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(36, 160, 244,.3)'
							},
							{
								offset: 1,
								color: 'rgba(108, 247, 242,.3)'
							}
						]
					),
					borderWidth: 4,
					shadowColor: 'rgba(84, 243, 244, 0.8)',
					shadowBlur: 0,
				},
				emphasis: {
					color: 'rgba(37, 43, 61, .5)'
				}
			}
		},
		series: series
	};
	myCostChart.setOption(option);
}

//营业利润曲线图
function getAssetStatisticCharts() {
	var myCostChart = echarts.init(document.getElementById("assetStatisticsId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '集团2008-2017年纳税统计表',
			left: '10%',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 44,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		grid: {
			left: '10%',
			top: '18%',
			right: '10%',
			bottom: '7%',
			containLabel: true
		},
		xAxis: {
			axisLabel: {
				show: true,
				margin: 20,
				color: '#96D1DF',
				fontSize: 22,
			},
			axisTick: {
				show: false,
				inside: true, // 控制小标记是否在grid里 
				length: 5, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#405E7D',
					width: 1
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#475263',
					width: 1
				}
			},
			boundaryGap: false,
			data: ['08年', '09年', '10年', '11年', '12年', '13年', '14年', '15年', '16年', '17年'],
		},
		yAxis: {
			type: 'value',
			nameTextStyle: {
				color: '#ffffff',
				fontSize: '16',
			},
			axisLabel: {
				show: true,
				margin: 35,
				color: '#96D1DF',
				fontSize: 20,
				formatter: function(value) {
					if(value == 0) {
						return "";
					}
					//					if(value != 0 && Math.abs(value) >= 10000) {
					//						return value / 10000 + 'w';
					//					} else {
					//						return value;
					//					}
					return value + '亿';
				}
			},
			axisLine: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#728291',
					width: 2,
					type: 'dashed'
				}
			},
		},
		series: [{
			type: 'bar',
			barWidth: '30%',
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
								color: '#01E0FF'
							},
							{
								offset: 0.8,
								color: '#4B55FF'
							},
							{
								offset: 1,
								color: '#7D3BFF'
							}
						]
					),
					barBorderRadius: 50,
					borderWidth: 0,
				}
			},
			data: [3.06, 3.13, 3.24, 3.56, 3.88, 4.01, 4.25, 4.62, 4.86, 5.89]
		}]
	};

	myCostChart.setOption(option);
}

//营业利润曲线图
function getPersonalNumCharts() {
	var myCostChart = echarts.init(document.getElementById("operatingProfitId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		grid: {
			left: '6%',
			top: '1%',
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
				show: false,
				inside: true, // 控制小标记是否在grid里 
				length: 5, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#405E7D',
					width: 1
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#405E7D',
					width: 1
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
				margin: 30,
				color: '#999798',
				fontSize: 18,
				formatter: function(value) {
					//					if(value != 0 && Math.abs(value) >= 10000) {
					//						return value / 10000 + 'w';
					//					} else {
					//						return value;
					//					}
					return value + '亿';

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
							color: '#1555BB'
						}, {
							offset: 0.3,
							color: '#149FCD'
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
							color: '#4EE2CC'
						},
						{
							offset: 1,
							color: '#5181DE'
						}
					]
				),
				width: 8,
				shadowColor: 'rgba(0, 0, 0, 0.2)',
				shadowBlur: 15,
				shadowOffsetX: -25,
				shadowOffsetY: 30
			},
			data: [3.03, 3.17, 3.27, 3.47, 3.9, 4.18, 4.77, 5.78, 5.71, 7.8]
		}]
	};

	myCostChart.setOption(option);
}

//各公司销售额统计图
function getHuanCharts() {
	var myChart = echarts.init(document.getElementById("consumptionRateId"));
	var resultData = [{
		name: "长春",
		value: 10
	}, {
		name: "济南",
		value: 12
	}, {
		name: "合肥",
		value: 18
	}, {
		name: "南京",
		value: 29
	}, {
		name: "南昌",
		value: 13
	}, {
		name: "广州",
		value: 27
	}, {
		name: "重庆",
		value: 16
	}, {
		name: "贵阳",
		value: 10
	}, {
		name: "昆明",
		value: 8
	}];
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '各公司销售额统计图',
			left: 'center',
			bottom: '10%',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 30,
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
			radius: ['40%', '55%'],
			center: ['50%', '35%'],
			color: ['#06F4FE', '#0C9EF3', '#146AE3', '#4C3ED4', '#D92356'],
			hoverAnimation: false,
			label: {
				normal: {
					formatter: "{b}",
					textStyle: {
						color: '#D6D7D9',
						fontSize: 20,
					},
				}
			},
			labelLine: {
				normal: {
					width: 3
				}
			},
			data: resultData
		}]
	};
	myChart.setOption(option);
}

//劲嘉集团销售额逐年统计图
function getAmountStatisticsCharts() {
	var myChart = echarts.init(document.getElementById("amountStatisticsId"));
	var option = {
		backgroundColor: 'rgba(255,255,255,0)',
		title: {
			text: '劲嘉集团销售额逐年统计图',
			left: 'center',
			bottom: '0%',
			textStyle: {
				fontFamily: 'zhsrxt',
				fontSize: 30,
				fontWeight: '500',
				color: '#fff' // 主标题文字颜色
			},

		},
		grid: {
			top: '8%',
			left: '1%',
			right: '4%',
			bottom: '16%',
			containLabel: true
		},
		xAxis: {
			data: ['08年', '09年', '10年', '11年', '12年', '13年', '14年', '15年', '16年', '17年'],
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
					//					if(value != 0 && value >= 1000) {
					//						return value / 1000 + '亿';
					//					} else {
					//						return value + '亿';
					//					}
					return value + '亿';
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
				barWidth: '52%',
				barGap: '-100%',
				barCategoryGap: '40%',
				data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
				animation: false
			},
			{
				type: 'bar',
				barWidth: '52%',
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
									color: '#793CFC'
								},
								{
									offset: 0.4,
									color: '#0971FF'
								},
								{
									offset: 1,
									color: '#00E8FF'
								}
							]
						)
					}
				},
				data: [13.3, 13.1, 12.9, 12.7, 12.5, 12.1, 12.8, 13.3, 13.8, 14.2]
			}
		]
	};
	myChart.setOption(option);
}