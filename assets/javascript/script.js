var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=39.74&lon=-104.99&units=imperial&appid=0033aad0c09d93beb4a60c3cfe05890e"

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.list.length; i++) {
            console.log("City: "+data.city.name+", "+ data.city.country)
            console.log("Date & Time: "+data.list[i].dt_txt)
            console.log("Wind Speed: "+data.list[i].wind.speed)
            console.log("Humidity: "+data.list[i].main.humidity)
            console.log("Temp: "+data.list[i].main.temp)
        }

    }); 
