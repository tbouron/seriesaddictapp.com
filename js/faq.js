$(function() {
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
					
					html.push("<h3>" + question.text() + "</h3>");
					html.push("<p>" + answer.text() + "</p>");
				});
				$('#faq .container').html(html.join("\n"));
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