import * as echarts from "echarts";
import "./App.css";
import { Row, Col, Anchor, Tabs, DatePicker, TimePicker, Space } from "antd";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import WaterChart from "./WaterChart.tsx";
import HourChart from "./HourChart.tsx";
import DayChart from "./DayChart.tsx";
import WeekChart from "./WeekChart.tsx";
import Chart from "./components/chart/Chart";
import TabPane from "antd/es/tabs/TabPane";
import PropTypes from "prop-types";

/*圖表標籤頁*/
const onTabChange = (key) => {
  console.log(key);
};

/*日期選擇器*/
const onTimeChange = (date, dateString) => {
  console.log(date, dateString);
};

function App() {
  // 時間選擇器
  const [value, setValue] = useState(null);
  const onChange = (time) => {
    setValue(time);
  };

  function ticking() {
    const element = (
      <div>
        <p className="date">
          {new Date().getFullYear() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getDate()}
        </p>
        <p className="time">{new Date().toLocaleTimeString()}</p>
      </div>
    );
    ReactDOM.render(element, document.getElementById("showbox"));
  }
  setInterval(ticking, 1000);
  let category = [];
  let dottedBase = +new Date();
  let lineData = [];
  let barData = [];
  for (let i = 0; i < 1; i++) {
    let date = new Date((dottedBase += 3600 * 24 * 1000));
    category.push(
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
    );
    let b = 27;
    let d = 50;
    barData.push(b);
    lineData.push(d);
  }

  // 溫度計
  const temp = () => {
    var chartDom = document.getElementById("temp");
    var myChart = echarts.init(chartDom);
    // var option;
    var TP_value = 9;
    var kd = [];
    var Gradient = [];
    var leftColor = "";
    var showValue = "";
    var boxPosition = [65, 0];
    var TP_txt = "";
    // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
    for (var i = 0, len = 70; i <= len; i += 1) {
      if (i < 10) {
        kd.push("");
      } else if ((i - 10) % 10 === 0) {
        kd.push("-3");
      } else {
        kd.push("-1");
      }
    }

    //中间线的渐变色和文本内容
    if (TP_value > 25) {
      TP_txt = "温度偏高";
      Gradient.push(
        {
          offset: 0,
          color: "#93FE94",
        },
        {
          offset: 0.5,
          color: "#E4D225",
        },
        {
          offset: 1,
          color: "#E01F28",
        }
      );
    } else if (TP_value > -20) {
      TP_txt = "温度正常";
      Gradient.push(
        {
          offset: 0,
          color: "#93FE94",
        },
        {
          offset: 1,
          color: "#E4D225",
        }
      );
    } else {
      TP_txt = "温度偏低";
      Gradient.push({
        offset: 1,
        color: "#93FE94",
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
    // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
    var option = {
      // backgroundColor: "#0C2F6F", //背景色
      title: {
        text: "温度计",
        show: false,
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
          min: -15,
          max: 80,
          data: [],
        },
        {
          show: false,
          min: -15,
          max: 80,
          data: [],
        },
        {
          show: false,
          min: -15,
          max: 80,
          data: [],
        },
        {
          show: false,
          min: -5,
          max: 80,
        },
      ],
      series: [
        {
          name: "條",
          type: "bar",
          // 对应上面XAxis的第一个对)象配置
          xAxisIndex: 0,
          data: [
            {
              value: showValue + 30, // 条状高度和刻度值一样
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
              color: "#0C2E6D", //整個上部的裡面
              barBorderRadius: 50,
            },
          },
          z: 1,
        },
        {
          name: "外框",
          type: "bar",
          xAxisIndex: 2,
          barGap: "-100%",
          data: [135],
          barWidth: 38,
          itemStyle: {
            normal: {
              color: "#4577BA", //上面那條外框
              barBorderRadius: 50,
            },
          },
          z: 0,
        },
        {
          name: "圓",
          type: "scatter",
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 0,
          symbolSize: 48,
          itemStyle: {
            normal: {
              color: "#93FE94", //下面圓圓的
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
              color: "#0C2E6D", //下面的中間那層圓框
              opacity: 1,
            },
          },
          z: 1,
        },
        {
          name: "外圓",
          type: "scatter",
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 2,
          symbolSize: 70,
          itemStyle: {
            normal: {
              color: "#4577BA", //下面圓圓的外框
              opacity: 1,
            },
          },
          z: 0,
        },
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
              color: "rgb(97, 97, 97)", //刻度數字
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
              color: "rgb(97, 97, 97)",
              barBorderRadius: 120,
            },
          },
          z: 0,
        },
      ],
    };
    option && myChart.setOption(option);
  };

  useEffect(() => {
    onTabChange();
    onChange();
    temp();
  }, []);

  return (
    // 在下方 <Content></Content>裡面加入喜歡的按鈕
    <div className="App" onload="ShowTime()">
      <Row justify="center" align="center" className="time_background">
        <Col justify="centers" align="center" className="time_box">
          {/* 插件時鐘 */}
          {/* <iframe className="time" id="c1 showbox" src="https://free.timeanddate.com/clock/i8pls9p1/n1068/tlhk8/fn6/fs48/tt0/tw0/tm3/td2/th2/tb4" frameborder="0" width="279" height="120"></iframe> */}
          <div id="showbox"></div>
        </Col>
      </Row>
      <Row className="record_background">
        <Col span={16} offset={4} justify="centers" align="center">
          <div className="record_box">
            <Row>
              <Col span={6} push={3} className="temperature_box">
                <div id="temp" style={{ height: "350px" }}></div>
              </Col>
              <Col span={8} pull={2} className="temperature_degree">
                <div>17°C</div>
              </Col>
              <Col span={8} className="humidity_box">
                <div>
                  <WaterChart />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="chart_background">
        {/* 統計圖表標籤頁 */}
        <Col span={24} justify="centers" align="center">
          <div className="chart_box">
            <Tabs defaultActiveKey={1} className="tabs" onChange={onTabChange}>
              <Tabs.TabPane tab="Hour" key="1">
                <HourChart />
                <TimePicker value={value} onChange={onChange} format="HH" showNow={false} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Day" key="2">
                <DayChart />
                <DatePicker onChange={onTimeChange} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Week" key="3">
                <WeekChart />
                <DatePicker onChange={onTimeChange} picker="week" />
              </Tabs.TabPane>
            </Tabs>
            <Space direction="vertical"></Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
