$(function() {
	$.ajax({
		url: "https://bitbucket.org/eltibouron/seriesaddictstatic/raw/afca5f7ebeb53e9a90b8a8193d529424ff8747af/CHANGELOG",
		type: "get",
		success: function(res) {
			if (res.responseText.length > 0) {
				var html = [];
				$.each($(res.responseText).children(), function(i, versionNode) {
					var version = $(versionNode);
					html.push("<h3>Version " + version.attr('code') + " (" + version.attr('date') + ")</h3>");
					
					if (version.children().size() > 0) {
						html.push("<ul>");
						$.each(version.children(), function (j, changeNode) {
							var text = null;
							var className = null;
							var prefix = null;
							var isPremium = false;
							var change = $(changeNode);
							
							if (change.attr('premium') == 'true') {
								isPremium = true;
							}
							
							if (change.is('add')) {
								className = " label-info";
								prefix = "Ajout";
							} else if (change.is('update')) {
								className = "";
								prefix = "Mise à jour";
							} else if (change.is('bugfix')) {
								className = ' label-important';
								prefix = 'Correction de bug';
							}
							
							html.push(
								'<li>' +
								(className != null 
									? '<span class="label' + className + '">' + prefix + '</span> ' + (isPremium ? '<span class="label label-inverse">Fonctionnalité premium</span> ' : '')
									: ""
								) +
								change.html() + 
								'</li>'
							);
						});
						html.push("</ul>");
					}
				});
				$('#changelog .container').html(html.join("\n"));
			} else {
				$('#changelog .container').html("<h3>Impossible de récupérer le changelog. Veuillez recharger s'il vous plait.</h3>");
			}
			$('#changelog .container').removeClass('loading-changelog');
		},
		error: function(xhr, status, error) {
			$('#changelog .container').html("<h3>Impossible de récupérer le changelog. Veuillez recharger s'il vous plait.</h3>").removeClass('loading-changelog');
		}
	});
});