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
  // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // const dbRef = query(ref(getDatabase(app), "data"), limitToLast(1));
  // const dbref_get = ref(getDatabase());

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
  // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // const dbRef = query(ref(getDatabase(app), "avg_5min"));
  const dbref_get = ref(getDatabase());
  // console.log("dbref_get=", dbref_get);

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
      console.log("data_avg_5min=", data);
      let dataValue = Object.values(data);
      console.log("dataValue=", dataValue);
      
      for (var j = 0; j < dataValue.length; j++) {
        data_res_min.push(dataValue[j]);
      }
      console.log(data_res_min);
      // setAllDatas(data_res_min);

      var now = new Date();

      console.log("new:", data_res_min[0].datetime);
      console.log("data0:", data_res_min[0].datetime);
      console.log("dataL:", data_res_min.length);

      var minusDate_min = new Date();

      minusDate_min.setMinutes(minusDate_min.getMinutes() - 60);
      var Date_min = `${minusDate_min.getFullYear()}-${
        minusDate_min.getMonth() + 1
      }-${minusDate_min.getDate()} ${minusDate_min.getHours()}:${minusDate_min.getMinutes()}`;
      console.log("Date_min=", Date_min);

      var min_Date = [];

      var min_Temp = [];

      var min_Humi = [];

      for (var key in data_res_min) {
        console.log("data_res_min[i].datetime=", typeof data_res_min);
        console.log("`20${data_res_min[key].datetime}`=", `20${data_res_min[key].datetime}`);
        console.log("isDuringDate(`20${data_res_min[key].datetime}`, Date_min)=", isDuringDate(`20${data_res_min[key].datetime}`, Date_min));

        if (isDuringDate(`20${data_res_min[key].datetime}`, Date_min)) {
          console.log("data_res_min[key].datetime=", data_res_min[key].datetime);
          min_Date.push(data_res_min[key].datetime.substring(9, 14)); //.substring(9, 14)
          min_Temp.push(parseInt(data_res_min[key].temp));
          min_Humi.push(parseInt(data_res_min[key].humi));
        }
      }
      setMinDates(min_Date);
      setMinTemps(min_Temp);
      setMinHumis(min_Humi);

      console.log("min_Date:", min_Date);
      console.log("min_Temp:", min_Temp);
      console.log("min_Humi:", min_Humi);
    });
  }

  function GetData_avg_1hr() {
    // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    // const dbRef = query(ref(getDatabase(app), "avg_1hr"), limitToLast(1));
    // const dbref_get = ref(getDatabase());
    let data_res_hour = [];

    get(child(dbref_get, `avg_1hr`)).then((snapshot_avg_1hr) => {
      let data = snapshot_avg_1hr.val();
      console.log("data=", data);
      let dataValue = Object.values(data);
      console.log("dataValue=", dataValue);
      // let dataArr = Array.from(dataValue);
      // console.log("dataArr=",dataArr);
      // for (var key in dataArr) {
      //   arr_data.push({
      //     temp: dataArr[key].temp,
      //     humi: dataArr[key].humi,
      //     datetime: dataArr[key].datetime,
      //   });
      // }
      for (var j = 0; j < dataValue.length; j++) {
        data_res_hour.push(dataValue[j]);
      }
      console.log(data_res_hour);
      // setAllDatas(data_res_hour);

      var now = new Date();

      console.log("new:", data_res_hour[0].datetime);
      console.log("data0:", data_res_hour[0].datetime);
      console.log("dataL:", data_res_hour.length);

      var minusDate_hour = new Date();

      minusDate_hour.setMinutes(minusDate_hour.getMinutes() - 60 * 24);
      var Date_hour = `${minusDate_hour.getFullYear()}-${
        minusDate_hour.getMonth() + 1
      }-${minusDate_hour.getDate()} ${minusDate_hour.getHours()}:${minusDate_hour.getMinutes()}`;
      console.log("Date_hour=", Date_hour);

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

      console.log("hour_Date=", hour_Date);
      console.log("hour_Temp=", hour_Temp);
      console.log("hour_Humi=", hour_Humi);
    });
  }

  function GetData_avg_day() {
    // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    // const dbRef = query(ref(getDatabase(app), "avg_day"), limitToLast(1));
    // const dbref_get = ref(getDatabase());
    let data_res_day = [];

    get(child(dbref_get, `/avg_day`)).then((snapshot_avg_day) => {
      let data = snapshot_avg_day.val();
      console.log("data=", data);
      let dataValue = Object.values(data);
      // let dataArr = Array.from(dataValue);
      // for (var key in dataArr) {
      //   arr_data.push({
      //     temp: dataArr[key].temp,
      //     humi: dataArr[key].humi,
      //     datetime: dataArr[key].datetime,
      //   });
      // }
      for (var j = 0; j < dataValue.length; j++) {
        data_res_day.push(dataValue[j]);
      }
      console.log(data_res_day);
      // setAllDatas(data_res_day);

      var now = new Date();

      console.log("new=", data_res_day[0].datetime);
      console.log("data0=", data_res_day[0].datetime);
      console.log("dataL=", data_res_day.length);

      var minusDate_day = new Date();
      // console.log("minusDate_min",`${minusDate_min.getFullYear()}-${minusDate_min.getMonth()}-${minusDate_min.getDate()} ${minusDate_min.getHours()}:${minusDate_min.getMinutes()}`)
      minusDate_day.setMinutes(minusDate_day.getMinutes() - 60 * 24 * 7);
      var Date_day = `${minusDate_day.getFullYear()}-${
        minusDate_day.getMonth() + 1
      }-${minusDate_day.getDate()} ${minusDate_day.getHours()}:${minusDate_day.getMinutes()}`;
      console.log("Date_day=", Date_day);

      var day_Date = [];

      var day_Temp = [];

      var day_Humi = [];

      for (var i = 0; i != data_res_day.length; i++) {
        // console.log(isDuringDate(`20${data_res[i].datetime}`, Date_day))
        // console.log("isDuringDate(`20${data_res[i-1].datetime}`)", isDuringDate(`20${data_res[i].datetime}`))
        if (isDuringDate(`20${data_res_day[i].datetime}`, Date_day)) {
          day_Date.push(data_res_day[i].datetime.substring(3, 8));
          day_Temp.push(parseInt(data_res_day[i].temp));
          day_Humi.push(parseInt(data_res_day[i].humi));
        }
      }

      setDayDates(day_Date);
      setDayTemps(day_Temp);
      setDayHumis(day_Humi);

      console.log("day_Date=", day_Date); //日圖表之日期
      console.log("day_Temp=", day_Temp);
      console.log("day_Humi=", day_Humi);
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
                  <TempChart data_test={nowTempDatas.temp} />
                  {/* data_test={datas.temp} */}
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
                  {/* <TimePicker
                    value={value}
                    onChange={onTimeChange}
                    format="HH"
                    showNow={false}
                    popupStyle={{ color: "" }}
                  /> */}
                  <HourChart data_test={[min_Dates, min_Temps, min_Humis]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Hour" key="2">
                  {/* <DatePicker
                    onChange={onTimeChange}
                    value={value}
                    showNow={false}
                  /> */}
                  <DayChart data_test={[hour_Dates, hour_Temps, hour_Humis]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Day" key="3">
                  {/* <DatePicker onChange={onTimeChange} picker="week" /> */}
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
