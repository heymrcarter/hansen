var Inquiry = (function ($) {
	return function (data) {
		var inquiry;		
		
		function init() {
			inquiry = $.extend({}, data);
		}
		
		function isValid() {
			var validator = InquiryValidator(inquiry);
			return validator.validate();
		}
		
		init();
		var modelState = isValid();
		
		if (modelState.error) {
			return {
				error: true,
				errors: modelState.errors	
			};
		}		
		
		return {
			error: false,
			name: inquiry.name,
			phone: inquiry.phone,
			email: inquiry.email,
			vehicleYear: inquiry.vehicleYear,
			vehicleMake: inquiry.vehicleMake,
			vehicleModel: inquiry.vehicleModel,
			additionalComments: inquiry.additionalComments,
		};	
	};	
}(window.jQuery));