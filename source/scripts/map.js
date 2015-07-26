var Map = (function ($, google) {
	return function (userConfig) {
		var map, config;
		
		var defaults = {
			element: 'map',
			address: 'Times Square New York, NY 10036',
			zoom: 1
		};
		
		config = $.extend({}, defaults, userConfig);
		
		google.maps.event.addDomListener(window, 'load', function () {
			Geocoder(config.address, function (latlng) {
				map = new google.maps.Map(document.getElementById(config.element), {
					zoom: config.zoom,
					center: { lat: latlng.lat, lng: latlng.lng }
				});
			});
		});		
	};
}(window.jQuery, window.google));