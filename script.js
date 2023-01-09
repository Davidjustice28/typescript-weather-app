"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Images;
(function (Images) {
    Images["fogImg"] = "https://images.unsplash.com/photo-1581608198007-4801faa3859a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80";
    Images["lightningImg"] = "https://images.unsplash.com/photo-1548996206-122c521b2d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
    Images["rainImg"] = "https://images.unsplash.com/photo-1501691223387-dd0500403074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60";
    Images["sunnyImg"] = "https://images.unsplash.com/photo-1610289303105-286fc12c6183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Vubnl8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    Images["cloudyImg"] = "https://images.unsplash.com/photo-1530245272310-a4c18d9e60e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNsb3VkeXxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60";
    Images["snowImg"] = "https://images.unsplash.com/photo-1612770132420-297b1e77f2b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25vd2luZ3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60";
})(Images || (Images = {}));
let weatherData;
function getWeatherData(position) {
    return __awaiter(this, void 0, void 0, function* () {
        let { latitude, longitude } = position.coords;
        let weather = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=f5b2fcba915a037ebff7f36dc5806378`);
        weatherData = yield weather.json();
        console.log('line 12 - ', weatherData);
    });
}
function loadData(cb) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
}
function displayWeather(cb) {
    return __awaiter(this, void 0, void 0, function* () {
        loadData(cb);
        setTimeout(() => {
            //destructure data for easier usage
            const { main, wind, weather, name } = weatherData;
            const { temp, temp_max, temp_min, humidity, feels_like } = main;
            const windSpeed = wind.speed;
            const forecast = weather[0].description;
            const location = name;
            let appInfo = {
                temp, temp_max, temp_min, humidity, feels_like, windSpeed, forecast, location
            };
            console.log(appInfo);
            //get image
            let weatherImage;
            switch (weather[0].main) {
                case 'Clouds':
                    weatherImage = Images.cloudyImg;
                    break;
                default:
                    weatherImage = Images.sunnyImg;
                    break;
            }
            //dom manipulation
            let temperatureNode = document.getElementById('temperature');
            let windNode = document.getElementById('wind');
            let humidityNode = document.getElementById('humidity');
            let locationNode = document.getElementById('location');
            let forcastNode = document.getElementById('forecast');
            let tempRangeNode = document.getElementById('high-low');
            let backgroundNode = document.getElementById('main');
            backgroundNode.style.backgroundImage = `url(${weatherImage})`;
            temperatureNode.innerText = `${Math.round(temp)}°F`;
            windNode.innerText = Math.round(windSpeed).toString() + " MPH";
            humidityNode.innerText = Math.round(humidity).toString() + '%';
            locationNode.innerText = location.toUpperCase();
            forcastNode.innerText = `Forecast: ${(forecast != undefined) ? forecast : 'No Prediction'}`;
            tempRangeNode.innerText = `Low ${Math.round(temp_min)}° | High ${Math.round(temp_max)}°`;
        }, 1000);
    });
}
displayWeather(getWeatherData);
