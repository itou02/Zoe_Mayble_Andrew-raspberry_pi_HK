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
        var select_time = ["00", "01", "02", "03", "04", "05", "06", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]

        const colors = ['#EE6666', '#79A6AF'];
        option = {
            title: {
                text: "溫濕度統計變化",
                textStyle: {
                    color: "#fff",
                    fontSize: 25,
                    // bottom: 20
                }
            },
            tooltip: {
                trigger: 'axis',
                width: 30
            },
            grid: {
                // right: '20%'
                top: '20%'
            },
            legend: {
                textStyle: {
                    color: "#fff",
                    fontSize: 20
                }
            },
            toolbox: {
                itemSize: 30,
                color: '#fff',
                show: true,
                iconStyle: {
                    borderColor: '#fff',
                    emphasis: {
                        borderColor: '#d7ccaa',
                    },
                },
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
                boundaryGap: true,
                data: select_time,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 20
                    }
                }
            },
            yAxis: [

                {
                    type: 'value',
                    // name: '溫度',
                    // nameTextStyle: {
                    //     fontSize: 20,
                    //     padding: 10
                    // },
                    splitLine: {
                        lineStyle: {
                            opacity: 0.3
                        }
                    },
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C',
                        fontSize: 20
                    }
                },
                {
                    type: 'value',
                    // name: '濕度',
                    // nameTextStyle: {
                    //     fontSize: 20,
                    //     padding: 10
                    // },
                    splitLine: {
                        show: false
                    },
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        fontSize: 20
                    }
                }
            ],
            series: [
                //   data: [26,27,24,25,23,20,19],
                {
                    name: 'Temperature',
                    type: 'line',
                    data: temp,
                    symbolSize: 9,
                    smooth: false,
                    itemStyle: {
                        normal: {
                            color: colors[0],
                            lineStyle: {
                                width: 6
                            }
                        }
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高溫度' },
                            { type: 'min', name: '最低溫度' }
                        ],
                        symbolSize: 60,
                        label: {
                            fontSize: 20
                        }

                    },
                    // markLine: {
                    //     data: [{ type: 'average', name: 'Avg' }],
                    //     lineStyle: {
                    //         width: 2
                    //     }
                    // }

                },
                {
                    name: 'Humidity',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: humi,
                    itemStyle: {
                        normal: {
                            color: colors[1],
                            lineStyle: {
                                width: 4
                            }
                        }
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高濕度' },
                            { type: 'min', name: '最低濕度' }
                        ],
                        symbolSize: 60,
                        label: {
                            fontSize: 20
                        }
                    },
                    // markLine: {
                    //     data: [{ type: 'average', name: 'Avg' }],
                    //     lineStyle: {
                    //         width: 2
                    //     }
                    // }
                },
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
