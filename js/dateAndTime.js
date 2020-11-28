export default class DateAndTime {
    
    constructor(){
        this._dt = null;
        this._tz = null;
    }
    setDt(dt){
        this._dt = dt;
    }
    setTimeZone (tz){
        this._tz = tz;
    }
    getDate(){
        let months = ["January", "February","March", "April","May", "June","July", "August",
        "September", "October","November", "December"];
        let days = ["Sunday", "Monday","Tuesday", "Wednesday","Thursday", "Friday","Saturday"];
        
        //const today = new Date(this._dt * 1000);
        const today = new Date(new Date().getTime() + (this._tz * 1000));
        let day = days[today.getDay()];
        let date = today.getDate();
        let month = months[today.getMonth()];
        let year = today.getFullYear();
        return `${day}, ${month} ${date}, ${year}`;
        //return today.toLocaleDateString();
    }
    getDayMonth(){
        const today = new Date(this._dt * 1000);
        return `${today.getDate()}/${today.getMonth()+1}`;
    }
    getTime(){
        const time = new Date(new Date().getTime() + (this._tz * 1000));

        let hour = ("0" + time.getUTCHours()).slice(-2);
        let minutes = ("0" + time.getUTCMinutes()).slice(-2);
        let seconds = ("0" + time.getUTCSeconds()).slice(-2);
        let light = "AM";
        if(hour >= 12){
            hour -=12;
            hour = ("0" + hour).slice(-2);
            light = "PM";
        }
        
        return `${hour}:${minutes}:${seconds} ${light}`;
    }
    reset(){
        this._dt = null;
        this._tz = null;
    }
}