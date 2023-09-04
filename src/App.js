import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainComponent from "./MainComponent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment/moment";

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik"],
  },
});

let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("en");

  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  const [dateAndTime, setDateAndTime] = useState("");

  useEffect(() => {
    i18n.changeLanguage(locale);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=a0e9005aa711f56f8c9f774c5ba0ceb6",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        console.log(response);
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const desc = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setTemp({
          ...temp,
          number: responseTemp,
          min: min,
          max: max,
          description: desc,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainComponent
          temp={temp}
          dateAndTime={{ dateAndTime, setDateAndTime }}
          lang={{ t, i18n }}
          locale={{ locale, setLocale }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
