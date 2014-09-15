/*globals javascripture, bible*/
javascripture.api.reference = {
	getThreeChapters: function( reference ) {
		var testament = this.getTestament( reference.book );

		var result = { reference: reference };

		reference.rightData = reference.rightVersion;
		reference.leftData = reference.leftVersion;
		if ( "original" === reference.rightVersion ||  "lc" === reference.rightVersion ) {
			reference.rightData = testament;
		}

			if ( "original" === reference.leftVersion || "lc" === reference.leftVersion ) {
				reference.leftData = testament;
			}
console.log( result );
		var self = this,
			book = reference.book,
			prev = self.getOffsetChapter( reference, -1 ),
			next = self.getOffsetChapter( reference, 1 );

		if ( prev.book ) {
			reference.prev = prev;
		}
		if ( next.book ) {
			reference.next = next;
		}

		if( javascripture.data.hebrew[book] ) {
			result.testament = 'hebrew';
		} else {
			result.testament = 'greek';
		}

		result.chapters = [];

		//add the previous chapter if it exists
		if ( prev.book ) {
			result.chapters.push( javascripture.api.reference.getChapterData( prev ) );
		}

		result.chapters.push( javascripture.api.reference.getChapterData( reference ) );
		console.log( result );
		//add the next chapter if it exists
		if ( next.book ) {
			result.chapters.push( javascripture.api.reference.getChapterData( next ) );
		}

		return result;
	},
	getTestament: function( book ) {
		if( javascripture.data.hebrew[ book ] ) {
			return 'hebrew';
		} else {
			return 'greek';
		}
	},
	getChapterData: function( reference ) {
		var book = reference.book,
			chapter = reference.chapter,
			chapterInArray = chapter - 1,
			result = {},
			testament = this.getTestament( book );

		if ( javascripture.data[ reference.rightData ][ book ][ chapterInArray ] ) {
			result.right = javascripture.data[ reference.rightData ][ book ][ chapterInArray ];

			if( javascripture.data[ reference.leftData ][ book ] && javascripture.data[ testament ][ book ][ chapterInArray ] ) {
				result.left = javascripture.data[ reference.leftData ][ book ][ chapterInArray ];
			}
		}
		return result;
	},
	getOffsetChapter: function ( reference, offset) {
		var book = reference.book,
			chapter = reference.chapter,
			offsetChapter = {
				leftData: reference.leftData,
				rightData: reference.rightData
			},
			offsetChapterNumber = parseInt(chapter, 10) + offset,
			offsetNumberJavascript = offsetChapterNumber - 1,
			offsetBook;
		if ( javascripture.data[reference.rightData][book] && javascripture.data[reference.rightData][book][offsetNumberJavascript] !== undefined) {
			offsetChapter.book = book;
			offsetChapter.chapter = offsetChapterNumber;
		} else {
			//get the offset book
			bible.Data.books.forEach( function ( loopBookArray, index ) {
				if (loopBookArray[0] === book) {
					offsetBook = index + offset;
					if (bible.Data.books[offsetBook] !== undefined) {
						offsetChapter.book = bible.Data.books[offsetBook][0];
						//only supports offsets of 1 or -1. to make it work with bigger values this will have to change
						if (offset > 0) {
							offsetChapter.chapter = 1;
						} else {
							offsetChapter.chapter = bible.Data.verses[offsetBook].length;
						}
					}
				}
			} );
		}
		return offsetChapter;
	}
};
