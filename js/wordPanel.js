/*global javascripture*/
;( function ( $ ) {
	javascripture.modules.wordPanel = {
		init: function( $element ) {
			var self = this;
			if ( ! $element.data('lemma') ) {
				return false;
			}
			var strongsNumberArray = $element.data('lemma').split(' '),
			    strongsNumberDisplay = '',
			    lemma = '',
			    strongsDef = '',
			    kjvDef = '',
			    englishWord = '',
			    infoObjects = [],
			    language,
			    morphology = $element.data( 'morph' );
			$.each(strongsNumberArray, function(i,strongsNumber) {
				if ( strongsNumber === 'G3588' ) {
					//do nothing
				} else {
					if(strongsNumber !== 'added' && strongsNumber !== 'trans-change' ) {
						strongsNumberDisplay = strongsNumber;
						var className = javascripture.modules.reference.getFamily( strongsNumber );
						//convert
						var osidStrongsNumber = strongsNumber;
		
						lemma = stripPointing( strongsDictionary[ osidStrongsNumber ].lemma );
						strongsDef = strongsDictionary[osidStrongsNumber].strongs_def;
						var kjvDefArray = strongsDictionary[osidStrongsNumber].kjv_def.split( ',' );
						$.each( kjvDefArray, function( key, word ) {
							var kjvWord = word.trim();
							kjvDef += '<a href="#" class="kjv-def" data-language="english" data-clusivity="exclusive" data-range="word" data-lemma="' + strongsNumber + '" data-word="' + kjvWord + '">' + kjvWord + '</a>, ';
						} );
						englishWord = $element.text();
						if ( osidStrongsNumber.substring( 0, 1 ) === "H" ) {
							language = 'hebrew';
						}
						if ( osidStrongsNumber.substring( 0, 1 ) === "G" ) {
							language = 'greek';
						}
	
						infoObjects[ i ] = $( '.wordControlPanelTemplate' ).clone().removeClass( 'wordControlPanelTemplate' ).addClass( 'wordControlPanel' );
						infoObjects[ i ].find( '.wordControlPanelStrongsNumber' ).addClass( className ).text( strongsNumberDisplay ).data( {
							language: language,
							lemma: osidStrongsNumber,
							range: 'verse'
							
						} );
						infoObjects[ i ].find( '.wordControlPanelLemma' ).text( lemma );
						infoObjects[ i ].find( '.wordControlPanelEnglish' ).text( englishWord );
						infoObjects[ i ].find( '.wordControlPanelStrongsDef' ).text( strongsDef );
						infoObjects[ i ].find( '.wordControlPanelKJVDef' ).html( kjvDef );
						infoObjects[ i ].find( '.wordControlPanelMorphology' ).html( morphologyApi.get( morphology ) );
					}
			
					var roots = '';
					if( typeof javascripture.data.strongsObjectWithFamilies[ strongsNumber ] !== 'undefined' && javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots ) {
				        $.each( javascripture.data.strongsObjectWithFamilies[ strongsNumber ].roots, function( index, rootNumber ) {
							if ( rootNumber.substring( 0, 1 ) === "H" ) {
								language = 'hebrew';
							}
							if ( rootNumber.substring( 0, 1 ) === "G" ) {
								language = 'greek';
							}
							roots += '<a href="#search=' + rootNumber + '" class="' + javascripture.modules.reference.getFamily( rootNumber ) + ' word-tree" data-lemma="' + rootNumber + '" data-language="' + language + '">' + rootNumber + '</a> ';
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
		
					var family = javascripture.modules.reference.getFamily( strongsNumber ),
					    wordTreeFamily = 'family: ' + family;
					infoObjects[ i ].find('#wordTreeFamily').html( wordTreeFamily );
	
					var strongsInt = parseInt( family.substring( 1, family.length ), 10 );
		
					var newColor = javascripture.modules.colors.getStrongsColor( strongsInt );
					var strongsStyle = javascripture.modules.colors.getStrongsStyle( family, newColor );
	
					infoObjects[ i ].find('style').html( strongsStyle );
				}
			});
		
			$('#wordControlPanel').html( infoObjects ).show();
			$.each( infoObjects, function ( key, infoObject ) {
				$('#wordControlPanel').append( infoObject );
			} );
		},
		getBranchesMarkup: function( strongsNumber ) {
			var branchesMarkup = '';
			$.each(javascripture.data.strongsObjectWithFamilies, function(strongsObjectKey, strongsObjectRoot){
				$.each(strongsObjectRoot, function(strongsObjectRootKey,strongsObjectRootValue){
					if(strongsObjectRootValue === strongsNumber){
						var language;
						if ( strongsObjectKey.substring( 0, 1 ) === "H" ) {
							language = 'hebrew';
						}
						if ( strongsObjectKey.substring( 0, 1 ) === "G" ) {
							language = 'greek';
						}
						branchesMarkup += '<a href="#search='+strongsObjectKey+'" class="'+ javascripture.modules.reference.getFamily( strongsObjectKey ) +' word-tree" data-lemma="' + strongsObjectKey + '"  data-language="' + language + '">' + strongsObjectKey + '</a> ';
					}
				});
			});
			return branchesMarkup;
		}
	};

	/*Word panel*/
	$(document).on( 'click', '#verse ol > li span', function ( event ) {
		event.preventDefault();
		event.stopPropagation();
		javascripture.modules.wordPanel.init( $( this ) );
	});

	$(document).on( 'click', '.wordControlPanel .close', function ( event ) {
		event.preventDefault();
		$( '#wordControlPanel' ).hide();
	} );

} )(jQuery);
