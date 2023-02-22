import * as echarts from "echarts";
import "./App.css";
import {
  Row,
  Col,
  Anchor,
  Tabs,
  DatePicker,
  TimePicker,
  Space,
  ConfigProvider,
  theme,
} from "antd";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import WaterChart from "./WaterChart.tsx";
import HourChart from "./HourChart_whitefont.tsx";
import DayChart from "./DayChart_whitefont.tsx";
import WeekChart from "./WeekChart_whitefont.tsx";
import "./App.css";
import TempChart from "./TempChart.tsx";
import { getDatabase, ref, child, get, onValue, query, limitToLast } from "firebase/database";
import { initializeApp } from "firebase/app";


/*圖表標籤頁*/
const onTabChange = (key) => {
  console.log(key);
};

/*日期選擇器*/
const onTimeChange = (date, dateString) => {
  // console.log(date, dateString);
  console.log("Selected Time: ", date);
  console.log("Formatted Selected Time: ", dateString);
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
  for (let i = 0; i < 1; i++) {
    let date = new Date((dottedBase += 3600 * 24 * 1000));
    category.push(
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
    );
  }

  useEffect(() => {
    onTabChange();
    onTimeChange();
    onChange();
    nowTemp();
  }, []);

  /*資料*/

  const firebaseConfig = {
    databaseURL:
      "https://data-30090-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
  const app = initializeApp(firebaseConfig);
  const dbRef = query(ref(getDatabase(app), "data"), limitToLast(1));
  const dbref_get = ref(getDatabase());

  let arr_data = [];

  const [datas, setDatas] = useState([]);

  function nowTemp(temp) {
    let res = [];
    onValue(
      dbRef,
      (snapshot) => {
        let data = snapshot.val();
        let dataValue = Object.values(data);
        let dataArr = Array.from(dataValue);
        for (var key in dataArr) {
          arr_data.push({
            temp: dataArr[key].temp,
            humi: dataArr[key].humi,
            datetime: dataArr[key].datetime,
          });
        }
  
        for (var key in arr_data) {
          res.push(arr_data[key]);
        }
        let allData = (res[key]);
        // let test2 = new RegExp("ab+c");
        // let test2 = (test.split("{/,"))
        
        // console.log(allData);
        // setTemps(test);
        // setHumis(test);
        setDatas(allData);
      }
  );
  }
  
  /*-----------------------------------------------------------------------*/
  return (
    // 在下方 <Content></Content>裡面加入喜歡的按鈕
    <div className="App" onload="ShowTime()">
      {/* <div class="mapContainer" ref="mapContainer">
        <svg viewBox="0 0 200 200" ref="svg">
          <rect width="200" height="200"></rect>
          <rect x="75" y="23" width="50" height="50" fill="red"></rect>
          <rect x="75" y="123" width="50" height="50" fill="#0013ff"></rect>
        </svg>
      </div> */}
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
              <Col span={12} className="temperature_box">
                <div>
                  <TempChart data_test={datas.temp}/>
                  
                </div>
              </Col>
              {/* <Col span={8} pull={1} className="temperature_degree">
                  <div >{temps.temp}</div>
                  <div >{humis.humi}</div>
                  <div>26°C</div>
              </Col> */}

              <Col span={12} className="humidity_box">
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
        <ConfigProvider
          theme={{
            // algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#D6B24E",
            },
          }}
        >
          <Col span={24} justify="centers" align="center">
            <div className="chart_box">
              <Tabs
                centered
                defaultActiveKey={1}
                className="tabs font-color2"
                onChange={onTabChange}
                size="large"
              >
                <Tabs.TabPane tab="Minute" key="1">
                  <TimePicker
                    value={value}
                    onChange={onTimeChange}
                    format="HH"
                    showNow={false}
                    popupStyle={{ color: "" }}
                  />
                  <HourChart />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Hour" key="2">
                  <DatePicker
                    onChange={onTimeChange}
                    value={value}
                    showNow={false}
                  />
                  <DayChart />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Day" key="3">
                  <DatePicker onChange={onTimeChange} picker="week" />
                  <WeekChart />
                </Tabs.TabPane>
              </Tabs>
              <Space direction="vertical"></Space>
            </div>
          </Col>
        </ConfigProvider>
      </Row>
    </div>
  );
}

export default App;
