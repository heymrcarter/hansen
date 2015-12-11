var Map = (function ($, mapsApi) {
	var Map = mapsApi.Map,
		MapEvents = mapsApi.event; 
	
	return function (userConfig) {
		var map, config;
		
		var defaults = {
			element: 'map',
			address: 'Times Square New York, NY 10036',
			zoom: 1
		};
		
		config = $.extend({}, defaults, userConfig);
		
		MapEvents.addDomListener(window, 'load', function () {
			Geocoder(config.address, function (latlng) {
				map = new Map(document.getElementById(config.element), {
					zoom: config.zoom,
					center: latlng
				});
			});
		});		
	};
}(window.jQuery, window.google.maps));