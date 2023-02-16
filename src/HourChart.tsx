import { FC, useEffect } from "react";
import * as echarts from 'echarts';
import React from "react";


const LineCharts: FC = () => {

    useEffect(() => {
        HourChart();
    });
    const HourChart = () => {
        var chartDom = document.getElementById("hourLineChart");
        var myChart = echarts.init(chartDom as HTMLDivElement);
        var option;

        let base = +new Date(2016, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let valueBase = Math.random() * 300;
        let valueBase2 = Math.random() * 50;
        let time = [1, 2, 3, 4]; //[時間]
        let line1 = [
            [time[0], 10],
            [time[1], 21],
            [time[2], 20],
            [time[3], 19]
        ]; //[時間,值] 溫度數據
        let line2 = [
            [time[0], 14],
            [time[1], 10],
            [time[2], 31],
            [time[3], 11]
        ]; //[時間,值] 濕度數據
        option = {
            title: {
                text: "溫溼度統計變化",
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
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