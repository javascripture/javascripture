const elem = document.getElementById('3d-graph');
const VERSE_GROUP = 1;
const WORD_GROUP = 2;
const NODE_LIMIT = 500;
const Graph = ForceGraph3D()
	//.cooldownTime( 1000 )
	//.dagMode('lr')
	(elem)
		.nodeAutoColorBy('group')
		.nodeThreeObject(node => {
			// use a sphere as a drag handle
			const obj = new THREE.Mesh(
				new THREE.SphereGeometry(5,10,10),
				//new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true, opacity: 1})
				new THREE.MeshStandardMaterial({ depthWrite: false, transparent: false, opacity: 1, color: node.color })
			);
			// add text sprite as child
			const sprite = new SpriteText(node.id);
			sprite.color = node.color;
			sprite.textHeight = 3;
			obj.add(sprite);
			return obj;
		})
		.linkThreeObjectExtend(true)
		.linkThreeObject(link => {
			// extend link with text sprite

			// source is the word, target is the verse
			let { source, target } = link;
			if ( typeof source === 'object' ) {
				source = source.id
			}
			if ( typeof target === 'object' ) {
				target = target.id
			}

			const translatedWord = getTranslationFromVReferenceAndWord( target, source );

			const sprite = new SpriteText(`${translatedWord}`);
			sprite.color = 'lightgrey';
			sprite.textHeight = 1.5;
			return sprite;
		})
		.linkPositionUpdate((sprite, { start, end }) => {
			const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
				[c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
			})));
			// Position sprite
			Object.assign(sprite.position, middlePos);
		})
		.onNodeHover( node => {
			elem.style.cursor = node ? 'pointer' : null;
		} )
		.onNodeClick(node => {
			// Aim at node from outside it
			/*const distance = 40;
			const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
			Graph.cameraPosition(
				{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
				node, // lookAt ({ x, y, z })
				3000	// ms transition duration
			);*/
			onClickNode( node );
		}).linkOpacity(1);
Graph.d3Force('charge').strength(-120);

function onClickNode( node ) {
	const { nodes, links } = Graph.graphData();

	if ( node.group === 2 ) {
		addVersesForWord( node );
	}

	if ( node.group === 1 ) {
		addWordsForVerse( node );
	}
}

function addReference( reference ) {
	const { nodes, links } = Graph.graphData();

	// get the words for a reference
	const referenceWithWords = _.filter( mapped, { ref: reference } );
	if ( referenceWithWords.length < 1 ) {
		return alert( 'not found' );
	}
	const words = removeNullWords( referenceWithWords[0].words );

/*
	// remove words that already have nodes
	const filteredWords = words.filter( word => ( ! nodeAlreadyExists( word ) ) );

	// create nodes for every word
	const newNodes = filteredWords.map( word => ( { id: word, group: WORD_GROUP, label: getWordLabel( word ), color: getStrongsColor( word, '50%' ) } ) );
*/
	// add the reference to the list of new nodes
	newNodes = [];
	if ( ! nodeAlreadyExists( reference ) ) {
		newNodes.push( { id: reference, group: VERSE_GROUP } );
	};
/*
	// create a link between each word and verse
	const newLinks = words.map( ( word ) => {
		return { source: word, target: reference, value: 1 };
	} );*/

	Graph.graphData({
		nodes: [ ...nodes, ...newNodes ],
		links: [ ...links ],
	});

	addWordsForVerse( { id: reference, words } );
}

function getReferenceFromString( reference ) {
	const referenceArray = reference.split( '.' );
	const book = referenceArray[ 0 ];
	const chapter = referenceArray[ 1 ] - 1;
	const verse = referenceArray[ 2 ] - 1;
	return { book, chapter, verse };
}

function getTranslationFromVReferenceAndWord( reference, word ) {
	const { book, chapter, verse } = getReferenceFromString( reference );
	const translatedWord = KJV.books[ book ][ chapter ][ verse ].filter( wordArray => {
		return wordArray[ 1 ] && wordArray[ 1 ].indexOf( word ) > -1;
	} );
	return translatedWord.map( wordArray => wordArray[ 0 ] );
}

