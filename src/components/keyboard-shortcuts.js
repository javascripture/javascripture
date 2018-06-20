// External dependencies
import React, { PropTypes } from 'react';
import mousetrap from 'mousetrap';

// Component variables
let lastTimeStamp = 0;

const KeyboardShortcuts = React.createClass( {
	goToNextCurrentVerse() {
		console.log( this.props );
		if ( this.props.nextReference ) {
			this.props.goToReference( this.props.nextReference );
			this.props.markNextCurrentReference();
		}
	},

	goToPreviousCurrentVerse() {
		if ( this.props.previousReference ) {
			this.props.goToReference( this.props.previousReference );
			this.props.markPreviousCurrentReference();
		}
	},

	goToChapter( event, combo ) {
		const currentTimeStamp = Math.floor( event.timeStamp ),
			currentReference = javascripture.modules.reference.getReferenceFromHash(),
			bookId = bible.getBookId( currentReference.book );

		let chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 750) {
			chapterToGoTo = currentReference.chapter + combo;
		}

		if ( bible.Data.verses[bookId - 1][ chapterToGoTo - 1] ) {
			var newReference = currentReference;
			newReference.chapter = chapterToGoTo;
			window.location.hash = javascripture.modules.reference.createReferenceLink( newReference );
		}

		lastTimeStamp = currentTimeStamp;
	},

	componentDidMount() {
		mousetrap.bind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.bind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.bind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], this.goToChapter );
	},

	componentWillUnmount() {
		mousetrap.unbind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.unbind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.unbind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], this.goToChapter );
	},

	render() {
		return null;
	},
} );

KeyboardShortcuts.propTypes = {};

export default KeyboardShortcuts;
