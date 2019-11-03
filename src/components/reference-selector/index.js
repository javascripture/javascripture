/*global javascripture*/

// External
import React from 'react';

// Internal
import BookControl from './book-control';

class ReferenceSelector extends React.Component{
	state = {
		'active': -1
	};

	handleChange( event ) {
		this.setState( {
			'reference': event.target.value
		} );
	}

	setActiveBook( book ) {
		this.setState( {
			'active': book
		} );
	}

	render() {
		var books = bible.Data.books.map( function( bookArray, index ) {
			var chapters = parseInt( bible.Data.verses[ index ].length ),
				active = ( this.state.active === index );
			return (
				<BookControl
					key={ index }
					index={ index }
					name={ bookArray[0] }
					chapters={ chapters }
					onSetActiveBook={ this.setActiveBook }
					onGoToReference={ this.props.onGoToReference }
					onChangeDisplayState={ this.props.onChangeDisplayState }
					active={ active } />
			);
		}, this );
		return (
			<div className="reference-selector">{ books }</div>
		);
	}
}

export default ReferenceSelector;
