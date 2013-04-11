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
		url: "https://api.bitbucket.org/1.0/repositories/eltibouron/seriesaddictstatic/raw/default/CHANGELOG",
		type: "get",
		success: function(res) {
			if (res.responseText.length > 0) {
				var html = [];
				var xml = $.parseXML(res.responseText);
				$.each($(xml).find('changelog').children(), function(i, versionNode) {
					var version = $(versionNode);
					var code = version.attr('code');
					var date = version.attr('date');
					var hash = "v" + code.replace(/\./g, "_");
					
					html.push(
						"<h3 id=\"" +
						hash +
						"\">Version " +
						code +
						" (" +
						date +
						")</h3>"
					);
					
					if (version.children().size() > 0) {
						html.push("<ul>");
						$.each(version.children(), function (j, changeNode) {
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
								change.text() + 
								'</li>'
							);
						});
						html.push("</ul>");
					}
				});
				$('#changelog .container').html(html.join("\n"));
				$('#changelog .container').find("h3").addAnchor("Lien vers cette version");
				
				var hash = document.location.hash;
				if (hash != undefined && hash.length > 0) {
					var top = $(hash).offset().top - 60;
					$('html, body').animate({ scrollTop: top }, 700);
				}
			} else {
				$('#changelog .container').html("<h3>Impossible de récupérer le changelog. Veuillez recharger s'il vous plait.</h3>");
			}
			$('#changelog .container').removeClass('loading-page');
		},
		error: function(xhr, status, error) {
			$('#changelog .container').html("<h3>Impossible de récupérer le changelog. Veuillez recharger s'il vous plait.</h3>").removeClass('loading-page');
		}
	});
});