import { FC, useEffect } from "react";
import * as echarts from 'echarts';
import React from "react";


const LineCharts: FC = (data_test) => {

    useEffect(() => {
        WeekChart(data_test);
    });
    const WeekChart = (data_test) => {
        var chartDom = document.getElementById("weekLineChart");
        var myChart = echarts.init(chartDom as HTMLDivElement);
        var option;
        var temp = data_test.data_test[1];
        var humi = data_test.data_test[2];
        var time = data_test.data_test[0];
        time.length == 0 ? time = ["目前無近一週資料 و(  °▽° )٩"] : time = data_test.data_test[0];
        console.log("time", time);
        const colors = ['#EE6666', '#79A6AF'];
        option = {
            title: {
                text: "〈週〉溫濕度統計變化",
                textStyle: {
                    color: "#fff",
                    fontSize: 25,
                }
            },
            tooltip: {
                trigger: 'axis',
                width: 30,
                axisPointer: {
                    label: {
                        formatter: '{value}',
                        fontSize: 20
                    }
                },
            },
            grid: {
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
                    saveAsImage: { backgroundColor: '#404040', }
                }
            },
            xAxis: {
                type: 'category',
                show: true,
                boundaryGap: true,
                data: time,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 16
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
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
                },
            ],
            series: [
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
                },
            ]
        };

        myChart.clear()
        option && myChart.setOption(option);


    };

    return (
        <div id="weekLineChart" style={{ width: "80%", margin: "50px auto", height: "600px" }} />
    );
};
export default LineCharts;