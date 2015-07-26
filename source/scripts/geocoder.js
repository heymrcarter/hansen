var Geocoder = (function (GGeocoder) {
	return function (address, callback) {
		var lat, lng, placeId;
			
		var geocoder = new GGeocoder();
		var requestObject = {};
		
		requestObject.address = address;
		
		geocoder.geocode(requestObject, function (results, status) {
			var result = results[0];
			lat = result.geometry.location.A;
			lng = result.geometry.location.F;
			placeId = result.placeId;
			
			if (typeof callback === 'function') {
				callback({
					lat: lat,
					lng: lng 
				});
			}		
		});
		
		return {
			getPlaceId: function () {
				return placeId;
			}
		};
	};
}(window.google.maps.Geocoder));