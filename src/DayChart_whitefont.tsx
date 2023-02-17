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
        // var select_time = 17;//使用者選擇的時間
        var humi = [76, 73, 65, 78, 67, 70, 72, 68, 67, 80, 70, 64, 68, 67, 80, 70, 66, 83, 64, 68, 67, 80, 70, 68];//濕度資料
        var temp = [26, 27, 24, 25, 23, 20, 19, 27, 28, 25, 26, 22, 19, 23, 25, 23, 20, 19, 27, 28, 25, 23, 20, 19];//氣溫資料
        var select_time = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
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
                // data: [
                //     select_time + "00:00",
                //     select_time + "01:00",
                //     select_time + "02:00",
                //     select_time + "03:00",
                //     select_time + "04:00",
                //     select_time + "05:00",
                //     select_time + "06:00",
                //     select_time + "08:00",
                //     select_time + "09:00",
                //     select_time + "10:00",
                //     select_time + "11:00",
                //     select_time + "12:00",
                //     select_time + "13:00",
                //     select_time + "14:00",
                //     select_time + "15:00",
                //     select_time + "16:00",
                //     select_time + "17:00",
                //     select_time + "18:00",
                //     select_time + "19:00",
                //     select_time + "20:00",
                //     select_time + "21:00",
                //     select_time + "22:00",
                //     select_time + "23:00"],
                data: select_time,
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
                    data: humi,
                    itemStyle: {
                        normal: {
                            color: '#3F7D90',
                            lineStyle: {
                                width: 4
                            }
                        }
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
                    data: temp,
                    itemStyle: {
                        normal: {
                            color: '#A55346',
                            lineStyle: {
                                width: 4
                            }
                        }
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