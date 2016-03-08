$(function() {

	$("#getEachWeather").click(function getEachWeather() {

		/*$("section").html("<span>Hold on a moment...</span>");*/
		var location = $("#location").val();
		console.log(location);
		/*  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";*/
		// var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+location+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+location+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
		$.ajax({
			method: "GET",
			url: url,
			success: function(data) {
				/*debugger;*/
				var temp =(data.query.results.channel.item.condition.temp-32)*5/9;
				// TODO #1 - insert the weather forecast into section
				/*$("section").html("The wind speed in Nome, AK is "+ data.query.results.channel.wind.speed);*/

				// TODO #2 - provide a dropdown or input box that allows you to select a location (https://developer.yahoo.com/weather)
				/*$("section").html("weather is "+data.query.results.channel.item.condition.text
					+", and temp is "+temp.toFixed(2)+"`C");*/
				console.log(data);
				var results = data.query.results.channel;
				console.log(results);
				var strings = '<h3>';
				strings += "city : "+ results.location.city + "<br>";
				strings += "country : "+ results.location.country + "<br>";
				strings += "weather : "+ results.item.condition.text + "<br>";
				strings += "temprature : "+ temp.toFixed(2)+"℃" + "<br>";
				strings += "sunrise : "+ results.astronomy.sunrise + "<br>";
				strings += "sunset : "+ results.astronomy.sunset + "<br>";
				strings += "</h3>"
				$("section").html(strings);
			},
			error: function(error) {
				alert("Doh!");
			}
		})
	});
});

// TODO #3 (optional + advanced) - use the browser's location to determin the local weather


var geocoder="";

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
// Get the latitude and the longitude;
function successFunction(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	codeLatLng(lat, lng);
}

function errorFunction() {
	alert("Geocoder failed");
}

function initialize() {
	geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({latLng: latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				var arrAddress = results;
				$.each(arrAddress, function(i, address_component) {
					if (address_component.types[0] == "locality") {
						itemLocality = address_component.address_components[0].long_name;
						itemCountry = address_component.address_components[2].long_name;
						getWeather(itemLocality,itemCountry);
					}
				});
			} else {
				alert("No results found");
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
	});
}


function getWeather(city,country){
	$("p").html("<h2>Hold on a moment...</h2>");
	var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"
		+city
		+"%2C%20"
		+country
		+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

	$.ajax({
		method: "GET",
		url: url1,
		success: function(data) {
			var results = data.query.results.channel;
			var temp =(data.query.results.channel.item.condition.temp-32)*5/9;
			console.log(results);
			var strings = '<h3>';
			strings += "city : "+ results.location.city + "<br>";
			strings += "country : "+ results.location.country + "<br>";
			strings += "weather : "+ results.item.condition.text + "<br>";
			strings += "temprature : "+ temp.toFixed(2) + "℃"+"<br>";
			strings += "sunrise : "+ results.astronomy.sunrise + "<br>";
			strings += "sunset : "+ results.astronomy.sunset + "<br>";
			strings += "</h3>"
			$("section").html(strings);
		}
	});
}
initialize();

function getName(){
		var url2 = "http://localhost:5000"
		$.ajax({
		method: "GET",
		url: url2,
		success: function(data) {
			$("section").html("Name is "+ data.name);
		}
	});

}