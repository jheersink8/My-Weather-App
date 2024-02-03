// JS Variables// 
var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");
var search = $("#search");
var searchResult = $("#searchResult");
var requestURLCurrent;
var requestURLFiveDay;

// Function to convert city name to lat/lon coordinates.//
var coordinatesConvert = function () {
    fetch(citySearch, {
        cache: "no-cache",
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            currentCity.text("City: " + data[0].name + ", " + data[0].state)
            requestURLCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"
            coordinatesSearchCurrent(requestURLCurrent);
            requestURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"
            coordinatesSearchFiveDay(requestURLFiveDay);
        })
};

// Function with fetch request to search lat/lon coordinates and output API results.//
var coordinatesSearchCurrent = function () {
    fetch(requestURLCurrent, {
        cache: "no-cache",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentDate.text("Date: " + dayjs.unix(data.dt).format("MMMM D, YYYY"));
            currentTemp.text("Temp: " + Math.round(data.main.temp) + "°");
            currentHumid.text("Humidity: " + Math.round(data.main.humidity) + "%");
            currentWind.text("Wind Speed: " + Math.round(data.wind.speed) + " mph");
            currentIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        })
};

// Function with fetch request to get 5 day API results.//
var coordinatesSearchFiveDay = function () {
    fetch(requestURLFiveDay, {
        cache: "no-cache",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Calculations to output a value of noon on the page (more details in ReadMe)//
            var time1 = dayjs(data.list[0].dt_txt);
            var time2 = ((time1.add(12, "hour")).startOf('day').add(12, "hour"));
            var timeCode = Math.floor(time2.diff(time1, "hours") / 3);
            // For loop to grab data for each day at noon.//
            var dayStart = 0;
            for (var i = timeCode; i < data.list.length; i += 8) {
                var day = "#day-" + dayStart;
                $(day).children().eq(0).text(dayjs(data.list[i].dt_txt).format("ddd MMM, D"));
                $(day).children().eq(1).text(Math.round(data.list[i].main.temp) + "°");
                $(day).children().eq(2).attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png")
                $(day).children().eq(3).children().eq(0).text(Math.round(data.list[i].main.humidity) + "%");
                $(day).children().eq(3).children().eq(1).text(Math.round(data.list[i].wind.speed) + " mph");
                dayStart++
            }
        })
};

// Form submit search event listener//
search.on("submit", function (event) {
    event.preventDefault();
    citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult.val() + "&limit=1&appid=0033aad0c09d93beb4a60c3cfe05890e"
    coordinatesConvert();
});

// test.on("click", function (){
//     var favoriteSearch = "alamosa"; 
//     citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + favoriteSearch + "&limit=1&appid=0033aad0c09d93beb4a60c3cfe05890e"
//     console.log(citySearch)
//     coordinatesConvert();
// }) ; 
