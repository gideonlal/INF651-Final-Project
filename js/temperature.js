export default class Temperature {
    constructor() {
        this._temp = null;
    }

    getTemperature() {
        return this._temp;
    }

    setTemperature(temp) {
        this._temp = temp;
    }
    convertTemp (){
        return (Math.floor(this._temp * 9/5) + 32);
    }
}