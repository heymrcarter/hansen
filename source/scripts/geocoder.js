var Geocoder = (function (Geocoder, GeocoderUtilities) {	
	var GeocoderStatus = GeocoderUtilities.GeocoderStatus;
	
	return function (address, callback) {
		var placeId;
			
		var geocoder = new Geocoder();
		var requestObj = {'address': address};		
		
		geocoder.geocode(requestObj, function (results, status) {
			var result = results[0];
			
			if (status === GeocoderStatus.ERROR) {
				callback(new Error('Geocoder error: ' + status));
			}
			
			placeId = result.place_id;			
			
			callback(result.geometry.location);					
		});
		
		return {
			getPlaceId: function () {
				return placeId;
			}
		};
	};
}(window.google.maps.Geocoder, window.google.maps));