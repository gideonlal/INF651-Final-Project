import * as fetch from "./fetchData.js";

//variable 
const notification = document.querySelector(".notification");

///////Geo Location section//////////
const getGeoLocation = () => {
    //Check if Geolocation is support
    notification.style.display="none";
    sessionStorage.setItem("currentLocation",true);
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition,showError);
    }
    else{
        notification.style.display = "block";
        notification.innerHTML = "<p>Geolocation not supported by Browser</p>";
    }
}

//set user's position
const setPosition = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    fetch.getApi("",lat,lon);
}

//error message 
const showError = (error) => {
    notification.style.display = "block";
    notification.innerHTML= `<p> ${error}</p>`;
}

export {getGeoLocation,showError}