import { FC, useEffect } from "react";
import * as echarts from 'echarts';
import React from "react";

const LineCharts: FC = (data_test) => {

    useEffect(() => {
        HourChart(data_test);
    });
    const HourChart = (data_test) => {
        var chartDom = document.getElementById("hourLineChart");
        var myChart = echarts.init(chartDom as HTMLDivElement);
        var option;
        var temp = data_test.data_test[1];
        var humi = data_test.data_test[2];
        var time = data_test.data_test[0];
        console.log("time",time);
        
        // var humi = [66, 60, 64, 65, 67, 62, 63, 64, 68, 65, 66, 62, 67];//濕度資料
        // var temp = [27, 28, 25, 26, 22, 19, 23, 25, 26, 22, 25, 24, 22];//氣溫資料

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
                        borderColor: '#D6B24E',
                    },
                },
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                show: true,
                boundaryGap: true,
                data: [
                    time ],
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
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
                        fontSize: 16
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
                        fontSize: 16
                    }
                }
            ],
            series: [
                //   data: [26,27,24,25,23,20,19],
                {
                    name: '溫度',
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
                    name: '濕度',
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
        <div id="hourLineChart" style={{ width: "80%", margin: "50px auto", height: "600px" }} />
    );
};
export default LineCharts;