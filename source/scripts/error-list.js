var ErrorList = (function ($) {
	return function (userConfig) {
		var config, defaults = {
				selector: '[data-error-list]',
				cssClass: '',
				errors: [],
				parent: '[data-error-list-parent]'
			},
			$list, $parent;
		
		config = $.extend({}, defaults, userConfig);
		
		function init () {
			$list = $('<ul/>')
				.data('error-list', '')
				.attr('id', 'error-list')
				.addClass('inactive')
				.addClass(config.cssClass);
				
			addErrors(config.errors);	
			
			$parent = $(config.parent);
			
			$list.insertAfter('.alert-box');
		}
		
		function addErrors(errors) {
			errors.forEach(function (error) {
				var $error = $('<li/>')
					.text(error);
					
				$list.append($error);
			});	
		}
		
		function show() {
			$list
				.removeClass('inactive')
				.addClass('active');
		}
		
		function hide() {
			$list
				.removeClass('active')
				.addClass('inactive');
		}
		
		init();
		
		return {
			show: function () {
				show();
			},
			hide: function () {
				hide();
			},
			updateList: function(errors) {
				$list.empty();
				addErrors(errors);
			},
			isOpen: function () {
				return $list.hasClass('active');
			}
		};
	};
}(window.jQuery));