function removeNullWords( words ) {
	return words.filter( word => word !== null );
}

function nodeAlreadyExists( id ) {
	const { nodes } = Graph.graphData();
	return _.some( nodes, { id: id } );
}

function getWordLabel( word ) {
	const wordData = javascripture.data.strongsDictionary[ word ];
		return `${wordData.lemma} | ${wordData.xlit}`;
}

function getVerseLabel( reference ) {
	const { book, chapter, verse } = getReferenceFromString( reference );
	return KJV.books[ book ][ chapter ][ verse ];
}

function addVersesForWord( node ) {
	const { nodes, links } = Graph.graphData();

	// get the word as a string
	const word = node.id;

	// get the list of verses where the word appears
	verses = _.filter( mapped, { words: [ word ] } );

	if ( verses.length > NODE_LIMIT ) {
		return alert( 'too many verses!' );
	}

	// remove verses that already have nodes
	const filteredVerses = verses.filter( verse => ( ! nodeAlreadyExists( verse.ref ) ) );

	// creaste nodes for the remaining nodes
	const verseNodes = filteredVerses.map( verse => {
		return { id: verse.ref, group: VERSE_GROUP, words: removeNullWords( verse.words ), label: getVerseLabel( verse.ref ) };
	} );

	// create links between each word and verse
	const verseLinks = verses.map( ( verse ) => {
		return { source: word, target: verse.ref, value: 1 };
	} );

	Graph.graphData({
		nodes: [...nodes, ...verseNodes ],
		links: [...links, ...verseLinks ],
	});
}

function addWordsForVerse( verse ) {
	const { nodes, links } = Graph.graphData();

	// remove words that already have nodes
	const filteredWords = verse.words.filter( word => ( ! nodeAlreadyExists( word ) ) );

	// create nodes for every word
	const wordNodes = filteredWords.map( word => ( { id: word, group: WORD_GROUP, color: getStrongsColor( word, '50%' ) } ) );

	// create a link between each word and verse
	const wordLinks = verse.words.map( ( word ) => {
		return { source: word, target: verse.id, value: 1 };
	} );

	Graph.graphData({
		nodes: [...nodes, ...wordNodes ],
		links: [...links, ...wordLinks ],
	});
}

function getStrongsColor( lemma, lightness ) {
	var strongsInt = parseInt( lemma.substring(1, lemma.length) );
	if ( isNaN ( strongsInt ) ) {
		strongsInt = 0;
	}
	var theSizeOfAColorSegment = 360 / 8000,
		hue = Math.floor( strongsInt * theSizeOfAColorSegment ),
		staturation = '50%';
	return 'hsl( ' + hue + ',' + staturation + ', ' + lightness + ' )';
}

document.getElementById( 'book' ).innerHTML = (
	document.getElementById( 'book' ).innerHTML +
	bible.Data.books.map( book => '<option>' + book[0] + '</option>' )
);

document.getElementById( 'book' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book' ).value;
	const bookNumber = bible.getBookId( bookName );
	document.getElementById( 'chapter' ).innerHTML = (
		'<option>Select a chapter</option>' +
		bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => '<option>' + ( index + 1 ) + '</option>' )
	);
	document.getElementById( 'verse' ).innerHTML = (
		'<option>-</option>'
	);
};

document.getElementById( 'chapter' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book' ).value;
	const bookNumber = bible.getBookId( bookName );
	const chapterNumber = document.getElementById( 'chapter' ).value;
	const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ chapterNumber - 1 ];
	document.getElementById( 'verse' ).innerHTML = (
		'<option>Select a verse</option>' +
		_.range( numberOfVerses ).map( index => '<option>' + ( index + 1 ) + '</option>' )
	);
};

document.getElementById( 'verse' ).onchange = ( event ) => {
	const bookName = document.getElementById( 'book' ).value;
	const chapterNumber = document.getElementById( 'chapter' ).value;
	const verseNumber = document.getElementById( 'verse' ).value;
	addReference( bookName + '.' + chapterNumber + '.' + verseNumber );
};
