import { FC, useEffect } from 'react';

import * as echarts from 'echarts';
import 'echarts-liquidfill';

import React from 'react';

const LiquidCharts: FC = () => {

    useEffect(() => {
        initChart();
    });

    const initChart = () => {
        const liquid = document.getElementById('main');
        const map = echarts.init(liquid as HTMLDivElement);
        var humidity = 0.78;
        const option = {
            series: [
                {
                    type: 'liquidFill',
                    data: [
                        // {
                        //     value: humidity + 0.02,
                        //     itemStyle: {
                        //         color: '#254D6C'
                        //     }
                        // },
                        {
                            value: humidity,
                            direction: 'left',
                            itemStyle: {
                                color: '#327085'
                            }
                        },
                        {
                            value: humidity - 0.02,
                            itemStyle: {
                                color: '#4C899A'
                            }
                        }
                    ],
                    outline: {
                        // borderColor: '#336285'
                        show: false
                    },
                    backgroundStyle: {
                        borderWidth: 6,
                        borderColor: '#FFFBEE',
                        color: '#FFFBEE',
                        // color: '#efeadd',
                        // opacity: 0.5
                    },
                    itemStyle: {
                        shadowBlur: 0
                    },

                    amplitude: 5,
                    animationDuration: 0,
                    animationDurationUpdate: 2000,
                    animationEasingUpdate: 'cubicOut',
                    shape: 'roundRect',
                    label: {
                        // position: ['38%', '40%'],
                        // formatter: function() {
                        //     return 'ECharts\nLiquid Fill';
                        // },
                        fontSize: 60,
                        color: '#5188A2',
                        fontfamily: "Century Gothic"
                    }
                },
            ],
        };
        map.clear()
        map.setOption(option);
    };
    return <div id='main' style={{ width: 400, height: 400 }} />;
};
export default LiquidCharts;