var genericBlackgrounds = [
  'img/1514371209319.jpg',
  'img/1514414573244.jpg',
  'img/1518720443855.jpg'
];

$(document).ready(function() {
  var $body = $('body');
  var $tiempoContainer = $('.tiempoContainer');
  var $temperatura = $('#temperatura');
  var $tempMax = $('#temperaturaMax');
  var $tempMin = $('#temperaturaMin');
  var $windSpeed = $('#windspeed');
  var $ciudad = $('#ciudad');
  var $sunrise = $('#sunrise');
  var $sunset = $('#sunset');
  var $statusContainer = $('.statusContainer');
  var $statusText = $('#statusText');
  var $weatherIcon = $('#weatherImg');
  var $containerWeather = $('.container-weather');

  // escoge un fondo de forma aleatoria
  var random = Math.floor(Math.random() * genericBlackgrounds.length);

  $body.css('background-image', 'url(' + genericBlackgrounds[random] + ')');

  $('#campoCiudad').on("change", function(){
    var ciudad = $(this).val();
    $tiempoContainer.hide();
    $weatherIcon.hide();

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + ",es&appid=1ebe8fb6c5d2654d9ceb6e243540f115",
      method: "GET",
      dataType: "JSON",
      beforeSend: function() {
        $statusText.text('Cargando...');
        $statusContainer.show();
      },
      success: function(result){
        $ciudad.html(ciudad);
        $temperatura.html(Math.floor(result.main.temp - 273));
        $tempMax.html(Math.floor(result.main.temp_max - 273));
        $tempMin.html(Math.floor(result.main.temp_min - 273));
        $windSpeed.html(result.wind.speed);

        var sunrise = new Date(result.sys.sunrise * 1000);
        $sunrise.html(sunrise.toLocaleTimeString());

        var sunset = new Date(result.sys.sunset * 1000);
        $sunset.html(sunset.toLocaleTimeString());

        $body.css('background-image', 'url("img/' + result.weather[0].icon + 'bg.jpg")');

        $statusContainer.hide();
        $tiempoContainer.show();
        $weatherIcon.attr('src', 'img/weather/' + result.weather[0].icon + '_ico.png');
        $weatherIcon.show();
      },
      error: function() {
        $statusText.text('Ciudad no encontrada');
      }
    });

    $(this).val("");
  });


});
