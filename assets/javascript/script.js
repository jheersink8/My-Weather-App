var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");
var search = $("#search");
var requestURLCurrent;
var requestURLFiveDay;



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
            requestURLCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"
            coordinatesSearchCurrent(requestURLCurrent);
            requestURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"
            coordinatesSearchFiveDay(requestURLFiveDay);
        })
};

// Function with fetch request to search lat/lon coordinates and output API results.//
var coordinatesSearchCurrent = function () {
    fetch(requestURLCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentDate.text("Date: " + dayjs.unix(data.dt).format("MMMM D, YYYY"));
            currentTemp.text("Temp: " + data.main.temp + "°");
            currentHumid.text("Humidity: " + data.main.humidity + "%");
            currentWind.text("Wind Speed: " + data.wind.speed + " mph");
            currentIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        })
};

// Function with fetch request to get 5 day API results.//
var coordinatesSearchFiveDay = function () {
    fetch(requestURLFiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // For loop to grab data for each day at noon.//
            console.log(data);
            for (var i = 0; i < data.list.length; i++) {
                var day = "#day-" + i;
                $(day).children().eq(0).text("Date: " + data.list[i].dt_txt);
                $(day).children().eq(1).text("Temp: " + data.list[i].main.temp);
                $(day).children().eq(2).attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png")
                $(day).children().eq(3).children().eq(0).text("Humidity: " + data.list[i].main.humidity);
                $(day).children().eq(3).children().eq(1).text("Wind Speed: " + data.list[i].wind.speed);
            }
        })
};

// Form submit search event listener//
search.on("submit", coordinatesConvert);




// "$("#date1");
// "$("#temp1");
// "$("#icon1");
// "$("#hum1");
// "$("#wind1");

// $("#date1").text("Date: " + data.list[i].dt_txt)
// console.log("Date & Time: " + data.list[i].dt_txt)
// console.log("Temp: " + data.list[i].main.temp)
// console.log("Humidity: " + data.list[i].main.humidity)
// console.log("Wind Speed: " + data.list[i].wind.speed)