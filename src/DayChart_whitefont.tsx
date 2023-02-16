import { FC, useEffect } from "react";
import * as echarts from 'echarts';
import React from "react";


const LineCharts: FC = () => {

    useEffect(() => {
        DayChart();
    });

    const DayChart = () => {
        var chartDom = document.getElementById("dayLineChart");
        var myChart = echarts.init(chartDom as HTMLDivElement);
        var option;

        let base = +new Date(2016, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let valueBase = Math.random() * 300;
        let valueBase2 = Math.random() * 50;
        let time = [1, 2, 3, 4]; //[時間]
        option = {
            title: {
                text: "溫溼度統計變化",
                textStyle: {
                    color: "#fff"
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                textStyle: {
                    color: "#fff"
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                show: true,
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#b1b1b1"
                    }
                }
            },
            series: [
                {
                    name: '濕度',
                    type: 'line',
                    data: [76, 73, 65, 78, 67, 70, 72],
                    itemStyle: {
                        color: '#4D82AB'
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高濕度' },
                            { type: 'min', name: '最低濕度' }
                        ]
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }]
                    }
                },
                //   data: [26,27,24,25,23,20,19],
                {
                    name: '溫度',
                    type: 'line',
                    data: [26, 27, 24, 25, 23, 20, 19],
                    itemStyle: {
                        color: '#AB594D'
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高濕度' },
                            { type: 'min', name: '最低濕度' }
                        ]
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }]
                    }
                }
            ]
        };
        myChart.clear()
        option && myChart.setOption(option);


    };

    return (
        <div id="dayLineChart" style={{ width: "80%", margin: "50px auto", height: "600px" }} />
    );
};
export default LineCharts;
 // 折線圖
  // const initChart = () => {
  //   var chartDom = document.getElementById("lineChart");
  //   var myChart = echarts.init(chartDom);
  //   var option;

  //   let base = +new Date(2016, 9, 3);
  //   let oneDay = 24 * 3600 * 1000;
  //   let valueBase = Math.random() * 300;
  //   let valueBase2 = Math.random() * 50;
  //   let time = [1, 2, 3, 4]; //[時間]
  //   let line1 = [
  //     [time[0], 10],
  //     [time[1], 21],
  //   ]; //[時間,值] 溫度數據
  //   let line2 = [
  //     [time[0], 14],
  //     [time[1], 20],
  //   ]; //[時間,值] 濕度數據
  //   option = {
  //     title: {
  //       top: "5%",
  //       left: "center",
  //       text: "溫溼度統計變化",
  //     },
  //     legend: {
  //       top: "bottom",
  //       data: ["Intention"],
  //     },
  //     tooltip: {
  //       triggerOn: "none",
  //       position: function (pt) {
  //         return [pt[0], 130];
  //       },
  //     },
  //     toolbox: {
  //       left: "center",
  //       itemSize: 25,
  //       top: 55,
  //       feature: {
  //         dataZoom: {
  //           yAxisIndex: "none",
  //         },
  //         restore: {},
  //       },
  //     },
  //     xAxis: {
  //       type: "time",
  //       axisPointer: {
  //         value: "2016-10-7",
  //         snap: true,
  //         lineStyle: {
  //           color: "#7581BD",
  //           width: 2,
  //         },
  //         label: {
  //           show: true,
  //           formatter: function (params) {
  //             return echarts.format.formatTime("yyyy-MM-dd", params.value);
  //           },
  //           backgroundColor: "#7581BD",
  //         },
  //         handle: {
  //           show: false,
  //           color: "#7581BD",
  //         },
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       axisTick: {
  //         inside: true,
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         inside: true,
  //         formatter: "{value}\n",
  //       },
  //       z: 10,
  //     },
  //     grid: {
  //       top: 110,
  //       left: 150,
  //       right: 150,
  //       height: 250,
  //     },
  //     dataZoom: [
  //       {
  //         type: "inside",
  //         throttle: 50,
  //       },
  //     ],
  //     series: [
  //       {
  //         name: "Fake Data",
  //         type: "line",
  //         smooth: true,
  //         symbol: "circle",
  //         symbolSize: 5,
  //         sampling: "average",
  //         itemStyle: {
  //           color: "#0770FF",
  //         },
  //         stack: "a",

  //         data: line1,
  //       },
  //       {
  //         name: "Fake Data",
  //         type: "line",
  //         smooth: true,
  //         stack: "a",
  //         symbol: "circle",
  //         symbolSize: 5,
  //         sampling: "average",
  //         itemStyle: {
  //           color: "#F2597F",
  //         },

  //         data: line2,
  //       },
  //     ],
  //   };

  //   option && myChart.setOption(option);
  // };