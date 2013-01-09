$(function() {
	// Init carousel first caption
	carouselSlideIn();
	
	// Init carousel
	$('.carousel .item').each(function(index) {
		var a = $('<a>').attr('href', '#').click(function(e) {
			$('.carousel').carousel(index); 
			e.preventDefault();
		});
		if ($(this).hasClass('active')) {
			a.addClass('active');
		}
		$('#carousel-nav p').append(a);
	});
	$('.carousel').carousel({
		interval: 8000,
		pause: "hover"
	});
	$('.carousel').bind('slide', function() {
		$('#carousel-caption h3, #carousel-caption p').fadeOut();
	});
	$('.carousel').bind('slid', function() {
		carouselSlideIn();
	});
	
	// Init scroller
	$('.scroller').click(function(){
		var section = $($(this).data("section"));
		var top = section.offset().top;
		$("html, body").animate({ scrollTop: top }, 700);
		return false;
	});
	$('a.brand').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 700);
		return false;
	});
	
	// Init tooltips
	$('[rel=tooltip]').tooltip();
	
	function carouselSlideIn() {
		var selector = $('#carousel-nav p a').get($('#device-carousel div.active').index());
		$('#carousel-nav p a').removeClass('active');
		$(selector).addClass('active');
		$('#carousel-caption h3').html($('#device-carousel div.active img').attr('alt'));
		$('#carousel-caption p').html($('#device-carousel div.active p').html());
		$('#carousel-caption h3, #carousel-caption p').fadeIn();
	}
});

