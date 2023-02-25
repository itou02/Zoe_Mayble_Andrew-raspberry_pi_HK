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
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  query,
  limitToLast,
} from "firebase/database";
import { initializeApp, getApp, getApps } from "firebase/app";

/*圖表標籤頁*/
const onTabChange = (key) => {
  console.log(key);
};

/*日期選擇器*/
const onTimeChange = (date, dateString) => {
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

  useEffect(() => {
    onTabChange();
    onTimeChange();
    onChange();
    GetData();
    GetData_avg_5min();
    GetData_avg_1hr();
    GetData_avg_day();
  }, []);

  /*資料*/
  const firebaseConfig = {
    databaseURL: "https://raspberry-pi-data-6403d-default-rtdb.firebaseio.com/",
  };

  let arr_data = [];
  let temp_arr_data = [];

  const [nowTempDatas, setNowTempDatas] = useState([]);
  const [tempDatas, setTempDatas] = useState([]);
  const [humiDatas, setHumiDatas] = useState([]);
  const [datetimeDatas, setDateDatas] = useState([]);

  const [allDatas, setAllDatas] = useState([]);

  const [min_Dates, setMinDates] = useState([]);
  const [min_Temps, setMinTemps] = useState([]);
  const [min_Humis, setMinHumis] = useState([]);

  const [hour_Dates, setHourDates] = useState([]);
  const [hour_Temps, setHourTemps] = useState([]);
  const [hour_Humis, setHourHumis] = useState([]);

  const [day_Dates, setDayDates] = useState([]);
  const [day_Temps, setDayTemps] = useState([]);
  const [day_Humis, setDayHumis] = useState([]);
  const dbref_get = ref(getDatabase());

  function GetData() {
    const firebaseConfig = {
      databaseURL:
        "https://raspberry-pi-data-6403d-default-rtdb.firebaseio.com/",
    };
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const dbRef = query(ref(getDatabase(app), "data"));
    const dbref_get = ref(getDatabase());

    // 上方即時顯示溫度資料 ------------
    get(child(dbref_get, `data`)).then((snapshot) => {
      let data = snapshot.val();
      let dataValue = Object.values(data);
      let dataArr = Array.from(dataValue);
      let res = [];

      for (var key in dataArr) {
        temp_arr_data.push({
          temp: dataArr[key].temp,
        });
      }

      for (var key in temp_arr_data) {
        res.push(temp_arr_data[key]);
      }

      let nowTempData = res[key];
      setNowTempDatas(nowTempData);
    });
    // -----------------------------
  }

  function GetData_avg_5min() {
    let data_res_min = [];

    get(child(dbref_get, `/avg_5min`)).then((snapshot_avg_5min) => {
      let data = snapshot_avg_5min.val();
      let dataValue = Object.values(data);

      for (var j = 0; j < dataValue.length; j++) {
        data_res_min.push(dataValue[j]);
      }

      var now = new Date();

      var minusDate_min = new Date();

      minusDate_min.setMinutes(minusDate_min.getMinutes() - 60);
      var Date_min = `${minusDate_min.getFullYear()}-${
        minusDate_min.getMonth() + 1
      }-${minusDate_min.getDate()} ${minusDate_min.getHours()}:${minusDate_min.getMinutes()}`;

      var min_Date = [];
      var min_Temp = [];
      var min_Humi = [];

      for (var key in data_res_min) {
        if (isDuringDate(`20${data_res_min[key].datetime}`, Date_min)) {
          console.log(
            "data_res_min[key].datetime=",
            data_res_min[key].datetime
          );
          min_Date.push(data_res_min[key].datetime.substring(9, 14)); //.substring(9, 14)
          min_Temp.push(parseInt(data_res_min[key].temp));
          min_Humi.push(parseInt(data_res_min[key].humi));
        }
      }
      setMinDates(min_Date);
      setMinTemps(min_Temp);
      setMinHumis(min_Humi);
    });
  }

  function GetData_avg_1hr() {
    let data_res_hour = [];

    get(child(dbref_get, `avg_1hr`)).then((snapshot_avg_1hr) => {
      let data = snapshot_avg_1hr.val();
      let dataValue = Object.values(data);
      for (var j = 0; j < dataValue.length; j++) {
        data_res_hour.push(dataValue[j]);
      }

      var now = new Date();

      var minusDate_hour = new Date();

      minusDate_hour.setMinutes(minusDate_hour.getMinutes() - 60 * 24);
      var Date_hour = `${minusDate_hour.getFullYear()}-${
        minusDate_hour.getMonth() + 1
      }-${minusDate_hour.getDate()} ${minusDate_hour.getHours()}:${minusDate_hour.getMinutes()}`;

      var hour_Date = [];

      var hour_Temp = [];

      var hour_Humi = [];

      for (var i = 0; i != data_res_hour.length; i++) {
        if (isDuringDate(`20${data_res_hour[i].datetime}`, Date_hour)) {
          hour_Date.push(data_res_hour[i].datetime.substring(9, 14));
          hour_Temp.push(parseInt(data_res_hour[i].temp));
          hour_Humi.push(parseInt(data_res_hour[i].humi));
        }
      }

      setHourDates(hour_Date);
      setHourTemps(hour_Temp);
      setHourHumis(hour_Humi);
    });
  }

  function GetData_avg_day() {
    let data_res_day = [];

    get(child(dbref_get, `/avg_day`)).then((snapshot_avg_day) => {
      let data = snapshot_avg_day.val();
      let dataValue = Object.values(data);

      for (var j = 0; j < dataValue.length; j++) {
        data_res_day.push(dataValue[j]);
      }

      var now = new Date();

      var minusDate_day = new Date();
      minusDate_day.setMinutes(minusDate_day.getMinutes() - 60 * 24 * 7);
      var Date_day = `${minusDate_day.getFullYear()}-${
        minusDate_day.getMonth() + 1
      }-${minusDate_day.getDate()} ${minusDate_day.getHours()}:${minusDate_day.getMinutes()}`;

      var day_Date = [];

      var day_Temp = [];

      var day_Humi = [];

      for (var i = 0; i != data_res_day.length; i++) {
        if (isDuringDate(`20${data_res_day[i].datetime}`, Date_day)) {
          day_Date.push(data_res_day[i].datetime.substring(3, 8));
          day_Temp.push(parseInt(data_res_day[i].temp));
          day_Humi.push(parseInt(data_res_day[i].humi));
        }
      }

      setDayDates(day_Date);
      setDayTemps(day_Temp);
      setDayHumis(day_Humi);
    });
  }

  function isDuringDate(isDate, beginDate) {
    var isDate = new Date(isDate),
      beginDate = new Date(beginDate),
      nowDate = new Date();
    if (isDate >= beginDate && isDate <= nowDate) {
      return true;
    }
    return false;
  }
  /*-----------------------------------------------------------------------*/
  return (
    // 在下方 <Content></Content>裡面加入喜歡的按鈕
    <div className="App" onload="ShowTime()">
      <Row justify="center" align="center" className="time_background">
        <Col justify="centers" align="center" className="time_box">
          {/* 插件時鐘 */}
          <div id="showbox"></div>
        </Col>
      </Row>
      <Row className="record_background">
        <Col span={16} offset={4} justify="centers" align="center">
          <div className="record_box">
            <Row>
              <Col span={12} className="temperature_box">
                <div>
                  <TempChart data_test={nowTempDatas.temp} />
                </div>
              </Col>

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
        <ConfigProvider
          theme={{
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
                <Tabs.TabPane tab="Hour" key="1">
                  <HourChart data_test={[min_Dates, min_Temps, min_Humis]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Day" key="2">
                  <DayChart data_test={[hour_Dates, hour_Temps, hour_Humis]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Week" key="3">
                  <WeekChart data_test={[day_Dates, day_Temps, day_Humis]} />
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
