var busLines =[

{coords: [[2700, 190],[3174,850],[2622,1126],[2098,1410],[1704,1092],[1032,1463],[767,1305],[153,922],[728,492]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[1486,906],[767,1305],[153,922],[728,492]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[1032,1463],[767,1305]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[2098,1410],[2622,1126]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[1486,906],[2079,557],[2700,190]],lineStyle: {normal: {color: 'red',}},},
{coords: [[728,492],[135,922],[767,1305],[1486,906],[2079,557],[2622, 1126]],lineStyle: {normal: {color: 'red',}},},
{coords: [[2622,1126],[2079,557],[1486,906],[767, 1305]],lineStyle: {normal: {color: 'red',}},},
{coords: [[2700, 190],[3174,850],[2622,1126]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[1486,906],[928,492]],lineStyle: {normal: {color: 'red',}},},
 ];
var busLines1 =[
{coords: [[1704, 1092],[1032,1463],[767,1305],[153,922],[728,492]],lineStyle: {normal: {color: 'red',}},},
{coords: [[1704, 1092],[2098,1410],[2622,1126],[3174,850],[2700,190]],lineStyle: {normal: {color: 'red',}},},
 ];

var busLinesHome =[
  {coords: [[1276, 1092],[728,492]],lineStyle: {normal: {color: 'red',}},},
 ];

 var busLinesNull =[];



function  selectOpation(bt,busLines,busLines1,symbolSize,speed,delay,delay1,trailLength,loop2){
var option = {
    grid: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    },
    xAxis: {
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        max: 3400,
        min: 0
    },
    yAxis: {
        silent: true,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        max: 1800,
        min: 0
    },
    series: [{
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: busLines1,
            silent: false,
            lineStyle: {
                normal: {
                    width: 0,
                    loop: false,
                }
            },
            effect: {
                // period: 100,
                symbol: 'image://static/imgs/secondLevel/cc.png',
                constantSpeed: speed,
                show: true,
                trailLength: trailLength,
                symbolSize: symbolSize,
                delay: delay,
            },
            zlevel: 1
        },{
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: busLines,
            silent: false,
            lineStyle: {
                normal: {
                    width: 0,
                    loop: loop2,
                }
            },
            effect: {
                // period: 100,
                symbol: 'image://static/imgs/secondLevel/cc.png',
                constantSpeed: speed,
                show: true,
                trailLength: trailLength,
                symbolSize: symbolSize,
                delay: delay1,
            },
            zlevel: 1
        }]   
    
   };  
   bt.setOption(option);
}

  
// 