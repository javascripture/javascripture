$(function() {

	function highlightRare() {
		console.log('rare!');

		$('mark.rare-highlight').each(function() {
			$(this).css({ background: '' }).removeClass('rare-highlight');
		});

		var color = $('#rare-colors').val();
		var rules = $('#rare-options').val();

		if (color != '' && rules != '') {
			console.log('r', color, rules);
			var threshold = parseInt(rules);

			$('mark').each(function() {
				var w = $(this);
				var l = bible.utility.parseLang(w.attr('lang'));
				var f = l['fr'];
				if (typeof f != 'undefined') {
					if (parseInt(f) <= threshold) {
						w.addClass('rare-highlight').css({ background: color });
					}
				}
			});
		}

	}
	$('#rare-options, #rare-colors').change(highlightRare);

	function highlightNouns() {
		console.log('nouns!');

		$('mark.noun-highlight').each(function() {
			$(this).css({ background: '' }).removeClass('noun-highlight');
		});

		var color = $('#noun-colors').val();
		var rules = $('#noun-options').val();

		if (color != '' && rules != '') {
			console.log('n', color, rules);

			$('mark[lang*=mo:' + rules + ']').each(function() {
				$(this).addClass('noun-highlight').css({ background: color });
			});
		}

	}
	$('#noun-options, #noun-colors').change(highlightNouns);

	function highlightVerbs() {
		console.log('verbs!');

		$('mark.verb-highlight').each(function() {
			$(this).css({ background: '' }).removeClass('verb-highlight');
		});

		var color = $('#verb-colors').val();
		var rules = $('#verb-options').val();

		if (color != '' && rules != '') {
			console.log('v', color, rules);

			$('mark[lang*=mo:' + rules + ']').each(function() {
				$(this).addClass('verb-highlight').css({ background: color });
			});
		}

	}
	$('#verb-options, #verb-colors').change(highlightVerbs);


});
