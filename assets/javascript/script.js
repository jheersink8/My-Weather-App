var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");


// 5-day api//
// "https://api.openweathermap.org/data/2.5/forecast?lat=39.74&lon=-104.99&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"//
// currentCity.text("City: "+data.city.name+", "+ data.city.country)
// currentDate.text("Date & Time: "+data.list[0].dt_txt)
// currentWind.text("Wind Speed: "+data.list[0].wind.speed)
// currentHumid.text("Humidity: "+data.list[0].main.humidity)
// currentTemp.text("Temp: "+data.list[0].main.temp)

var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        {            // currentCity.text("City: "+data.city.name+", "+ data.city.country)
            currentDate.text("Date & Time: " + dayjs.unix(data.dt).format("MMMM D, YYYY"));
            currentTemp.text("Temp: " + data.main.temp);
            currentHumid.text("Humidity: " + data.main.humidity);
            currentWind.text("Wind Speed: " + data.wind.speed);
        }
        // for (var i = 0; i < data.list.length; i++) 
    }); 
