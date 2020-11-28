import Temp from "./temperature.js";
import DateAndTime from "./dateAndTime.js";
import Api from "./api.js";
import {showError} from "./geoLocation.js";
import {displayForecast,degreeChange} from "./displayForecast.js";

//predefined variables

const location = document.querySelector(".location p");
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp-value p");
const description = document.querySelector(".temp-description p");
const parentDiv = document.querySelector(".fiveDaysForecast");
const currentTemp = new Temp();
const currentDate = new DateAndTime();
const KELVIN = 273;
let api="";

//let currentLocation = localStorage.getItem("currentLocation");
const getApi = (name,lat,lon) => {
    if(sessionStorage.getItem("currentLocation")=="true"){
        api=`${Api.currentWeather}lat=${lat}&lon=${lon}&appid=${Api.key}`;
        sessionStorage.setItem("currentLocation",false);
        showWeather(api);
    }
    else{
        api = `${Api.currentWeather}q=${name}&appid=${Api.key}`;
        showWeather(api);
    }
    return api; 
}

const showWeather = (api) => {
    let currentarr = [];
    const arr = [];
    try{
        fetch(api)
        .then(response => {return response.json();})
        .then( data => {
            try{
                displayCurrentWeather(data);
                if(data.cod == 404){
                    throw err;
                } 
                else{
                    currentarr.push(data.name,data.coord.lat,data.coord.lon);
                    localStorage.setItem("defaultLocation",JSON.stringify(currentarr));
                }
            }
            catch(err){showError("No such City Exist!");}
        })
        //start api calling for 5 day forecast
        .then( () => {
            try{
                api = `${Api.oneCall}lat=${currentarr[1]}&lon=${currentarr[2]}${Api.exclude}&appid=${Api.key}`;
                fetch(api)
                .then (response => {
                    return response.json();
                })
                .then(data => {
                    for(let i=1 ; i<=5; i++){
                        arr.push([data.daily[i].dt,Math.floor(data.daily[i].temp.day - KELVIN),data.daily[i].weather[0].icon,data.daily[i].weather[0].main]);
                        sessionStorage.setItem("forecast",JSON.stringify(arr));
                    }
                    parentDiv.innerHTML="";
                    displayForecast();
                });
            }catch(err){
                alert("Error Loading API");
            }//end of try/catch
        });
    }
    catch(err){
        alert("Error Loading API");
    }
}

//display Weather results
const displayCurrentWeather = (weather) => {
    //display location name (city,country)
    location.innerHTML= `${weather.name}, ${weather.sys.country}`;

    //get Date and Time from API and display
    currentDate.setDt(weather.dt);
    currentDate.setTimeZone(weather.timezone);
    let date = document.querySelector('.dateAndTime #date');
    let time = document.querySelector('.dateAndTime #time');
    date.innerHTML = currentDate.getDate();
    time.innerHTML = currentDate.getTime();
    currentDate.reset();//reset values to ""
    //set icons
    icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;
    
    //set current temperature
    currentTemp.setTemperature(Math.floor(weather.main.temp - KELVIN));
    temp.innerHTML = `${currentTemp.getTemperature()}°<span id="degree">C</span>`;
    description.innerHTML = weather.weather[0].description;

}

//swith temperature elements
temp.addEventListener("click", () => {
    //<p id="5temp">${Math.floor(data[i][1])}°<span id="degree">C</span></p>
    let degree = document.querySelector("#degree").innerHTML;

    if(degree === 'C'){
        degree = 'F';
        temp.innerHTML = `${currentTemp.convertTemp()}°<span id="degree">${degree}</span>`;
        degreeChange(degree);
    }
    else {
        degree = 'C';
        temp.innerHTML = `${currentTemp.getTemperature()}°<span id="degree">${degree}</span>`;
        degreeChange(degree);
    }
});

export {getApi,showWeather,displayCurrentWeather}