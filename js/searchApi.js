	var searchApi = {
		language: { //helper object to access different languages
				english: bibleObject,
				greek: greekObject,
				hebrew: hebrewObject
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
			this.lookForTerm(parameters);
            return this.results.references;
		},
        doesDataMatchTerm: function(type, data, term) {
			data = data.toLowerCase();
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
        	//skip this for lemma
        	if ( type !== 'lemma' ) {
	            if ( data.search( term ) > -1 ) {
    	        	return true;
        	    }
            }
            return false;
        },
        resetMatches: function () {
	        this.results.matches = {};
        },
        addReference: function (bookName, chapterNumber, verseNumber) {
			this.results.references.push({
                book: bookName,
                chapter: chapterNumber + 1,
                verse: verseNumber + 1
            });
        },
		lookForTerm: function (parameters) {
			var self = this;
			var dataSource = this.language[parameters.language]; //work out what language to search in
			self.results.references = [];
			self.resetMatches();

			//use JS for loop with caching: for (var i = 0, l = myArray.length; i < l; i++) {}
			for( var bookName in dataSource ) {
				book = dataSource[ bookName ];
				$( document ).trigger( 'loading', 'searching ' + bookName );

				for (var chapterNumber = 0, bookLength = book.length; chapterNumber < bookLength; chapterNumber++) {
					chapter = book[ chapterNumber ];

					if (parameters.range === 'chapter' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
						self.resetMatches();
					}
					for (var verseNumber = 0, chapterLength = chapter.length; verseNumber < chapterLength; verseNumber++) {
						verse = chapter[ verseNumber ];
						if (parameters.range === 'verse' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
							self.resetMatches();
						}
						
						for (var wordNumber = 0, verseLength = verse.length; wordNumber < verseLength; wordNumber++) {
							var wordObject = verse[ wordNumber ];
							if (parameters.range === 'word' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
								self.resetMatches();
							}
							var termsLength = 0,
								matchesLength,
								termString;

							for( var typeKey in self.types ) {
								var type = self.types[typeKey];
									termString = parameters[type];

								if ( termString !== undefined && termString !== '') {
									if ( wordObject !== undefined && typeof wordObject[typeKey] !== 'undefined' ) { //sometimes wordObjects are undefined in hebrew
										var terms = termString.split(' '),
											termsLength = termsLength + terms.length,
											matchesLength = 0;

										$.each(terms, function (key, term) {
											if ( self.doesDataMatchTerm(type, wordObject[typeKey], term) ) {
												if (parameters.clusivity === 'exclusive' ) {
													self.results.matches[term] = true;
												} else {
													self.addReference(bookName, chapterNumber, verseNumber);
												}
											}
										});
									}
								}
							}

							//terms are combined for exclusive searches here							
							if (parameters.clusivity === 'exclusive' ) {
								matchesLength = 0;
								$.each(self.results.matches, function (term) {
									matchesLength++;
								});
								if ( matchesLength >= termsLength) {
									self.addReference(bookName, chapterNumber, verseNumber);
									self.resetMatches(); //not sure if resetting is the right thing to do here - need to work out how to count matches in the same verse mulipule times
								}
							}



						}
					}
				}
			}

		},
		standarizeWordEndings: function (word) {
			return word.replace(/ם/gi, 'מ');
		},
		getTranslations: function ( lemma ) {
			
		}
	};