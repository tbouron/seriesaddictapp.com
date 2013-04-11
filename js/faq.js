$(function() {
	$.fn.addAnchor = function(title) {
		title = title || _("Lien");
		return this.filter("*[id]").each(function() {
			$("<a class='anchor'> \u00B6</a>").attr("href", "#" + this.id)
				.attr("title", title).appendTo(this);
			$(this).hover(
				function () {
					$(this).find("a.anchor").show();
				},
				function () {
					$(this).find("a.anchor").hide();
				}
			);
		});
	};
	
	$.ajax({
		url: "https://api.bitbucket.org/1.0/repositories/eltibouron/seriesaddictstatic/raw/default/FAQ",
		type: "get",
		success: function(res) {
			if (res.responseText.length > 0) {
				var html = [];
				var xml = $.parseXML(res.responseText);
				$.each($(xml).find('faq').children(), function(i, sectionNode) {
					var question = $(sectionNode).find('question');
					var answer = $(sectionNode).find('answer');
					
					html.push("<h3 id=\"q" + (i + 1) + "\">" + question.text() + "</h3>");
					html.push("<p>" + answer.text() + "</p>");
				});
				$('#faq .container').html(html.join("\n"));
				$('#faq .container').find("h3").addAnchor("Lien vers cette question");
				
				var hash = document.location.hash;
				if (hash != undefined && hash.length > 0) {
					var top = $(hash).offset().top - 60;
					$('html, body').animate({ scrollTop: top }, 700);
				}
			} else {
				$('#faq .container').html("<h3>Impossible de récupérer la FAQ. Veuillez recharger s'il vous plait.</h3>");
			}
			$('#faq .container').removeClass('loading-page');
		},
		error: function(xhr, status, error) {
			$('#faq .container').html("<h3>Impossible de récupérer la FAQ. Veuillez recharger s'il vous plait.</h3>").removeClass('loading-page');
		}
	});
});