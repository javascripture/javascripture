/*globals javascripture bible*/
javascripture.api.reference = {
	getThreeChapters: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			prev = self.getOffsetChapter( reference, -1 ),
			next = self.getOffsetChapter( reference, 1 ),
			result = {};

		if ( prev.book ) {
			result.prev = prev;
		}
		if ( next.book ) {
			result.next = next;
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

		//add the next chapter if it exists
		if ( next.book ) {
			result.chapters.push( javascripture.api.reference.getChapterData( next ) );
		}
		return result;
	},
	getChapterData: function( reference ) {
		var self = this,
		    book = reference.book,
		    chapter = reference.chapter,
		    verse = reference.verse,
			chapterInArray = chapter - 1,
			result = {};

		if( javascripture.data.hebrew[book] ) {
			testament = 'hebrew';
		} else {
			testament = 'greek';
		}

		if ( javascripture.data[reference.version][book][chapterInArray] ) {
			 result.translation = javascripture.data[reference.version][book][chapterInArray];
			 if( javascripture.data[ testament ][book] && javascripture.data[ testament ][book][chapterInArray] ) {
			 	result.original = javascripture.data[ testament ][book][chapterInArray];
			 }
		}
		return result;
	},
	getOffsetChapter: function ( reference, offset) {
		var book = reference.book,
		    chapter = reference.chapter,
		    offsetChapter = { version: reference.version },
			offsetChapterNumber = parseInt(chapter, 10) + offset,
			offsetNumberJavascript = offsetChapterNumber - 1,
			offsetBook;
		if ( javascripture.data[reference.version][book] && javascripture.data[reference.version][book][offsetNumberJavascript] !== undefined) {
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
