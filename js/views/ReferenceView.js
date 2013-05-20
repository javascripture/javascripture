// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/ReferenceModel" ], function( $, Backbone, ReferenceModel ) {

    // Extends Backbone.View
    var ReferenceView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

	        var self = this; 

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Category models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );

            // Renders the view's template inside of the current listview element
            this.$el.find("#reference-panel").html(this.template);

            // Maintains chainability
            return this;

        },

		loadPreviousChapter: function () {
//			console.log(this.options);
			console.log(this.collection.previous());

		},

		loadNextChapter: function () {
			
		},

		removeNextChapter: function () {
			
		},

		scrollToCurrentChapter: function () {
			
		},


        
		loadChapterBefore: function () {
			if (this.loadChapter('prev')) {
				this.removeChapter('next');
				this.scrollToChapter('current');
			}
		},
		loadChapterAfter: function () {
			this.loadChapter('next');
		},

		loadChapter: function (position) {
			var chapterObject = this.element.data(position),
				book,
				chapter,
				chapterLoaded = false;
			if (chapterObject.book !== undefined && chapterObject.chapter !== undefined) {
				book = chapterObject.book;
				chapter = chapterObject.chapter;
				if (position === 'prev') {
					this.setOffsetChapterData(book, chapter, 'prev', -1);
					this.setOffsetChapterData(book, chapter, 'current', 1);
					//update url?
					this.element.prepend(this.createMarkup(book, chapter));
				} else if (position === 'next') {
					this.setOffsetChapterData(book, chapter, 'next', 1);
					this.setOffsetChapterData(book, chapter, 'current', -1);
					//update url?
					this.element.append(this.createMarkup(book, chapter));
				}
				$(document).trigger('createWidgets');
				chapterLoaded = true;
			}
			return chapterLoaded;
		},

		removeChapter: function (position) {
			var selector, chapter, chapterObject;
			if (position === 'next') {
				selector = 'last';
			}
			if (position === 'prev') {
				selector = 'first';
			}
			chapter = this.element.find('.' + this.options.chapterWrapperClass + ':' + selector + '-child');
			chapterObject = {
				book: chapter.data('book'),
				chapter: chapter.data('chapter')
			};
			//update the prev/next chapter data so that we don't get out of sync
			this.setChapterData(chapterObject, position);
			chapter.remove();
		},

		scrollToChapter: function (chapter, position) { //needs refactoring
			var chapterObject = this.element.data(chapter),
				verse = 1,
				offset = -108,
				verseHeight;
			if (position === 'end') {
				//get the last verse
				$.each(bible.Data.books, function (index, loopBookArray) {
					if (loopBookArray[0] === chapterObject.book) { //this is very labour intensive
						verse = bible.Data.verses[index][chapterObject.chapter - 1];
					}
				});
				verseHeight = $('#' + this.referenceToId(chapterObject.book, chapterObject.chapter, verse)).height();
				offset = offset - $(window).height() - verseHeight;
			}
			this.scrollToReference(chapterObject.book, chapterObject.chapter, verse, offset);
		},

		scrollToReference: function (book, chapter, verse, offset) {
			var verseSelector = '#' + this.referenceToId(book, chapter, verse);
			debug.debug(verseSelector);
			$('body').scrollTo($(verseSelector), { offset: offset });
		},
		
		
    } );

    // Returns the View class
    return ReferenceView;

} );