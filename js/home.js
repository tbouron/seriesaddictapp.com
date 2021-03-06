$(function() {
	initDom();
	initTriggers();
	initComponents();
	
	$.ajax({
		url: "https://api.bitbucket.org/1.0/repositories/eltibouron/seriesaddictstatic/raw/default/CHANGELOG",
		type: "get",
		success: function(res) {
			if (res.responseText.length > 0) {
				var version = $(res.responseText).children().first();
				$("#last-version").append(version.attr('code') + " (" + version.attr('date') + ")");
			} else {
				$("#last-version").append("Inconnue")
			}
			$("#last-version").removeClass("loading-version");
		},
		error: function(xhr, status, error) {
			$("#last-version").append("Inconnue").removeClass("loading-version");
		}
	});
	
	function initDom() {
		var caption = $('<div>')
			.attr('id', 'carousel-caption')
			.append($('<div>').addClass('divinner')
				.append($('<h3>'))
				.append($('<p>').addClass('justify'))
			);
		var nav = $('<div>')
			.attr('id', 'carousel-nav')
			.append($('<p>'));
			
		$('#device-carousel').parent().append(caption).append(nav);

		$('.carousel .item').each(function(index) {
			var a = $('<a>').attr('href', '#').click(function(e) {
				$('.carousel').carousel(index); 
				e.preventDefault();
			}).tooltip({
				placement: 'bottom',
				title: $(this).find('img').attr('alt')
			});
			if ($(this).hasClass('active')) {
				a.addClass('active');
			}
			$('#carousel-nav p').append(a);
		});

		if ($(window).width() >= 979) {
			triggerBigWidth();
		} else if ($(window).width() >= 768) {
			triggerMediumWidth(); 
		} else {
			triggerSmallWidth();
		}
		
		$('#articles li').css('cursor', 'pointer');
		$('#articles li').each(function(index) {
			if (index%2 == 0 && $(this).find('div.picture').size() > 0) {
				$(this).find('div.text').hide();
			} else {
				$(this).find('div.picture').hide();
			}
		});
	}
	
	function initTriggers() {
		// Responsive
		$(window).resize(function() {
			if ($(window).width() >= 979) {
				triggerBigWidth();
			} else if ($(window).width() >= 768) {
				triggerMediumWidth(); 
			} else {
				triggerSmallWidth();
			}
		});
		
		// Scroller
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
		
		// Article links
		$('#articles li').click(function(e) {
			window.location.href = $(this).find('a').attr('href');
		});
	}
	
	function initComponents() {
		
		// Carousel
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
		
		// Init carousel first caption
		carouselSlideIn();
		
		// Tooltips
		$('.link-tooltip').tooltip();
		
		// Init articles fade toggle
		setTimeout(function() {
			articlesFadeToggle(-1);
		}, 4000);
	}
	
	function triggerSmallWidth() {
		$('#device-carousel').removeClass('span4').addClass('span12');
		$('#carousel-caption').hide();
		$('#carousel-nav').removeClass('span4 span8').addClass('span12');
	}
	function triggerMediumWidth() {
		$('#device-carousel').removeClass('span12').addClass('span4');
		$('#carousel-caption').removeClass('span8').addClass('span6').show();
		$('#carousel-nav').removeClass('span8').addClass('span6');
	}
	function triggerBigWidth() {
		$('#device-carousel').removeClass('span12').addClass('span4');
		$('#carousel-caption').removeClass('span6').addClass('span8').show();
		$('#carousel-nav').removeClass('span6').addClass('span8');
	}
	
	function carouselSlideIn() {
		var selector = $('#carousel-nav p a').get($('#device-carousel div.active').index());
		$('#carousel-nav p a').removeClass('active');
		$(selector).addClass('active');
		$('#carousel-caption h3').html($('#device-carousel div.active img').attr('alt'));
		$('#carousel-caption p').html($('#device-carousel div.active p').html());
		$('#carousel-caption h3, #carousel-caption p').fadeIn();
	}
	
	function articlesFadeToggle(lastId) {
		var nb = $('#articles li').size();
		var i = Math.floor((Math.random() * nb));
		var elm = $('#articles li').get(i);
		
		while (lastId == i || $(elm).find('div.picture').size() == 0) {
			i = Math.floor((Math.random() * nb));
			elm = $('#articles li').get(i);
		}
		
		$(elm).find('div.text').fadeToggle();
		$(elm).find('div.picture').fadeToggle();
		
		setTimeout(function() {
			articlesFadeToggle(i);
		}, 4000);
	}
});

