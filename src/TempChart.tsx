import { FC, useEffect } from "react";
import * as echarts from "echarts";
import React from "react";
import "./App.css";
import { stringify } from "querystring";



const TempChart: FC = (data_test) => {
    useEffect(() => {
        temp(data_test);
    });
    console.log(data_test);

    const temp = (data_test) => {
        var chartDom: any = document.getElementById("temp");
        var myChart = echarts.init(chartDom);
        var TP_value: number;
        TP_value = Number(Object.values(data_test));
        var kd: any[];
        kd = []
        var Gradient: any[];
        Gradient = []
        var leftColor = "";
        var showValue: any = "";
        var boxPosition = [65, 0];
        var TP_txt = "";
        // 刻度使用柱狀圖模擬，短設置1，長的設置3；構造一個數據
        for (var i = 0, len = 70; i <= len; i += 1) {
            if (i < 10) {
                kd.push("");
            } else if ((i - 10) % 10 === 0) {
                kd.push("-3");
            } else {
                kd.push("-1");
            }
        }

        //中間線的漸變色和文本內容
        if (TP_value > 30) {
            TP_txt = "溫度偏高";
            Gradient.push(
                {
                    offset: 0,
                    color: "#913E31",
                },

                {
                    offset: 1,
                    color: "#913E31",
                }
            );
        } else if (TP_value > -20) {
            TP_txt = "溫度正常";
            Gradient.push(
                {
                    offset: 0,
                    color: "#913E31",
                },
                {
                    offset: 1,
                    color: "#913E31",
                }
            );
        } else {
            TP_txt = "溫度偏低";
            Gradient.push({
                offset: 1,
                color: "#913E31",
            });
        }
        if (TP_value > 62) {
            showValue = 62;
        } else {
            if (TP_value < -60) {
                showValue = -60;
            } else {
                showValue = TP_value;
            }
        }
        if (TP_value < -10) {
            boxPosition = [65, -120];
        }

        leftColor = Gradient[Gradient.length - 1].color;
        // 因為柱狀初始化為0，溫度存在負值，所以加上負值60和空出距離10
        var option = {
            title: {
                xAxisIndex: 0,
                text: TP_value + "°C",
                show: true,
                textStyle: {
                    fontSize: 56
                },
                top: '45%',
                right: '9%',
            },

            yAxis: [
                {
                    show: false,
                    data: [],
                    min: 0,
                    max: 75,
                    axisLine: {
                        show: false,
                    },
                },
                {
                    show: false,
                    min: 0,
                    max: 40,
                },
                {
                    type: "category",
                    //  data: ['', '', '', '', '', '', '', '', '', '', '°C'],
                    position: "left",
                    offset: -80,
                    axisLabel: {
                        fontSize: 10,
                        color: "white",
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            xAxis: [
                {
                    show: false,
                    min: -60,
                    max: 80,
                    data: [],
                },
                {
                    show: false,
                    min: -60,
                    max: 80,
                    data: [],
                },
                {
                    show: false,
                    min: -60,
                    max: 80,
                    data: [],
                },
                {
                    show: false,
                    min: -30,
                    max: 80,
                },
            ],
            series: [
                {
                    name: "條",
                    type: "bar",
                    // 對應上面XAxis的第一個對象配置
                    xAxisIndex: 0,
                    data: [
                        {
                            value: showValue + 30, // 條狀高度和刻度值一樣
                        },
                    ],

                    barWidth: 18,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient),
                        },
                    },
                    z: 2,
                },
                {
                    name: "白框",
                    type: "bar",
                    xAxisIndex: 1,

                    barGap: "-100%",
                    data: [74], //裡面長條的長度
                    barWidth: 28,
                    itemStyle: {
                        normal: {
                            color: "#FFFBEE", //整個上部的裡面
                            opacity: 1,
                            barBorderRadius: 50,
                        },
                    },
                    z: 1,
                },
                // {
                //   name: "外框",
                //   type: "bar",
                //   xAxisIndex: 2,
                //   barGap: "-100%",
                //   data: [135],
                //   barWidth: 38,
                //   itemStyle: {
                //     normal: {
                //       color: "#a0a0a0", //上面那條外框
                //       barBorderRadius: 50,
                //     },
                //   },
                //   z: 0,
                // },
                {
                    name: "圓",
                    type: "scatter",
                    hoverAnimation: false,
                    data: [0],
                    xAxisIndex: 0,
                    symbolSize: 48,
                    itemStyle: {
                        normal: {
                            color: "#913E31", //下面圓圓的~i
                            opacity: 1,
                        },
                    },
                    z: 2,
                },
                {
                    name: "白圓",
                    type: "scatter",
                    hoverAnimation: false,
                    data: [0],
                    xAxisIndex: 1,
                    symbolSize: 60,
                    itemStyle: {
                        normal: {
                            color: "#FFFBEE", //下面的中間那層圓框
                            opacity: 1,
                        },
                    },
                    z: 1,
                },
                // {
                //   name: "外圓",
                //   type: "scatter",
                //   hoverAnimation: false,
                //   data: [0],
                //   xAxisIndex: 2,
                //   symbolSize: 70,
                //   itemStyle: {
                //     normal: {
                //       color: "#a0a0a0", //下面圓圓的外框
                //       opacity: 1,
                //     },
                //   },
                //   z: 0,
                // },
                {
                    name: "刻度",
                    type: "bar",
                    yAxisIndex: 0,
                    xAxisIndex: 3,
                    label: {
                        normal: {
                            show: true,
                            position: "left",
                            distance: 10,
                            color: "#505050", //刻度數字
                            fontSize: 14,
                            formatter: function (params) {
                                if (params.dataIndex > 80 || params.dataIndex < 10) {
                                    return "";
                                } else {
                                    if ((params.dataIndex - 10) % 10 === 0) {
                                        return params.dataIndex - 30;
                                    } else {
                                        return "";
                                    }
                                }
                            },
                        },
                    },
                    // 小刻度
                    barGap: "-100%",
                    data: kd,
                    barWidth: 1,
                    itemStyle: {
                        normal: {
                            distance: 10,
                            color: "#505050",
                            barBorderRadius: 120,
                        },
                    },
                    z: 0,
                },
            ],
        };
        option && myChart.setOption(option);
    };
    return <div id="temp" style={{ height: "350px", margin: "10% 0% 0% 0%" }}></div>
};

export default TempChart;