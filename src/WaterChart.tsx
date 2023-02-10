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
        const option = {
            series: [
                {
                    type: 'liquidFill',
                    data: [0.52,
                        {
                            value: 0.5,
                            direction: 'left',
                            itemStyle: {
                                // color: '#fff'
                            }
                        }],
                    itemStyle: {
                        shadowBlur: 0
                    },

                    amplitude: 5,
                    animationDuration: 0,
                    animationDurationUpdate: 2000,
                    animationEasingUpdate: 'cubicOut',
                    shape: 'roundRect'
                },
            ],
        };
        map.clear()
        map.setOption(option);
    };
    return <div id='main' style={{ width: 400, height: 400 }} />;
};
export default LiquidCharts;