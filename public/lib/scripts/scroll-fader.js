var fadingOut = $('.content-overlay'),
	fadingIn = $('.overlaying-content');

$(window).on('scroll', function(){
	var scrollPosition = $(this).scrollTop(),
		fadingOutHeight = fadingOut.height();

	if (1 - scrollPosition/fadingOutHeight <= 0)  {
		$(fadingOut).addClass('transparent');
	} else{
		$(fadingOut).removeClass('transparent');
	};
	fadingIn.css({'opacity' : (0 + scrollPosition/fadingIn.height())});
});