/* Mobile Navigation */
$('.mobile-navigation__label').bind('click', function () {
	$('body').addClass('show-mobile-navigation');
});
$('.navigation__close').bind('click', function () {
	$('body').removeClass('show-mobile-navigation');
});

// Header-Slider
$('.header-images--slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
	arrows: false,
	fade: true,
});

/* Mobile Navigation Fix */
$(window).resize(function () {
	if ($(window).width() > 600) {
		$('body').removeClass('show-mobile-navigation');
	}
});

// Airport Status
function formatDate(date) {
	var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	var year = date.getFullYear();
	var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var date = day + '.'  + month + '.' + year;
	var time = hours + ':' + minutes;
	return date + ' ' + time;
}

function fetchAirportStatus() {
	// Only if airport status is embedded
	if ($('#airport-status').length) {
		$.get('https://api.mfgt.ch/api/v1/aerodromestatus', function( data ) {
			var last_update_by = new Date(data.last_update_date);
			$('#airport-status').addClass('airport-' + data.status);
			$('#airport-status__message').html(data.message);
			$('#airport-status__last-update-date').html(formatDate(last_update_by));
			$('#airport-status__last-updated-by').html(data.last_update_by);
		});
	} else {
		$('#airport-status').addClass('airport-error');
		$('#airport-status__message').html('Status konnte nicht geladen werden');
	}
};

$(document).ready(function(){
	fetchAirportStatus();
});
