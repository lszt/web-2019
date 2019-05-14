/* Mobile Navigation */
$('.mobile-navigation__label').bind('click', function () {
	console.log('addClass');
	$('body').addClass('show-mobile-navigation');
});

$('.navigation__close').bind('click', function () {
	$('body').removeClass('show-mobile-navigation');
});

$('.header-images--slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
	arrows: false,
	fade: true,
});

/* Mobile Navigation Fix */
$(window).resize(function () {
	if ($(window).width() > 600) {
		$('body').removeClass('show-mobile-navigation');
	}
});
