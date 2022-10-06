var apiKey = "1b18ce13c84e21faafb19c931bb29331";
var savedSearches = [];

var currentWeatherSection = (cityName) => {

    // Fetch data from api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

        // Turn it into json object
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // Latitude and longitude for use for other api
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
                // Turn it into json object
                .then(function(response) {
                    return response.json();
                })
                    .then(function(response){
                    searchHistoryList(cityName);

                
                    var currentWeatherContainer = $("#current-weather-container");
                    currentWeatherContainer.addClass("current-weather-container");

                    // City name, date, weather icon
                    var currentTitle = $("#current-title");
                    var currentDay = moment().format("M/D/YYYY");
                    currentTitle.text(`${cityName} (${currentDay})`);
                    var currentIcon = $("#current-weather-icon");
                    currentIcon.addClass("current-weather-icon");
                    var currentIconCode = response.current.weather[0].icon;
                    currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

                    // Current temp
                    var currentTemperature = $("#current-temperature");
                    currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");

                    // Current wind speed
                    var currentWindSpeed = $("#current-wind-speed");
                    currentWindSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");
                                        
                    // Current humidity
                    var currentHumidity = $("#current-humidity");
                    currentHumidity.text("Humidity: " + response.current.humidity + "%");



                    // Current uv index
                    var currentUvIndex = $("#current-uv-index");
                    currentUvIndex.text("UV Index: ");
                    var currentNumber = $("#current-number");
                    currentNumber.text(response.current.uvi);

                    // Background color for uv index
                    if (response.current.uvi <= 2) {
                        currentNumber.addClass("favorable");
                    } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
                        currentNumber.addClass("moderate");
                    } else {
                        currentNumber.addClass("severe");
                    }
                })
        })
        .catch(function(err) {
            // reset search input
            $("#search-input").val("");

            // alert user that there was an error
            alert("We could not find the city you searched for. Try searching for a valid city.");
        });
};