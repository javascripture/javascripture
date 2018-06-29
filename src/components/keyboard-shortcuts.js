// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import mousetrap from 'mousetrap';

// Internal
import { createReferenceLink } from '../lib/reference.js';

// Component variables
let lastTimeStamp = 0,
	waiter;

class KeyboardShortcuts extends React.Component{
	goToNextCurrentVerse() {
		console.log( this.props );
		if ( this.props.nextReference ) {
			this.props.goToReference( this.props.nextReference );
			this.props.markNextCurrentReference();
		}
	}

	goToPreviousCurrentVerse() {
		if ( this.props.previousReference ) {
			this.props.goToReference( this.props.previousReference );
			this.props.markPreviousCurrentReference();
		}
	}

	goToChapter( event, combo ) {
		const currentTimeStamp = Math.floor( event.timeStamp ),
			bookId = bible.getBookId( this.props.reference.book );

		let chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 500) {
			chapterToGoTo = this.props.reference.chapter + combo;
		}

		if ( bible.Data.verses[bookId - 1][ chapterToGoTo - 1] ) {
			var newReference = this.props.reference;
			newReference.chapter = chapterToGoTo;
			newReference.verse = 1;

			clearTimeout( waiter );
			waiter = setTimeout( () => {
				window.location.hash = createReferenceLink( newReference );
			}, 500 );

		}

		lastTimeStamp = currentTimeStamp;
	}

	componentDidMount() {
		mousetrap.bind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.bind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.bind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], ( event, combo ) => this.goToChapter( event, combo ) );
	}

	componentWillUnmount() {
		mousetrap.unbind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.unbind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.unbind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], ( event, combo ) => this.goToChapter( event, combo ) );
	}

	render() {
		return null;
	}
}

KeyboardShortcuts.propTypes = {};

export default KeyboardShortcuts;
