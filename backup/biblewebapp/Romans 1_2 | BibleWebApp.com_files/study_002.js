
$(function() {
	// utility method to parse out the lang attribute for words
	// ex: <span class="w" lang="sn:G1104|fr:106|mo:N-MNS">
	function parseLang(lang) {
		var data = {};
		var items = new String(lang).split('|');
		for (var i = 0; i < items.length; i++) {
			var parts = items[i].split(':');
			data[parts[0]] = parts[1];
		}
		return data;
	}
	bible.utility.parseLang = parseLang;

	// create tooltip
	var tooltip = $('<div id="tooltip">' +
						'<span class="tooltip-close">Close</span>' +
						'<div class="tooltip-header"></div>' +
						'<div class="tooltip-content"></div>');
	$('body').append(tooltip);
	tooltip.find('.tooltip-close').click(function() { tooltip.hide(); });

	function positionTooltip(el) {
		// position the tooltip
		var verticalMarginFromWord = 22;
		var horizontalMarginFromWord = 5;

		var portHeight = $(window).height();
		var portWidth = $(window).width();

		var top = el.position().top;
		var left = el.position().left;

		// make sure it doesn't go below or above
		if (top + verticalMarginFromWord + tooltip.height() + 50 < portHeight)
			top = top + verticalMarginFromWord;
		else
			top = top - tooltip.height() - verticalMarginFromWord;

		if (left + horizontalMarginFromWord + tooltip.width() < portWidth)
			left = left + horizontalMarginFromWord;
		else
			left = left - tooltip.width();


		tooltip.css({ top: top, left: left, display: 'block' });
	}

	function wordClick(e) {

		var word = $(this);
		if (word.hasClass('word-selected')) {
			tooltip.hide();
			word.removeClass('word-selected');
		} else {
			$('.word-selected').removeClass('word-selected');
			word.addClass('word-selected');

			tooltip.find('div.tooltip-content').html('<div class="loading">loading</div>');

			var data = parseLang(word.attr('lang'));

			if (typeof (data['sn']) != 'undefined') {
				if (data['sn'] == '' || data['sn'] == 'H0000' || data['sn'] == 'H0')
					return;

				var sn = data['sn'];
				sn = sn.split(',')[0];

				tooltip.find('div.tooltip-header').html('<span class="sn">' + sn + '<span>: ');

				$.get(
				'/assets/lex/strongs/' + sn + '.html',
				'html',
				function(data, textStatus) {
					// remove loading notice
					tooltip.find('div.loading').remove();

					var lexEntry = $(data);

					// take off the title and put it on the top
					tooltip.find('div.tooltip-header').find('div.lex-title').remove();
					tooltip.find('div.tooltip-header').append(
						lexEntry.find('div.lex-title')
					);


					tooltip.find('div.tooltip-content').append(lexEntry);

					tooltip.find('.lex-frequency').click(function() {
						tooltip.hide();
						bible.utility.loadUsage(sn);
					});

					positionTooltip(word);
				}
			);
			}
			if (typeof (data['mo']) != 'undefined') {

				tooltip.find('div.tooltip-content').prepend(
				'<div class="morphology">' + bible.languages.Greek.getMorphology(data['mo']) + '</div>');
			}


			positionTooltip(word);
		}
	}

	$('mark').live('click', wordClick);
	$('mark').live('mouseover', function() {
		$(this).addClass('word-over'); /* tooltip.hide(); */$('.word-selected').removeClass('word-selected');
	});
	$('mark').live('mouseout', function() {
		$('mark.word-over').removeClass('word-over');
	});

	var wordMatching = $('#word-matching').is(':checked');
	$('#word-matching').change(function() { wordMatching = $(this).is(':checked'); });

	// verse higlighting
	$('span.verse').live('mouseover', function() {
		if (!wordMatching) return;
		$('span.verse[rel=' + $(this).attr('rel') + ']').addClass('verse-over');
	});
	$('span.verse').live('mouseout', function() {
		if (!wordMatching) return;
		$('span.verse').removeClass('verse-over');
	});


	// highlight matching
	$('mark').live('mouseover', function() {
		if (!wordMatching) return;

		// remove-all
		$('span.word-over').removeClass('word-over');

		var word = $(this);
		var verse = word.closest('span.verse');

		var sn = parseLang(word.attr('lang'))['sn'];
		if (typeof (sn) != null) {
			var sna = sn.split(',');

			for (var i in sna) {
				// skip article in multiples
				if (sna.length > 1 && sna[i] == 'G3588')
					continue;

				$('span.verse[rel=' + verse.attr('rel') + '] mark[lang*=' + sna[i] + ']').addClass('word-over');

			}
		}

	});

	// highlight matching
	$('span.note, span.cf').live('click', function(e) {

		e.stopPropagation();
		e.preventDefault()


		var note = $(this);
		var def = note.find('dfn');


		//if (def.html() != '') {
		tooltip.find('div.tooltip-header').html('Note');
		tooltip.find('div.tooltip-content').html(def.html());

		positionTooltip(note);
		//}

		return false;

	});

	// highlight matching
	$('span.note').live('mouseout', function() {

		//tooltip.hide();

	});

});
// END: word over
