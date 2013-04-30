/*global define, debug*/
define(['jquery', 'search', 'wordFamilies', 'translateLiterally', 'ba-debug'], function ($, search, wordFamilies, translateLiterally, debug) {
	"use strict";
	$.widget('javascripture.wordInterface', {
		_init: function () {
			if ( this.resultsAreAlreadyOnPage() )
				return;
			console.log(this.options);
			var references = search.getReferences(this.options);
			console.log(references);
			this.addReferencesToPage(references);
		},
		addReferencesToPage: function (references) {
			var self = this,
				parentElement = self.element.find('.panel-inner'),
				content = self.createListView(references, this.options.lemma),
				className = this.options.lemma + ' ' + wordFamilies.getFamily(this.options.lemma);
			if (this.options.lemma) {
				className += ' transparent';
			}

			var collapsibleElement = self.createCollapsible(
				this.options.lemma,
				content,
				this.getIdFromOptions(),
				this.getTitleFromOptions(),
				references.length,
				className
			);
			
			$('#results').find('[data-role=collapsible]').trigger('collapse')
			$('#results').append(collapsibleElement).find('[data-role=collapsible]').collapsible({
				create: function( event, ui ) {
					var referenceThatTriggeredSearchLink = self.getReferenceLinkObject(self.options.referenceThatTriggeredSearch, self.options.termThatTriggeredSearch);
					referenceThatTriggeredSearchLink.closest('[data-role=collapsible]').trigger('expand');
					//add the class to highlight - should be absctracted
					console.log(referenceThatTriggeredSearchLink);
					referenceThatTriggeredSearchLink.addClass('ui-btn-active').closest('ol').scrollTo(referenceThatTriggeredSearchLink);		
				}
			});
			$('#results').find('[data-role=button]').button();
			$('html').addClass(this.options.lemma);

/*			setTimeout(function () {//use deferred and promise
			}, 1000);
*/
		},
		createCollapsible: function (term, content, id, headingText, number, className) {
			var self = this,
				markup = '';
			markup += '<div class="collapsible-wrapper" id="' + id + '">';
			markup += '<div data-role="collapsible" class="word-list" data-collapsed="false" data-inset="false" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">';
			markup += '<h3 class="' + className + '">' + headingText + '</h3>';
			markup += content;
			markup += '</div>';
			markup += '<div class="controlgroup ui-li-has-count">';
			markup += '<a data-role="button" data-icon="delete" data-iconpos="notext" data-word="' + term + '" class="deleteWord">Delete</a>';
			if (number !== undefined) {
				markup += '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">' + number + '</span>';
			}
			markup += '</div>';
			markup += '</div>';
			return markup;
		},
		createListView: function (references, term) {
			var self = this,
				markup = '';
			markup += '<ol data-role="listview" data-mini="true">'; //take out split list data-split-icon="info" data-split-theme="d">';
			$.each(references, function (key, reference) {
				markup += '<li>';
				markup += '<a href="#reference?book=' + reference.book + '&chapter=' + reference.chapter + '&verse=' + reference.verse + '" class="referenceLink" data-transition="none" id="' + self.getReferenceLinkIdFromArray(reference, term) + '">' + reference.book + ' ' + reference.chapter + ':' + reference.verse + '</a>';
				/* hide split view markup += '<a data-language="' + reference[4] + '"';
				if (reference[5] !== undefined) {
					if (reference[5].lemma !== undefined) {
						markup += ' data-lemma="' + reference[5].lemma + '"';
					}
					if (reference[5].morph !== undefined) {
						markup += ' data-lemma="' + reference[5].morph + '"';
					}
				}
				markup += ' class="wordDetails" data-icon="info">Info</a>';*/
				markup += '</li>';
			});
			markup += '</ol>';
			return markup;
		},
		getReferenceLinkObject: function (reference, term) {
			var id = this.getReferenceLinkId(reference, term);
			return $('#' + id);
		},
		getReferenceLinkId: function (reference, term) {
			return (reference + '_link_' + term).toLowerCase();
		},
		getReferenceLinkIdFromArray: function (referenceObject, term) {
			var referenceId = referenceObject.book + '_' + referenceObject.chapter + '_' + referenceObject.verse;
			return this.getReferenceLinkId(referenceId, term);
		},
		resultsAreAlreadyOnPage: function () {
			var idFromOptions = this.getIdFromOptions()
			if ( $('#' + idFromOptions).length > 0 ) {
				return true;
			}
			return false;
		},
		getIdFromOptions: function () {
			var id = '';
			id += this.options.word + '_';
			id += this.options.lemma + '_';
			id += this.options.morph.replace(/ /g, '_').replace(/\*/g, '_').replace(/\./g, '_').replace(/\(/g, '_').replace(/\)/g, '_');
			console.log(this.options.morph);
			return id;
		},
		getTitleFromOptions: function () {
			var title = '';
			if (this.options.word != undefined) {
				title += this.options.word + ' ';
			}
			if (this.options.lemma != undefined) {
				title += this.options.lemma + ' ' + translateLiterally.getWord(this.options.lemma) + ' ';
			}
			if (this.options.morph != undefined) {
				title += this.options.morph + ' ';
			}
			return title;
		}
	});
	$(document).on('click', '.deleteWord', function (event) {
		event.preventDefault();
		event.stopPropagation();
		var $this = $(this),
			word = $this.data('word'),
			$parent = $this.closest('.collapsible-wrapper');
		console.log(word);
		$('html').removeClass(word);
		$parent.remove();
	});
	var words = '#reference-panel .word';
	$(document).on('vmouseover', words, function () {
		var word = $(this).data('family');
		$('body').addClass(word);
	});
	$(document).on('vmouseout', words, function () {
		var word = $(this).data('family');
		$('body').removeClass(word);
	});
	$(document).on('vclick', words, function () {
		var data = $(this).data();
		if (event.altKey) {
			$('#wordDetails').wordDetails(data);
		} else {
			var lemmas = $(this).data('lemma').split(' ');
			for( var lemmaKey in lemmas ) {
				data.word = '';
				data.morph = '';
				data.referenceThatTriggeredSearch = $(this).closest('li').attr('id');
				data.termThatTriggeredSearch = lemmas[lemmaKey];
				data.lemma = lemmas[lemmaKey];
				$('#results').wordInterface(data);
			}
		}
	});
	$(document).on('taphold', words, function () {
		var data = $(this).data();
		data.history = 'false';
		console.log(data);
		$('#wordDetails').wordDetails(data);
	});

	$(document).on('vclick', '#wordDetails .word', function () {
		var data = $(this).data();
		$('#results').wordInterface(data);
	});
	$.fn.serializeObject = function () {
		var o = {},
			a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	$('form.search').submit(function (event) {
		event.preventDefault();
		$('.search-button').text('Searching...');
		$('#results').wordInterface($(this).serializeObject());
		return false;
	});
	$(document).on('click', '.morphSearch', function (event) {
		event.preventDefault();
		var data = $(this).data();
		$('#results').wordInterface(data);
	});
});
