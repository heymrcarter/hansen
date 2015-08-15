var ScrollFader = (function ($) {
	return function (userConfig) {
		var defaults = {
			backgroundContainerSelector : '.content-overlay',
			overlayingContentSelector : '.overlaying-content',
			transparencyTransitionClass : 'transparent'
		};
		var config = $.extend({}, defaults, userConfig);

		var fadingOut = $(config.backgroundContainerSelector),
			fadingIn = $(config.overlayingContentSelector);

		$(window).on('scroll', function () {
			var scrollPosition = $(this).scrollTop(),
				fadingOutHeight = fadingOut.height();
			if (1 - scrollPosition/fadingOutHeight <= 0) {
				fadingOut.addClass(config.transparencyTransitionClass);
			} else{
				fadingOut.removeClass(config.transparencyTransitionClass);
			}
			fadingIn.css({'opacity' : (0 + scrollPosition/fadingIn.height())});
		});
	};
}(window.jQuery))