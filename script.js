var lat = "";
var lon = "";
var fetched_location = "";  
var categories1=[];
var forecast_high=[];
var forecast_low=[];
var highest_for_graph="";


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
                //console.log(data.results[2].formatted_address);
                //console.log(data.results[6].formatted_address);
                
                //fetched_location = data.results[4].formatted_address;
                //fetched_location = data.results[2].formatted_address;
                let str = data.plus_code.compound_code;
                str = str.split(" ");
                str.shift();
                str = str.join(" ");
                //alert(str);
                fetched_location = str;
                
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
      url: "https://api.openweathermap.org/data/2.5/weather?appid=d320935067c3352386361492f27995eb&units=metric&q="+place,
      dataType: "jsonp",

                success: function(data){

                console.log(data);
                
            
        //Get condition
        var currently = data.weather[0].main;
        $('.currently').html(currently);
        //Get city & country
        var city  = data.name;
        var country = data.sys.country;
        //$('.city').html("<i class='material-icons'>room</i> "+city+", "+country);
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

               
        

    }
    });
      showdata()
}


function showdata() {

 $('.mdl-spinner').attr('style','display: block !important');

//var location = fetched_location;
var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
var method = 'GET';
var app_id = 'iWJzNd5c';
var consumer_key = 'dj0yJmk9emxBQ1FBbmV3dUtCJmQ9WVdrOWFWZEtlazVrTldNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTE2';
var consumer_secret = '6c83035a3577e52ef57017904b42583e9016991e';
var concat = '&';
var units = 'C';
var query = {'location': fetched_location, 'format': 'json','u':units};
var oauth = {
    'oauth_consumer_key': consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
};

var merged = {}; 
$.extend(merged, query, oauth);
// Note the sorting here is required
var merged_arr = Object.keys(merged).sort().map(function(k) {
  return [k + '=' + encodeURIComponent(merged[k])];
});
var signature_base_str = method
  + concat + encodeURIComponent(url)
  + concat + encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth['oauth_signature'] = signature;
var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
  return [k + '="' + oauth[k] + '"'];
}).join(',');

$.ajax({
  url: url + '?' + $.param(query),
  headers: {
    'Authorization': auth_header,
    'X-Yahoo-App-Id': app_id 
  },
  method: 'GET',
  success: function(data){
    console.log(data);


    var city = data.location.city;
    var region = data.location.region;
    var temp = data.current_observation.condition.temperature;
    var description = data.current_observation.condition.text;
    var highlow = '<span class="material-icons">arrow_drop_up</span> '+data.forecasts[0].high+'\xB0'+" <span class='material-icons'>arrow_drop_down</span> "+data.forecasts[0].low+'\xB0';
    var humidity = data.current_observation.atmosphere.humidity+"%";
    var wind = data.current_observation.wind.speed+"Km/h";
    hightemp = data.forecasts[0].high;

    //alert(data.forecasts.length);

 //document.getElementById("display").innerHTML += "Places: " +places[i] + "<br/>";

  $('.city').html("<i class='material-icons'>room</i> "+city+" &#183; "+region);
  $('.high_low').html(highlow);

   $('.panel-body').append("<div class='forecast'></div>");

     for (var i=1;i<=data.forecasts.length-1;i++) {

    categories1.push(data.forecasts[i].day);
    forecast_high.push(data.forecasts[i].high);  
    forecast_low.push(data.forecasts[i].low);  

    $(".forecast").append("<div class='forecast_item'>"+data.forecasts[i].day+"&nbsp"+" <i class='wi wi-yahoo-"+ data.forecasts[i].code +"'></i>&nbsp"+
"  "+data.forecasts[i].high+'\xB0' +" &#183; "+ data.forecasts[i].low+'\xB0'+"<br></div>");
      
    }
   
  $('#place').val("");
  $('.mdl-spinner').css("display","none");
  $('.main').fadeIn();
  $('#deletebutton').css("display","block");
  $('#splashscreen').fadeOut('fast');
  $('#view').fadeIn();
  $('#accordion').fadeIn();
  highest_Temp();

    }
  
});

}

function highest_Temp(){
  var array = forecast_high ;
var largest= 0;

for (i=0; i<=largest;i++){
    if (array[i]>largest) {
        var largest=array[i];
    }
}

//console.log(largest);
highest_for_graph = largest;
makegraph();
}

function makegraph(){
$(function() {
  var chart;
  categories = categories1;
    chart = new Highcharts.Chart({
        chart : {
          renderTo : 'view',
          type : 'spline',
          backgroundColor : {
            linearGradient : [0, 0, 0, 400],
            stops : [
              [0, 'rgba(96, 96, 96,0)'],
              [1, 'rgba(16, 16, 16,0)']
            ]
          }
        },
        title : {
          text : ''
        },
        subtitle : {
          text : ''
        },
        xAxis: {

          labels: {
        style: {
            color: '#FFF'
        },
      },
        
        categories:categories1,
      
      },
        yAxis : {

          labels: {
        style: {
            color: '#FFF'
        },
      },
          title : {
            style: {
            color: '#FFF'
        },
            /*text : 'Temperature ( \xB0C)'*/
            text : ''
          },
         
          max : highest_for_graph
        },
        tooltip : {
          formatter : function () {
            return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%e. %b', this.x) + this.y + '  \xB0C';
          }
        },
        plotOptions : {
          area : {
            lineWidth : 1,
            marker : {
              enabled : false,
              states : {
                hover : {
                  enabled : true,
                  radius : 5
                }
              }
            },
            shadow : false,
            states : {
              hover : {
                lineWidth : 1
              }
            }
          }
        },
        
        series : [{
            name : 'High',
            type : "area",
            fillColor : {
              linearGradient : [0, 0, 0, 300],
              stops : [
                [0, "#2c7bf1"],
                [1, '#616771']
              ]
            },
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data : forecast_high
          },  {
            name : 'Low',
            type : "area",
            fillColor : {
              linearGradient : [0, 0, 0, 300],
              stops : [
                [0, "#FFFFFF"],
                [1, '#616771']
              ]
            },
            data : forecast_low
          }
        ]
      });
  });
}
