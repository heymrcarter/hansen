var InquiryValidator = (function () {
	return function (inquiry) {
		var	modelState = {
				error: false,
				errors: []
			},
			nameValidator = Validator(inquiry.name, Regex.nameExpression),
			phoneValidator = Validator(inquiry.phone, Regex.phoneExpression),
			emailValidator = Validator(inquiry.email, Regex.emailExpression),
			yearValidator = Validator(inquiry.vehicleYear, Regex.yearExpression),
			makeValidator = Validator(inquiry.vehicleMake, Regex.makeExpression),
			modelValidator = Validator(inquiry.vehicleModel, Regex.modelExpression);
			
		
		if (!nameValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Name is required. Please enter a valid name!');
		}
		
		if (!phoneValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Phone is required. Please enter a valid phone number, including the area code.');	
		}
		
		if (!emailValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Email is required. Please enter a valid email address!');
		}
		
		if (!yearValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Vehicle year is required. Please enter a valid four digit year!');
		}
		
		if (makeValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Vehicle make is required. Please enter a valid vehicle manufacturer!');
		}
		
		if (modelValidator.validate()) {
			modelState.error = true;
			modelState.errors.push('Vehicle model is required. Please enter a valid model!');
		}
		
		return {
			validate: function () {
				return modelState;	
			}
		};
	};
}());