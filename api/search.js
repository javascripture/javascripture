jQuery.fn.slowEach = function(array, interval, callback ) {
	if( ! array.length ) return;
	var i = 0;
	next();
	function next() {
		if( callback.call( array[i], i, array[i] ) !== false )
	    	if( ++i < array.length )
				setTimeout( next, interval );
			}
};

javascripture.api.search = {
	language: { //helper object to access different languages
		english: javascripture.data.english,
		greek: javascripture.data.greek,
		hebrew: javascripture.data.hebrew
	},
	books: {
		english: ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalm','Proverbs','Ecclesiastes','Song of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'],
		hebrew: ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalm','Proverbs','Ecclesiastes','Song of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'],
		greek: ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation']
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
		var self = this;
		self.parameters = parameters;
		console.log(parameters);
		var results = $.Deferred();
		results.references = [];
		this.lookForTerm( results );
		return results;
	},
    doesDataMatchTerm: function( type, data, term, strict ) {
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
		if ( type !== 'lemma' && ! strict ) {
			if ( data.search( term ) > -1 ) {
				return true;
			}
		}
        return false;
    },
    resetMatches: function () {
        this.results.matches = {};
    },
    addReference: function (bookName, chapterNumber, verseNumber, results ) {
		return results.references.push({
            book: bookName,
            chapter: chapterNumber + 1,
            verse: verseNumber + 1
        });
    },
	lookForTerm: function ( results ) {
		var self = this,
		    parameters = self.parameters;
		if ( 'undefined' === typeof parameters.language ) {
			parameters.language = self.inferLanguage( parameters );
		}
		var dataSource = this.language[parameters.language]; //work out what language to search in
		self.results.references = [];
		self.resetMatches();

		var booksToSearch = this.books[ parameters.language ];

		//some code duplication here, but this allows us to turn slowEach on and off. it's fast when it's turned off
		if ( $('#searchSpeed').length > 0 && $('#searchSpeed').val() > 1 ) {
			searchSpeed = $('#searchSpeed').val();
			jQuery.fn.slowEach( booksToSearch, searchSpeed, function( bookNumber, bookName ) {
				self.searchInABook( dataSource, bookName, results, bookNumber, booksToSearch );
			} );
		} else {
			booksToSearch.forEach( function( bookName, bookNumber ) {
				self.searchInABook( dataSource, bookName, results, bookNumber, booksToSearch );
			} );
		}
	},
	searchInABook: function( dataSource, bookName, results, bookNumber, booksToSearch ) {
		var self = this,
			parameters = self.parameters,
			book = dataSource[ bookName ];

		//work out how many terms there are
		var termsLength = 0;
		for( var typeKey in self.types ) {
			var type = self.types[typeKey];
				termString = parameters[type];

			if ( termString !== undefined && termString !== '') {
				var terms = termString.split(' ');
				termsLength = termsLength + terms.length;
			}
		}

		$( document ).trigger( 'loading', 'searching ' + bookName );

		book.forEach( function ( chapter, chapterNumber ) {

			if (parameters.range === 'chapter' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
				self.resetMatches();
			}
			chapter.forEach( function ( verse, verseNumber ) {
				if (parameters.range === 'verse' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
					self.resetMatches();
				}

				verse.forEach( function ( word, wordNumber ) {
					if (parameters.range === 'word' && parameters.clusivity === 'exclusive' ) { //only need to do this for exclusive searches
						self.resetMatches();
					}

					var matchesLength,
					    termString;

					//now loop through types
					self.types.forEach( function ( type, typeKey ) {
//							var type = self.types[typeKey];
							termString = parameters[type];

						if ( self.areTheTermStringAndWordObjectAreGoodToSearch( termString, word, typeKey ) ) {
							var terms = termString.split(' ');

							//for ( var termNumber = 0, allTermsLength = terms.length; termNumber < allTermsLength; termNumber++ ) {
							terms.forEach( function( term, termNumber ) {
								if ( self.doesDataMatchTerm(type, word[typeKey], term, parameters.strict ) ) {
									if (parameters.clusivity === 'exclusive' ) {
										self.results.matches[term] = true;
									} else {
										self.addReference(bookName, chapterNumber, verseNumber, results );
									}
								}
							} );
						}
					} );
					//terms are combined for exclusive searches here
					if (parameters.clusivity === 'exclusive' ) {
						matchesLength = 0;

						$.each(self.results.matches, function (key, term) {
							matchesLength++;
						});
						if ( matchesLength > 0 && matchesLength >= termsLength) {
							//console.log(matchesLength, termsLength);
							self.addReference(bookName, chapterNumber, verseNumber, results );
							self.resetMatches(); //not sure if resetting is the right thing to do here - need to work out how to count matches in the same verse mulipule times
						}
					}
				} );
			} );
		} );
		if (bookNumber === booksToSearch.length - 1 ) {
			results.resolve();
		}
	},
	standarizeWordEndings: function (word) {
		return word.replace(/ם/gi, 'מ');
	},
	getTranslations: function ( lemma ) {

	},
	inferLanguage: function( parameters ) {
		var language = 'english';
		if ( parameters.lemma.substr( 0,1 ) === 'H' ) {
			language = 'hebrew';
		}
		if ( parameters.lemma.substr( 0,1 ) === 'G' ) {
			language = 'greek';
		}
		return language;
	},
	areTheTermStringAndWordObjectAreGoodToSearch: function ( termString, wordObject, typeKey ) {
		return termString !== undefined && termString !== '' && wordObject !== undefined && typeof wordObject[typeKey] !== 'undefined'; //sometimes wordObjects are undefined in hebrew
	}
};