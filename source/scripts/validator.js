var Validator = (function () {
	return function (field, regex) {
		var subject = field,
			expression = new RegExp(regex);
		
		function validate(regex) {
			return expression.test(subject);
		}
		
		return {
			validate: function () {
				return validate();
			}	
		};
	};
}());