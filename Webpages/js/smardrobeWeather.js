var API_KEY = "939a6786e2215bd7";

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(locOnSuccess, locOnError);
});

// onSuccess Callback for getting current location.
var locOnSuccess = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    requestWeather(latitude, longitude);
};

// onError Callback when it receives and error from trying to
// get the current location.
var locOnError = function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

// Creates the necessary URL and makes an Ajax call.
var requestWeather = function(latitude, longitude) {
    URL = "http://api.wunderground.com/api/" + API_KEY +
            "/geolookup/conditions/q/" + latitude + "," +
            longitude + ".json";
            
    $(document).ready(function() {  
        $.ajax({
            url : URL,
            dataType : "jsonp",
            success : weatherOnSuccess
        });
    });
};

// Called upon succesfully retrieving the weather data.
var weatherOnSuccess = function(jsonParsed) {
    var location = jsonParsed['location']['city'] + ", " + jsonParsed['location']['country_name'];
    var weather = jsonParsed['current_observation']['weather'];
    var temp = jsonParsed['current_observation']['temp_c'] + " C";
    var wind = jsonParsed['current_observation']['wind_kph'] + "km/h " + 
                jsonParsed['current_observation']['wind_dir'];
    var feelsLike = jsonParsed['current_observation']['feelslike_c'] + " C";
    var weatherIcon = jsonParsed['current_observation']['icon_url'];
    
    alert(location + "\n" +
            weather + "\n" +
            temp + "\n" +
            wind + "\n" +
            feelsLike + "\n" +
            weatherIcon + "\n");
};