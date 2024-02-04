//---------------- JS Variables ----------------// 
// Nav Bar//
var addFavorite = $("#addFavorite");
var elFavorites = $("#elFavorites");
var favCityValueArray = []
var search = $("#search");
var searchResult = $("#searchResult");
var cityValue;
//Current Weather Elements//
var currentCity = $("#currentCity");
var currentDate = $("#currentDate");
var currentTemp = $("#currentTemp");
var currentHumid = $("#currentHumid");
var currentWind = $("#currentWind");
var currentIcon = $("#currentIcon");
var pageMessage = $("#forcast");
// Fetch URLs//
var requestURLCurrent;
var requestURLFiveDay;
//DRY Variables//
var api = "0033aad0c09d93beb4a60c3cfe05890e";
var icon = "https://openweathermap.org/img/wn/";

//---------------- Fetch Functions ----------------//
//Function to convert city name to lat/lon coordinates//
function coordinatesConvert() {
    fetch(citySearch, {
        cache: "no-cache",
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            pageMessage.text("");
            cityValue = data[0].name + ", " + data[0].state;
            currentCity.text("City: " + cityValue);
            requestURLCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=" + api
            coordinatesSearchCurrent(requestURLCurrent);
            requestURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?lat=" + (data[0].lat) + "&lon=" + (data[0].lon) + "&units=imperial&appid=" + api
            coordinatesSearchFiveDay(requestURLFiveDay);
        })
};

// Function with fetch request to search lat/lon coordinates and output API results//
function coordinatesSearchCurrent() {
    fetch(requestURLCurrent, {
        cache: "no-cache",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentDate.text("Date: " + dayjs.unix(data.dt).format("MMMM D, YYYY"));
            currentTemp.text("Temp: " + Math.round(data.main.temp) + "°");
            currentHumid.text("Humidity: " + Math.round(data.main.humidity) + "%");
            currentWind.text("Wind Speed: " + Math.round(data.wind.speed) + " mph");
            currentIcon.attr("src", icon + data.weather[0].icon + "@4x.png");
        })
};

// Function with fetch request to get 5 day API results//
function coordinatesSearchFiveDay() {
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
                $(day).children().eq(2).attr("src", icon + data.list[i].weather[0].icon + "@2x.png")
                $(day).children().eq(3).children().eq(0).text(Math.round(data.list[i].main.humidity) + "%");
                $(day).children().eq(3).children().eq(1).text(Math.round(data.list[i].wind.speed) + " mph");
                dayStart++
            }
        })
};

//---------------- Local Data Save/Load ----------------//
// Push favorites to "My favorite cities" menu //
addFavorite.on("click", setFavorite)
function setFavorite() {
    favCityValueArray.push(cityValue);
    // Path to append new cities//
    elFavorites.append($("<li>").attr("id", "favCity").append($("<a>" + cityValue + "</a>").attr({ "class": "dropdown-item favBtn", "href": "#" })));
    save();
    load();
};

//Save data to local storage//
function save() {
    localStorage.setItem("city", JSON.stringify(favCityValueArray));
};

//Load from Local Storage//
function load() {
    elFavorites.empty();
    for (var i = 0; i < favCityValueArray.length; i++) {
        elFavorites.append($("<li>").attr("id", "favCity").append($("<a>" + favCityValueArray[i] + "</a>").attr({ "class": "dropdown-item favBtn", "href": "#" })))
    }
};

// Init function//
loadedFavCityValueArray = JSON.parse(localStorage.getItem("city"));
if (loadedFavCityValueArray !== null) {
    favCityValueArray = loadedFavCityValueArray
    load()
};

//Local Storage Clear//
$("#clear").on("click", function () {
    localStorage.clear();
    elFavorites.empty();
    favCityValueArray.length = 0;
})

//---------------- Event Listeners ----------------//
// Search form event listener //
search.on("submit", function (event) {
    event.preventDefault();
    citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult.val() + "&limit=1&appid=" + api
    coordinatesConvert();
    searchResult.val("");
});

// Favorite button click listener //
elFavorites.on("click", ".favBtn", function () {
    favoriteSearch = this.text;
    citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + favoriteSearch + "&limit=1&appid=" + api
    coordinatesConvert();
});