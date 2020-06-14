var lat = "";
var lon = "";
var fetched_location = "";   


$( document ).ready(function() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});

    function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+", "+lon+'&sensor=true&key=AIzaSyD98TIgEeJkaKcioLj-s2hgbBeWCV1tUQE', 
            success: function(data) {

                console.log(data);
                console.log(data.results[2].formatted_address);
                console.log(data.results[6].formatted_address);
                
                //fetched_location = data.results[4].formatted_address;
                fetched_location = data.results[5].formatted_address;
                
                //alert(fetched_location);
                abc();
                //process the JSON data etc
        }

        })

        //alert(lat+", "+lon); 
}


function abc(){
 var place =  fetched_location;
$.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?appid=d320935067c3352386361492f27995eb&units=metric&q="+place,
      dataType: "jsonp",

                success: function(data){

                console.log(data);
                
            
        //Get condition
        var currently = data.weather[0].main;
        $('.currently').html(currently);
        //Get city & country
        var city  = data.name;
        var country = data.sys.country;
        $('.city').html("<i class='material-icons'>room</i> "+city+", "+country);
        //Get temprature
        var temprature = parseInt(data.main.temp);
        $('.temp').html(temprature+"&#176");
        //Get humidity
        var humidity = data.main.humidity+"%";
        var wind = data.wind.speed+"km/h";
        $('.humi_wind').html("<i class='wi wi-raindrop'></i> "+humidity+'</div>'+" &#183; "+"<i class='wi wi-strong-wind'></i> "+wind+'</div>');
        

        //Get icon
        var icon = data.weather[0].icon;
        //$('.icon').html(icon);

                 switch (icon)
                  {
               
               case '01d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/sunny.png";
               break;
               case '01n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/sunny.png";
               break;
               case '02d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png";
               break;
               case '02n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png";
               break;
               case '03d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png";
               break;
               case '03n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/partly_cloudy.png";
               break;
               case '04d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/cloudy.png";
               break;
               case '04n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/cloudy.png";
               break;
               case '09d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/rain.png";
               break;
               case '09n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/rain.png";
               case '10d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/rain.png";
               break;
               case '10n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/rain.png";
               case '11d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png";
               break;
               case '11n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/thunderstorms.png";
               case '13d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/snow.png";
               break;
               case '13n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/snow.png";
               case '50d': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/fog.png";
               break;
               case '50n': document.getElementById("imgthumb").src = "https://ssl.gstatic.com/onebox/weather/256/fog.png";
               break;


               default:  document.getElementById("imgthumb").src = "http://nextlink.5gbfree.com/graphweather/images/notavailable.png";
            }

                //Display thumb
        

    }
    });

}
