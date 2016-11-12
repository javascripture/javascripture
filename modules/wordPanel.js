/*global javascripture*/
;( function ( $ ) {
	javascripture.modules.wordPanel = {
		preinit: function( $element ) {
			if ( $element.data('lemma') === 'added' || $element.data('lemma') === 'dwyer-added' ) {
				return;
			}

			$( '.inital-content' ).html( '<a href="#" class="clear-word-details">Clear all</a>' );

			var trackingBoxId = searchOnClick( $element, 'word' );

			var infoObjects = this.init( $element );
			$( '#' + trackingBoxId + ' .wordDetails' ).html( infoObjects );

			//Yuk
			javascripture.reactHelpers.dispatch( javascripture.reactHelpers.setTrayVisibilityFilter( 'word' ) );
		},

		init: function( $element ) {


			var self = this;
			if ( ! $element.data('lemma') ) {
				return false;
			}
			var strongsNumberArray = $element.data('lemma').toString().split(/ |\//),
				strongsNumberDisplay = '',
				lemma = '',
				strongsDef = '',
				derivation = '',
				kjvDef = '',
				englishWord = '',
				transliteration = '',
				pronounciation = '',
				infoObjects = [],
				language = $element.data('language'),
				morphology = $element.data( 'morph' );
			strongsNumberArray.forEach( function( strongsNumber, i ) {
				if ( 'undefined' === typeof javascripture.data.strongsDictionary[ strongsNumber ] || 'G3588' === strongsNumber ) {
					return false;
				} else {
//					if ( 'undefined' !== typeof javascripture.data.strongsDictionary[ strongsNumber ] ) {
						strongsNumberDisplay = strongsNumber;
						var className = javascripture.api.word.getFamily( strongsNumber ) + '-family ' + strongsNumber;
						//convert
						var osidStrongsNumber = strongsNumber;
						lemma = javascripture.modules.hebrew.stripPointing( javascripture.data.strongsDictionary[ osidStrongsNumber ].lemma );
						strongsDef = javascripture.data.strongsDictionary[osidStrongsNumber].strongs_def;
						derivation = javascripture.data.strongsDictionary[osidStrongsNumber].derivation;
						transliteration = javascripture.data.strongsDictionary[osidStrongsNumber].xlit;
						pronounciation = javascripture.data.strongsDictionary[osidStrongsNumber].pron;
						var kjvDefArray = javascripture.data.strongsDictionary[osidStrongsNumber].kjv_def.split( ',' );
						$.each( kjvDefArray, function( key, word ) {
							var kjvWord = word.trim().replace( /\./g, '' );
							kjvDef += '<a href="#" class="kjv-def" data-language="kjv" data-clusivity="exclusive" data-range="word" data-lemma="' + strongsNumber + '" data-word="' + kjvWord + '">' + kjvWord + '</a>, ';
						} );
						englishWord = $element.text();
						if ( osidStrongsNumber.substring( 0, 1 ) === "H" ) {
							language = 'hebrew';
						}
						if ( osidStrongsNumber.substring( 0, 1 ) === "G" ) {
							language = 'greek';
						}

						infoObjects[ i ] = $( '.wordControlPanelTemplate' ).clone().removeClass( 'wordControlPanelTemplate' ).addClass( 'wordControlPanel' );
						infoObjects[ i ].find( '.wordControlPanelLemma' ).text( lemma );
						infoObjects[ i ].find( '.wordControlPanelEnglish' ).text( englishWord );
						infoObjects[ i ].find( '.wordControlPanelDerivation' ).text( derivation );
						infoObjects[ i ].find( '.wordControlPanelTransliteration' ).text( transliteration );
						infoObjects[ i ].find( '.wordControlPanelPronounciation' ).text( pronounciation );
						infoObjects[ i ].find( '.wordControlPanelKJVDef' ).html( kjvDef );
						infoObjects[ i ].find( '.wordControlPanelMorphology' ).html( morphology + ': ' + javascripture.api.morphology.get( morphology, 'noLinks', strongsNumber ) );
					//}

					var roots = '';
					if( typeof javascripture.data.strongsObjectWithFamilies[ strongsNumber ] !== 'undefined' && javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots ) {
				        $.each( javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots, function( index, rootNumber ) {
							if ( rootNumber.substring( 0, 1 ) === "H" ) {
								language = 'hebrew';
							}
							if ( rootNumber.substring( 0, 1 ) === "G" ) {
								language = 'greek';
							}
							roots += '<a href="#search=' + rootNumber + '" class="' + javascripture.api.word.getFamily( rootNumber ) + '-family ' + rootNumber + ' word-tree" data-lemma="' + rootNumber + '" data-language="' + language + '">' + rootNumber + '</a> ';
						});
					} else {
						roots += 'No roots';
					}

					var wordTreeRoots = '';
					if(roots === ''){
						wordTreeRoots += '<p>no roots</p>';
					} else {
						wordTreeRoots += 'roots: ' + roots ;
					}
					var wordTreeBranches = '';
					var branches = self.getBranchesMarkup( strongsNumber );
					if(branches === ''){
						wordTreeBranches += '<p>no branches</p>';
					} else {
						wordTreeBranches += 'branches: ' + branches;
					}
					infoObjects[ i ].find('#wordTreeRoots').html( wordTreeRoots );
					infoObjects[ i ].find('#wordTreeBranches').html( wordTreeBranches );

					var family = javascripture.api.word.getFamily( strongsNumber ),
						familyInt = parseFloat( family.substring( 1, family.length ), 10 ),
						wordTreeFamily = 'family: ' + family;
					infoObjects[ i ].find('#wordTreeFamily').html( wordTreeFamily );

					//var strongsInt = parseInt( family.substring( 1, family.length ), 10 );
					//var strongsInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );

					//var newColor = javascripture.modules.colors.getStrongsColor( strongsInt );
					var strongsStyle = javascripture.modules.colors.getStrongsStyle( strongsNumber );
//					var newColor = javascripture.modules.colors.getStrongsColor( familyInt );
//					var strongsStyle = javascripture.modules.colors.getStrongsStyle( family + '-family', newColor );


					infoObjects[ i ].find('style').html( strongsStyle );
				}
			});

			return infoObjects;

			//$('#wordControlPanel').append( infoObjects ).show();
			/*$.each( infoObjects, function ( key, infoObject ) {
				$('#wordControlPanel').append( infoObject );
			} );*/
		},
		getBranches: function( strongsNumber ) {
			var branches = {};
			$.each( javascripture.data.strongsObjectWithFamilies, function( strongsObjectKey, strongsObjectData ) {
				if( $.inArray( strongsNumber, strongsObjectData.roots ) !== -1 ) {
					branches[ strongsObjectKey ] = true;
				}
			});
			return branches;
		},
		getBranchesMarkup: function( strongsNumber ) {
			var branches = this.getBranches( strongsNumber ),
			    branchesMarkup = '';

			$.each( branches, function( strongsObjectKey, value ) {
				var language;
				if ( strongsObjectKey.substring( 0, 1 ) === "H" ) {
					language = 'hebrew';
				}
				if ( strongsObjectKey.substring( 0, 1 ) === "G" ) {
					language = 'greek';
				}
				branchesMarkup += '<a href="#search='+strongsObjectKey+'" class="'+ javascripture.api.word.getFamily( strongsObjectKey ) + '-family ' + strongsObjectKey + ' word-tree" data-lemma="' + strongsObjectKey + '"  data-language="' + language + '">' + strongsObjectKey + '</a> ';
			} );
			return branchesMarkup;
		}
	};

	/*Word panel*/
	$(document).on( 'click', '#verse ol > li span', function ( event ) {
		event.preventDefault();
		event.stopPropagation();
//		javascripture.modules.wordPanel.preinit( $( this ) );

		javascripture.reactHelpers.dispatch( javascripture.reactHelpers.setTrayVisibilityFilter( 'word' ) );

		$( this ).data( 'lemma' ).split( ' ' ).map( strongsNumber => {
			javascripture.reactHelpers.dispatch( javascripture.reactHelpers.addWord( { strongsNumber, open: true, morphology: $( this ).data( 'morph' ) } ) );
		} );
	});

	$( document ).on( 'click', 'a.word-tree', function( event ) {
		event.preventDefault();

		javascripture.modules.wordPanel.preinit( $( this ) );
		//createSearchReferencesPanel( $( this ).data(), 'word' );
	} );


	$(document).on( 'click', '#wordControlPanel .clear-word-details', function ( event ) {
		event.preventDefault();
		$( '#wordControlPanel .searchResults, .inital-content' ).html('');
	} );

} )(jQuery);
