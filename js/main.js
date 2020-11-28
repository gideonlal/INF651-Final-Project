//import Data from "./data.js";
import * as fetch from "./fetchData.js";
import {getGeoLocation} from "./geoLocation.js";

//predefined variables
const button = document.getElementById("localWeather");
const notification = document.querySelector(".notification");
const defaultCity= "london";
sessionStorage.setItem("currentLocation",false);

window.onload=  () => {
    let cityName= JSON.parse(localStorage.getItem("defaultLocation"));
    if(localStorage.getItem("defaultLocation")===null){
        fetch.getApi(defaultCity,0,0);
    }
    else{
        fetch.getApi(cityName[0],0,0);
    }

    button.addEventListener("click",(event) => {
        event.preventDefault();
        getGeoLocation();
    });  

    //autoRefresh(5000);//page reload (currently 5sec)
}

const autoRefresh = (t) => {
    setTimeout("location.reload(true);",t);
}


//get city from search result
const search = document.querySelector(".search-box");
search.addEventListener("keypress",setQuery);
function setQuery (evt){
    if(evt.keyCode == 13){
        if(search.value == ""){
            notification.style.display = "block";
            notification.innerHTML= `<p>Please Enter city name</p>`;
        }
        else{
            notification.style.display = "none";
            fetch.getApi(search.value,0,0);
            search.value="";//erase location input
        }
        
    }
}
