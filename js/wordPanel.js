( function ( $ ) {

	/*Word panel*/
	function initializeWordPanel( spanObject ) {
		if ( ! spanObject.data('lemma') ) {
			return false;
		}
		var strongsNumberArray = spanObject.data('lemma').split(' ');
		var strongsNumberPrefix = '';
		var strongsNumberDisplay = '';
		var lemma = '';
		var strongsDef = '';
		var kjvDef = '';
		var englishWord = '';
		var infoObjects = [],
		    language;
		$.each(strongsNumberArray, function(i,strongsNumber) {
			if ( strongsNumber === 'G3588' ) {
				//do nothing
			} else {
				if(strongsNumber !== 'added' && strongsNumber !== 'trans-change' ) {
					strongsNumberDisplay = strongsNumber;
					var className = reference.getFamily( strongsNumber );
					//convert
					osidStrongsNumber = strongsNumber;
	
					lemma = stripPointing( strongsDictionary[ osidStrongsNumber ].lemma );
					strongsDef = strongsDictionary[osidStrongsNumber].strongs_def;
					kjvDefArray = strongsDictionary[osidStrongsNumber].kjv_def.split( ',' );
					$.each( kjvDefArray, function( key, word ) {
						var kjvWord = word.trim();
						kjvDef += '<a href="#" class="kjv-def" data-language="english" data-clusivity="exclusive" data-range="word" data-lemma="' + strongsNumber + '" data-word="' + kjvWord + '">' + kjvWord + '</a>, ';
					} );
					englishWord = spanObject.text();
					infoObjects[ i ] = $( '.wordControlPanelTemplate' ).clone().removeClass( 'wordControlPanelTemplate' ).addClass( 'wordControlPanel' );
					infoObjects[ i ].find( '.wordControlPanelStrongsNumber' ).addClass( className ).text( strongsNumberDisplay );
					infoObjects[ i ].find( '.wordControlPanelLemma' ).text( lemma );
					infoObjects[ i ].find( '.wordControlPanelEnglish' ).text( englishWord );
					infoObjects[ i ].find( '.wordControlPanelStrongsDef' ).text( strongsDef );
					infoObjects[ i ].find( '.wordControlPanelKJVDef' ).html( kjvDef );
				}
		
				var roots = '';
				if( typeof( strongsObjectWithFamilies[ strongsNumber ] ) != 'undefined' && strongsObjectWithFamilies[ strongsNumber ].roots ) {
			        $.each( strongsObjectWithFamilies[ strongsNumber ].roots, function( index, rootNumber ) {
						if ( rootNumber.substring( 0, 1 ) === "H" ) {
							language = 'hebrew';
						}
						if ( rootNumber.substring( 0, 1 ) === "G" ) {
							language = 'greek';
						}
						roots += '<a href="#search=' + rootNumber + '" class="' + reference.getFamily( rootNumber ) + ' word-tree" data-lemma="' + rootNumber + '" data-language="' + language + '">' + rootNumber + '</a> ';
					});
				} else {
					roots += 'No roots';
				}
				var branches = '';
	
				$.each(strongsObjectWithFamilies, function(strongsObjectKey, strongsObjectRoot){
					$.each(strongsObjectRoot, function(strongsObjectRootKey,strongsObjectRootValue){
						if(strongsObjectRootValue==strongsNumber){
							if ( strongsObjectKey.substring( 0, 1 ) === "H" ) {
								language = 'hebrew';
							}
							if ( strongsObjectKey.substring( 0, 1 ) === "G" ) {
								language = 'greek';
							}
							branches += '<a href="#search='+strongsObjectKey+'" class="'+ reference.getFamily( strongsObjectKey ) +' word-tree" data-lemma="' + strongsObjectKey + '"  data-language="' + language + '">' + strongsObjectKey + '</a> ';
						}
					});
				});
				var wordTreeRoots = '';
				if(roots === ''){
					wordTreeRoots += '<p>no roots</p>';
				} else {
					wordTreeRoots += 'roots: ' + roots ;
				}
				var wordTreeBranches = '';
				if(branches === ''){
					wordTreeBranches += '<p>no branches</p>';
				} else {
					wordTreeBranches += 'branches: ' + branches;
				}
				infoObjects[ i ].find('#wordTreeRoots').html( wordTreeRoots );
				infoObjects[ i ].find('#wordTreeBranches').html( wordTreeBranches );
	
				var family = reference.getFamily( strongsNumber );
				var strongsInt = parseInt( family.substring( 1, family.length ), 10 );
	
				var newColor = colors.getStrongsColor( strongsInt );
				var strongsStyle = colors.getStrongsStyle( family, newColor );
	console.log(spanObject.data( 'family' ));
				infoObjects[ i ].find('style').html( strongsStyle );
			}
		});
	
		$('#wordControlPanel').html( infoObjects ).show();
		$.each( infoObjects, function ( key, infoObject ) {
			$('#wordControlPanel').append( infoObject );
		} );
	}

	$(document).on( 'click', '#verse ol > li span', function ( event ) {
		event.preventDefault();
		event.stopPropagation();
		initializeWordPanel($(this));
	});

	$(document).on( 'click', '.wordControlPanel .close', function ( event ) {
		event.preventDefault();
		$( '#wordControlPanel' ).hide();
	} );


} )(jQuery);
