var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");





var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=39.74&lon=-104.99&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        {
            currentCity.text("City: "+data.city.name+", "+ data.city.country)
            currentDate.text("Date & Time: "+data.list[1].dt_txt)
            currentWind.text("Wind Speed: "+data.list[1].wind.speed)
            currentHumid.text("Humidity: "+data.list[1].main.humidity)
            currentTemp.text("Temp: "+data.list[1].main.temp)
        }
        // for (var i = 0; i < data.list.length; i++) 
    }); 
