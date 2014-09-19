/*global javascripture*/
var createSearchReferencesPanel, startDate;
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

	createSearchReferencesPanel = function( data ) {
		var startDate = new Date();

//		var strongsNumberArray = new Array();
//		var searchType = $('#searchSelect').val();
//		var wordString = "";
		if ( data.word ) {
			data.word = data.word.trim();
		}
		if ( data.lemma ) {
			data.lemma = data.lemma.trim();
		}
		if ( data.morph ) {
			data.morph = data.morph.trim();
		}

		if ( 'undefined' === typeof data.clusivity ) {
			data.clusivity = 'exclusive';
		}


		var strongsNumberAsId;
		if ( data.lemma ) {
			strongsNumberAsId = data.lemma.replace( / /gi, "" );
		}
		var trackingBoxId = createTrackingBoxId( data, '_' );
		createTrackingBox( data );
		strongsNumberArray = [];
		if ( data.lemma ) {
			data.lemma.split(' ');
		}

		//collapse all the others
		$('#referenceTracking .collapsable').addClass('closed');
		$('#referenceTracking #' + trackingBoxId).removeClass('closed');

		// Send data to our worker.
		worker.postMessage( {
			task: 'search',
			parameters: data
		} );
	};

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
			if ( javascripture.data.strongsDictionary[ data.lemma ] ) {
				string += separator + javascripture.modules.hebrew.stripPointing( javascripture.data.strongsDictionary[ data.lemma ].lemma );
			}
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
			    family = '',
			    familyInt = '',
				title = '';
			if ( data.lemma ) {
				family = javascripture.api.word.getFamily( data.lemma);
				familyInt = parseFloat( family.substring( 1, family.length ), 10 );
			}
			$.each( data, function ( key, value ) {
				title += key + ': ' + value + '\r\n';
			} );

			strongsTracking += '<div class="collapsable" id="'+trackingBoxId+'" class="'+family+'-family '+data.lemma+'" title="' + title + '"><style></style><h2 class="'+family+'-family '+data.lemma+'">' + header;
			strongsTracking += '<a aria-hidden="true" class="icon-cross remove"></a></h2><div class="referenceList"><div id="searchLoading">Searching...</div></div></div>';
			$('#referenceTracking .searchResults').append(strongsTracking);
			if ( data.lemma ) {

				var strongsStyle = '';
				if(familyInt > 0) {
					strongsStyle = javascripture.modules.colors.getStrongsStyle( data.lemma );
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
		return '<li><a href="#' + javascripture.modules.reference.createReferenceLink( referenceArray ) + '">'+book+' '+(chapter)+':'+(verse)+'</a></li>';
	}

	function searchOnClick( element ) {
		var data = $( element ).data();
		data.word = '';
		data.morph = '';
		data.lemma = data.lemma.replace('G3588 ','');
		createSearchReferencesPanel(data);
	}


	$(document).on( 'click', '.wordControlPanelStrongsNumber', function () {
		searchOnClick( this );
	});
	$(document).on( 'dblclick', '#verse ol > li span.searchable', function () {
		searchOnClick( this );
	});

	$( 'form.search' ).submit( function (event) {
		event.preventDefault();
		var data = $( this ).serializeObject();
		createSearchReferencesPanel( data );
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

	$( '.advanced-search' ).click( function( event ) {
		event.preventDefault();
		$( '.advanced' ).toggle();
		$( '.searchResults' ).toggleClass( 'advanced-search-open' );
	} );

	worker.addEventListener('message', function(e) {

//				var searchApi = Object.create( javascripture.api.search );
//				searchApi.getReferences( data );

//				var referenceArray =  searchApi.results.references;
		if( e.data.task === 'search' ) {
			var referenceArray = e.data.result;

			var references = '<form><ol class="references">';
			var wordCount = 0;
			var trackingBoxId = createTrackingBoxId( e.data.parameters, '_' );

			var searchObject = javascripture.data.english;
			if($("select[name=searchLanguage]").val() === "hebrew") {
				searchObject = javascripture.data.hebrew;
				$.each(strongsNumberArray, function(index, strongsNumber) {
					if(parseFloat(strongsNumber.substring(1, strongsNumber.length)) > 0) { //this is a number
						strongsNumberArray[index] = strongsNumber.substring(2, strongsNumber.length); //strip off the H and the 0 for hebrew searches
					}
				});
			}
			references += createReferenceList(referenceArray);
			references += '</ol></form>';

			if( $( '#referenceTracking #' + trackingBoxId + ' form' ).length <= 0 ) {
				$( '#referenceTracking #' + trackingBoxId + ' .referenceList' ).html( references );
			}
//				goToFirstReference();
	//		$('.popup').popup( 'close' );

			if( ! $('#referenceTracking').hasClass('top') ) {
				$('#keyCode83').click();
			}

			var endDate = new Date();
			timer(startDate, endDate);

		}

	}, false);

} )( jQuery );