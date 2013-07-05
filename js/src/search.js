/*global define*/
define(['jquery', 'english-ot', 'english-nt', 'hebrew', 'greek', 'ba-debug'], function ($, englishOt, englishNt, hebrew, greek) {
	var english = $.extend(englishOt, englishNt);
	var search = {
		parameters: { //deprecated
			
		},
		language: { //helper object to access different languages
				english: english,
				greek: greek,
				hebrew: hebrew
		},
		types: [
			'word',
			'lemma',
			'morph'
		],
		results: { //helper object for storing results
			references: [], //used to create an array of references
			matches: {} //used to keep track of which word has been matched when searching - for when you need to match more than one word
		},
		getReferences: function (parameters) {
			console.log(parameters);
			search.lookForTerm(parameters);
            return search.results.references;
		},
        doesDataMatchTerm: function(data, term) {
        	var data = data.toLowerCase(),
        	    term = term.toLowerCase();
        	if ( data === term ) { //exact match
        		return true;
        	}
        	/*this get very complex 
        	if (data.indexOf( ' ' + term + ' ') > -1 ) { //part of a string
	        	return true;
        	}
        	if (data.indexOf( ' ' + term + ',') > -1 ) { //part of a string
	        	return true;
        	}
        	if (data.indexOf( ' ' + term + '.') > -1 ) { //part of a string
	        	return true;
        	}
        	if (data.indexOf( ' ' + term + ';') > -1 ) { //part of a string
	        	return true;
        	}
        	if (data.indexOf( ' ' + term + ':') > -1 ) { //part of a string
	        	return true;
        	}
        	if (data.indexOf( term + ' ') === 0 ) { //start of a string
	        	return true;
        	}
        	if (data.indexOf( ' ' + term) === 0 ) { //start of a string
	        	return true;
        	}*/
            if ( data.search( term ) > -1 ) {
            	return true;
            }
            return false;
        },
        resetMatches: function () {
	        search.results.matches = {};
        },
        addReference: function (bookName, chapterNumber, verseNumber) {
			search.results.references.push({
                book: bookName,
                chapter: chapterNumber + 1,
                verse: verseNumber + 1
            });
        },
		lookForTerm: function (parameters) {
			var dataSource = search.language[parameters.language]; //work out what language to search in
			search.results.references = [];
			search.resetMatches();
			$.each(dataSource, function loopThroughBooks(bookName, book) {
				$.each(book, function loopThroughChapters(chapterNumber, chapter) {
					if (parameters.range === 'chapter' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
						search.resetMatches();
					}
					$.each(chapter, function loppThroughVerses(verseNumber, verse) {
						if (parameters.range === 'verse' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
							search.resetMatches();
						}
						$.each(verse, function (wordNumber, wordObject) {
							if (parameters.range === 'word' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
								search.resetMatches();
							}
							var termsLength = 0,
								matchesLength,
								termString;
						
							for( var typeKey in search.types ) {
								var type = search.types[typeKey];
									termString = parameters[type];
								if ( termString !== undefined && termString !== '') {
									if ( wordObject !== undefined && typeof wordObject[type] !== 'undefined' ) { //sometimes wordObjects are undefined in hebrew
										var terms = termString.split(' '),
											termsLength = termsLength + terms.length,
											matchesLength = 0;
	
	
										for (var termKey in terms) {
											var term = terms[termKey];
											if ( search.doesDataMatchTerm(wordObject[type], term) ) {
												if (parameters.clusivity === 'exclusive' ) {
													search.results.matches[term] = true;
												} else {
													search.addReference(bookName, chapterNumber, verseNumber);
												}
											}
										}
									}
								}								
							}

							//terms are combined for exclusive searches here							
							if (parameters.clusivity === 'exclusive' ) {
								matchesLength = 0;
								$.each(search.results.matches, function (term) {
									matchesLength++;
								});
								if ( matchesLength >= termsLength) {
									search.addReference(bookName, chapterNumber, verseNumber);
									search.resetMatches(); //not sure if resetting is the right thing to do here - need to work out how to count matches in the same verse mulipule times
								}
							}



						});
					});
				});
			});
		},
		standarizeWordEndings: function (word) {
			return word.replace(/ם/gi, 'מ');
		},
		getTranslations: function ( lemma ) {
			
		}
	};
	return search;
});
