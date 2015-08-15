var InquiryMap = (function () {
	return function () {
		var map = {};
		
		map['contact-name'] = 'name';
		map['contact-phone'] = 'phone';
		map['contact-email'] = 'email';
		map['contact-vehicle-year'] = 'vehicleYear';
		map['contact-vehicle-make'] = 'vehicleMake';
		map['contact-vehicle-model'] = 'vehicleModel';
		map['contact-comments'] = 'additionalComments';
		
		return map;	
	};
}());