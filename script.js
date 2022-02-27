const API_KEY = "06a229a09de1aed76f492eb114f80db3";
const locationIcon = document.querySelector('#locationIcon');

let weather = {
    fetchWeather: function (api_url) {
        fetch(api_url)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp} = data.main;
        const {country} = data.sys;
        console.log(name, icon, description, temp);
        document.querySelector("#city").innerText = name + ", " + country;
        document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector("#conditions").innerText = description;
        document.querySelector("#temp").innerText = Math.round(temp) + " °C";
    },
    searchWeather: function () {
        this.fetchWeather("http://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#sbox").value + "&units=metric&appid=" + API_KEY);
    },
    searchLocalWeather: function (position) {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(position);
        weather.fetchWeather(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`);
    },
};

document.querySelector("#sbutton").addEventListener("click", function(){
    weather.searchWeather();
});

document.querySelector("#sbox").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.searchWeather();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weather.searchLocalWeather);
    }
  });

locationIcon.addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(weather.searchLocalWeather);
    }
});

  
  

 
