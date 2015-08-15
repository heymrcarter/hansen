var Alert = (function ($) {
	return function (userConfig) {
		var config, $parent, $alert,
			defaults = {
				parent: '[data-alert-parent]',
				insertBy: 'prepend',
				type: 'secondary',
				message: 'This is an alert!',
				dismissLink: '[data-dismiss-alert]',
				dismissable: false,
				cssClass: '',
				refocus: true
			};
		
		userConfig = userConfig || {};
		config = $.extend({}, defaults, userConfig);
		
		init();
		
		function init () {					
			$parent = $(config.parent);
			$alert = $('<div/>');				
			
			$alert
				.addClass('alert-box')
				.addClass(config.type)
				.addClass('inactive')
				.addClass(config.cssClass)
				.data('alert', '')
				.append(config.message);				
				
			if (config.insertBy === 'prepend') {
				$parent.prepend($alert);
			} else {
				$parent.append($alert);
			}
			
			if (config.dismissable) {
				var $dismiss = $('<a/>');
				
				$dismiss
					.addClass('close')
					.attr('href', '#')
					.data(config.dismissLink, '')
					.html('&times');
							
				$alert.append($dismiss);
				
				$(config.dismissLink).on('click', function (e) {
					e.preventDefault();
					dismiss();
				});	
			}			
		}
		
		function show() {
			$alert
				.removeClass('inactive')
				.addClass('active');
				
			if (config.refocus) {
				var alertTop = $alert.offset().top;
				
				$alert.focus();
				
				$('body').animate({scrollTop: alertTop + 'px'});
			}
		}
		
		function dismiss() {
			$alert
				.removeClass('active')
				.addClass('dismissed');
		}
		
		function rebind() {
			$alert
				.removeClass()
				.addClass('alert-box')
				.addClass(config.type)
				.addClass('inactive')
				.addClass(config.cssClass)
				.html(config.message);
				
			if (config.dismissable) {
				$(config.dismissLink).on('click', function (e) {
					e.preventDefault();
					dismiss();
				});
			}
		}
		
		return {
			show: function () {
				show();
			},
			dismiss: function () {
				dismiss();	
			},
			rebind: function () {
				rebind();
			},
			setMessage: function (message) {
				config.message = message;
			},
			setType: function (type) {
				config.type = type;
			},
			isOpen: function () {
				return $alert.hasClass('active');
			}
		};		
	};
}(window.jQuery));