/*global javascripture*/

// External
import React, { useState } from 'react';

// Internal
import BookControl from './book-control';

const ReferenceSelector = React.memo( ( { onGoToReference, onChangeDisplayState } ) => {
	const [ active, setActive ] = useState( -1 );

	const books = bible.Data.books.map( ( bookArray, index ) => {
		const chapters = parseInt( bible.Data.verses[ index ].length );
		const isActive = ( active === index );
		return (
			<BookControl
				key={ index }
				index={ index }
				name={ bookArray[0] }
				chapters={ chapters }
				onSetActiveBook={ ( book ) => { setActive( book ); } }
				onGoToReference={ () => onGoToReference() }
				onChangeDisplayState={ () => onChangeDisplayState() }
				active={ isActive } />
		);
	} );

	return (
		<div className="reference-selector">{ books }</div>
	);
} );

export default ReferenceSelector;
