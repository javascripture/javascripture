/*global colors*/
( function ( $ ) {
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

	function createSearchReferencesPanel( data ) {
		var startDate = new Date();
		var references = '';
//		var strongsNumberArray = new Array();
//		var searchType = $('#searchSelect').val();
//		var wordString = "";
		var strongsNumberAsId = data.lemma.replace(/ /gi,"");
		var trackingBoxId = createTrackingBoxId( data, '_' );
		createTrackingBox( data );
		strongsNumberArray = data.lemma.split(' ');
		
		//collapse all the others
		$('#referenceTracking .collapsable').addClass('closed');
		$('#referenceTracking #' + trackingBoxId).removeClass('closed');
		
		searchApi.getReferences(data);
		searchApi.deferred.done( function(){
			var referenceArray =  searchApi.results.references;
	
			references += '<form><ol class="references">';
			var wordCount = 0;
	
			var searchObject = javascripture.data.kjv;
			if($("select[name=searchLanguage]").val() === "hebrew") {
				searchObject = javascripture.data.hebrew;
				$.each(strongsNumberArray, function(index, strongsNumber) {
					if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
						strongsNumberArray[index] = strongsNumber.substring(2, strongsNumber.length); //strip off the H and the 0 for hebrew searches
					}
				});
			}
			/*var referenceArray = new Array();
			$.each(searchObject, function(bookName, bookContent) {
				if($('#searchRange').val() === "book") {
					//search this string and return a reference
					if(findArrayElementsInString(strongsNumberArray, bookContent, searchType)){
						referenceArray.push([bookName,1,1,wordCount]);
					}
				} else {
					$.each(bookContent, function(chapterNumber, chapterContent) {
						if($('#searchRange').val() === "chapter") {
							if(findArrayElementsInString(strongsNumberArray, chapterContent, searchType)){
								referenceArray.push([bookName,chapterNumber+1,1,wordCount]);
							}
						} else {
							$.each(chapterContent, function(verseNumber, verseContent) {
								if(findArrayElementsInString(strongsNumberArray, verseContent, searchType)){
									referenceArray.push([bookName,chapterNumber+1,verseNumber+1,wordCount]);
								}
							});
						}
					});
				}
			});*/
				references += createReferenceList(referenceArray);
				
			//});
	
			references += '</ol></form>';
	
			if( $( '#referenceTracking #' + trackingBoxId + ' form' ).length <= 0 ) {
				$( '#referenceTracking #' + trackingBoxId + ' .referenceList' ).html( references );
			}
			goToFirstReference();
	//		$('.popup').popup( 'close' );
	
			var endDate = new Date();
			timer(startDate, endDate);
			
		});
	}

	var createReferenceList = function(referenceArray) {
		var referenceList = "";
		$.each(referenceArray, function(index, value){
			referenceList += createReferenceListItem(value);
		});
		return referenceList;
	};
	
	
	function createTrackingBoxString( data, separator ) {
		var string = '';
		if ( data.word ) {
			string += data.word.replace( / /gi, separator );
		}
		if ( data.lemma ) {
			string += separator + data.lemma.replace( / /gi, separator );
			string += separator + stripPointing( strongsDictionary[ data.lemma ].lemma )
		}
		if ( data.morph ) {
			string += separator + data.morph.replace( / /gi, separator );			
		}
		return string;
	}
	
	function createTrackingBoxId( data ) {
		var string = '';
		$.each( data, function ( key, value ) {
			if ( value !== '' ) {
				string += value.replace( / /gi, '_' ) + '_';
			}
		} );
		return string;
	}

	function createTrackingBox( data, type) {
		var trackingBoxId = createTrackingBoxId( data );
		var strongsTracking = '';
		if( $('#'+trackingBoxId).length === 0 ) {
			var header = createTrackingBoxString( data, ' ' ),
			    family = reference.getFamily( data.lemma),
			    familyInt =  parseFloat( family.substring( 1, family.length ), 10 ),
				title = '';
			$.each( data, function ( key, value ) {
				title += key + ': ' + value + '\r\n';
			} );

			strongsTracking += '<div class="collapsable" id="'+trackingBoxId+'" class="'+family+'" title="' + title + '"><style></style><h2 class="'+family+'">' + header;
			strongsTracking += '<a aria-hidden="true" class="icon-close remove"></a></h2><div class="referenceList"><div id="searchLoading">Searching...</div></div></div>';
			$('#referenceTracking').append(strongsTracking);
			if ( data.lemma ) {

				var strongsStyle = '';
				if(familyInt > 0) {
					var newColor = colors.getStrongsColor( familyInt );
					strongsStyle = colors.getStrongsStyle( family, newColor );
				}

				if(familyInt > 0) {
					$('#' + trackingBoxId + ' style').html(strongsStyle);
					$('#changeColor #colorFormStrongsNumber').val( data.lemma );
					var color = $('#' + trackingBoxId + ' .' + data.lemma).css("background-color");
					$('#changeColor #colorFormColor').val(color);
					//$('#colorSelector div').css('background',newColor);
					//$('#colorSelector').ColorPickerSetColor(RGBtoHEX(newColor));
					//$('#wordControlPanel').hide();

					//TODO highlight only these words on hover
					//$('#referenceTracking h2').hoverIntent(hoverIntentConfig);
				}
			}
        }
	}


	function createReferenceListItem(referenceArray) {
		var book = referenceArray.book;
		var chapter = referenceArray.chapter;
		var verse = referenceArray.verse;
		return '<li><a href="#book=' + book + '&chapter=' + chapter + '&verse=' + verse + '">'+book+' '+(chapter)+':'+(verse)+'</a></li>';
	}

	$(document).on( 'dblclick', '#verse ol > li span', function () {
		var data = $(this).data();
		data.word = '';
		data.morph = '';
		createSearchReferencesPanel(data);
	});
	
	$( 'form.search' ).submit( function (event) {
		event.preventDefault();
		createSearchReferencesPanel( $( this ).serializeObject() );
		$( '.popup' ).popup( 'close' );
	});
	
	$( document ).on( 'click', 'a.word-tree', function( event ) {
		event.preventDefault();
		createSearchReferencesPanel( $( this ).data() );
	} );
	
	$( document ).on( 'click', 'a.kjv-def', function( event ) {
		event.preventDefault();
		createSearchReferencesPanel( $( this ).data() );
	} );

} )( jQuery );