import DateAndTime from "./dateAndTime.js";
import Temp from "./temperature.js";

//const KELVIN = 273;
const displayForecast = (weather) => {
    const data = JSON.parse(sessionStorage.getItem("forecast"));
    const parentDiv = document.querySelector(".fiveDaysForecast");
    const currentDate = new DateAndTime();
    
    //const currentTemp = new Temp();<p id="icon"><img src="icons/${data[i][2]}.png"></p>
    for (let i = 0; i<5 ; i++){
        parentDiv.innerHTML += `<div class="smallHolder${i+1}">
        <p id="date">${currentDate.getDayMonth(currentDate.setDt(data[i][0]))}</p>
        <p id="fivetemp">${data[i][1]}°<span id="degree">C</span></p>
        <p id="icon"><img src ="http://openweathermap.org/img/wn/${data[i][2]}@2x.png"></p>
        <p id="description">${data[i][3]}</p>
    </div>`;
    }
}

const degreeChange = (degree) => {
    const data = JSON.parse(sessionStorage.getItem("forecast"));
    const parentDiv = document.querySelector(".fiveDaysForecast");
    const currentDate = new DateAndTime();
    const temp = new Temp();

    parentDiv.innerHTML="";
    if(degree=="F"){
        for (let i = 0; i<5 ; i++){
            parentDiv.innerHTML += `<div class="smallHolder${i+1}">
            <p id="date">${currentDate.getDayMonth(currentDate.setDt(data[i][0]))}</p>
            <p id="fivetemp">${temp.convertTemp(temp.setTemperature(data[i][1]))}°<span id="degree">${degree}</span></p>
            <p id="icon"><img src ="http://openweathermap.org/img/wn/${data[i][2]}@2x.png"></p>
            <p id="description">${data[i][3]}</p>
            </div>`;
        }
    }
    else{
        for (let i = 0; i<5 ; i++){
            parentDiv.innerHTML += `<div class="smallHolder${i+1}">
            <p id="date">${currentDate.getDayMonth(currentDate.setDt(data[i][0]))}</p>
            <p id="fivetemp">${data[i][1]}°<span id="degree">${degree}</span></p>
            <p id="icon"><img src ="http://openweathermap.org/img/wn/${data[i][2]}@2x.png"></p>
            <p id="description">${data[i][3]}</p>
            </div>`;
        }
    }

}

export {displayForecast,degreeChange};