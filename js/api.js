import {WEATHER_API_KEY} from "./apiKey.js";
const api = {
    key : WEATHER_API_KEY,
    currentWeather : `http://api.openweathermap.org/data/2.5/weather?`,
    oneCall : `http://api.openweathermap.org/data/2.5/onecall?`,
    exclude : "&exclude=current,minutely,hourly,alert",
  }

  export default api;