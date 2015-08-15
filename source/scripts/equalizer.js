var Equalizer = (function ($) {
	return function (container) {
		var tallest = 0;
		
		$(container).find('[data-match-height]').each(function () {
			if ($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		
		$(container).css('height', tallest + 'px');
		$(container).find('[data-match-height]').css('height', tallest + 'px');
	};
}(window.jQuery));