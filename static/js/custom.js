/* Mobile Navigation 
$('#mobile-nav-button').bind('click', function () {
	$(this).toggleClass('active');
	$('#topnav').toggleClass('active');
}); */

$('.header-images--slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
	arrows: false,
});

/* Mobile Navigation Fix
$(window).resize(function () {
	if ($(window).width() > 600) {
		$('#mnav-wrapper').hide();
	}
}); */
