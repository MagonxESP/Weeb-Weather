var $body;
var $tiempoContainer;
var $temperatura;
var $tempMax;
var $tempMin;
var $windSpeed;
var $ciudad;
var $sunrise;
var $sunset;
var $statusContainer;
var $statusText;
var $weatherIcon;
var $containerWeather;

var genericBackgrounds = [
  'img/1514371209319.jpg',
  'img/1514414573244.jpg',
  'img/1518720443855.jpg'
];

var requestUrl = "";

function printData(data) {
  $ciudad.html(data.name);
  $temperatura.html(Math.floor(data.main.temp - 273));
  $tempMax.html(Math.floor(data.main.temp_max - 273));
  $tempMin.html(Math.floor(data.main.temp_min - 273));
  $windSpeed.html(data.wind.speed);

  var sunrise = new Date(data.sys.sunrise * 1000);
  $sunrise.html(sunrise.toLocaleTimeString());

  var sunset = new Date(data.sys.sunset * 1000);
  $sunset.html(sunset.toLocaleTimeString());

  $body.css('background-image', 'url("img/' + data.weather[0].icon + 'bg.jpg")');
  $statusContainer.hide();
  $tiempoContainer.show();
  $weatherIcon.attr('src', 'img/weather/' + data.weather[0].icon + '_ico.png');
  $weatherIcon.show();
}

function getWeather() {
  $.ajax({
    url: requestUrl,
    method: "GET",
    dataType: "JSON",
    beforeSend: function() {
      $statusText.text('Cargando...');
      $statusContainer.show();
    },
    success: function(result){
      printData(result);
      updateWeatherTick();
    },
    error: function() {
      $statusText.text('Ciudad no encontrada');
    }
  });
}

function updateWeatherTick() {
  // actualiza los datos cada 10 minutos
  setInterval(function(){
    $.getJSON(requestUrl, function(data) {
      printData(data);
      console.log("weather updated!");
    });
  }, 600000);
}

$(document).ready(function() {
  $body = $('body');
  $tiempoContainer = $('.tiempoContainer');
  $temperatura = $('#temperatura');
  $tempMax = $('#temperaturaMax');
  $tempMin = $('#temperaturaMin');
  $windSpeed = $('#windspeed');
  $ciudad = $('#ciudad');
  $sunrise = $('#sunrise');
  $sunset = $('#sunset');
  $statusContainer = $('.statusContainer');
  $statusText = $('#statusText');
  $weatherIcon = $('#weatherImg');
  $containerWeather = $('.container-weather');

  // escoge un fondo de forma aleatoria
  var random = Math.floor(Math.random() * genericBackgrounds.length);

  $body.css('background-image', 'url(' + genericBackgrounds[random] + ')');

  $('#campoCiudad').on("change", function(){
    var cityName = $(this).val();
    requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",es&appid=1ebe8fb6c5d2654d9ceb6e243540f115";
    $tiempoContainer.hide();
    $weatherIcon.hide();
    getWeather();
    $(this).val("");
  });

});
