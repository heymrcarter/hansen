var containerFadingOut = $('.fader-fade-out'),
	containerFadingIn = $('.fader-fade-in');

$(window).on('scroll', function(){
	var scrollPosition = $(this).scrollTop();
	containerFadingOut.css({'opacity' : (1 - scrollPosition/containerFadingOut.height()/2)});
	containerFadingIn.css({'opacity' : (0 + scrollPosition/containerFadingIn.height())});
});