import { FC, useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import React from 'react';
import { getDatabase, ref, child, get, onValue, query, limitToLast } from "firebase/database";
import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
    databaseURL:
        "https://raspberry-pi-data-6403d-default-rtdb.firebaseio.com/",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const dbRef = query(ref(getDatabase(app), "data"), limitToLast(1));
const dbref_get = ref(getDatabase())

var humidity: number
onValue(
    dbRef,
    (snapshot) => {
        let data = snapshot.val();
        let dataValue = Object.values(data);
        let dataArr: object = Array.from(dataValue);
        let humi: number = dataArr[0].humi
        console.log(humi);
        humidity = humi * 0.01
    }
);

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
                        show: false
                    },
                    backgroundStyle: {
                        borderWidth: 6,
                        borderColor: '#FFFBEE',
                        color: '#FFFBEE',
                    },
                    itemStyle: {
                        shadowBlur: 0,
                    },

                    amplitude: 5,
                    animationDuration: 0,
                    animationDurationUpdate: 2000,
                    animationEasingUpdate: 'cubicOut',
                    shape: 'roundRect',
                    label: {
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
    return <div id='main' style={{ width: 450, height: 450, objectFit: 'none' }} />;
};
export default LiquidCharts;