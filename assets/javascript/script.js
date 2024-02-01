var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");
var search = $("#search");
var requestURL;

// currentIcon.text("TEST");

// Function to convert city name to lat/lon coordinates.//
var coordinatesConvert = function (event) {
    event.preventDefault();
    citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + $("#searchResult").val() + "&limit=1&appid=0033aad0c09d93beb4a60c3cfe05890e"
    fetch(citySearch)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            currentCity.text("City: " + data[0].name + ", " + data[0].state)
            console.log(data)
            requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"
            coordinatesSearch(requestURL);
        })
};

// Function to search lat/lon coordinates and output API results.//
var coordinatesSearch = function () {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentDate.text("Date: " + dayjs.unix(data.dt).format("MMMM D, YYYY"));
            currentTemp.text("Temp: " + data.main.temp);
            currentHumid.text("Humidity: " + data.main.humidity);
            currentWind.text("Wind Speed: " + data.wind.speed);
            currentIcon.attr("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
        })     
};

// Form submit search event listener//
search.on("submit", coordinatesConvert);










// for (var i = 0; i < data.list.length; i++) 
// });





// 5-day api//
// "https://api.openweathermap.org/data/2.5/forecast?lat=39.74&lon=-104.99&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"//
// currentCity.text("City: "+data.city.name+", "+ data.city.country)
// currentDate.text("Date & Time: "+data.list[0].dt_txt)
// currentWind.text("Wind Speed: "+data.list[0].wind.speed)
// currentHumid.text("Humidity: "+data.list[0].main.humidity)
// currentTemp.text("Temp: "+data.list[0].main.temp)