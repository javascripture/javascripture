// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import mousetrap from 'mousetrap';
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal
import { goToReference, goToNextCurrentVerse, goToPreviousCurrentVerse } from '../actions'
import { createReferenceLink, getReferenceFromSearchResult } from '../lib/reference.js';

// Component variables
let lastTimeStamp = 0,
	waiter;

class KeyboardShortcuts extends React.Component{
	goToNextCurrentVerse() {
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
			bookId = bible.getBookId( this.props.reference[ 0 ].book );

		let chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 500) {
			chapterToGoTo = this.props.reference[ 0 ].chapter + combo;
		}

		if ( bible.Data.verses[bookId - 1][ chapterToGoTo - 1] ) {
			var newReference = this.props.reference[ 0 ];
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

function getCurrentReferenceOffset( searchResults, currentReference, offset ) {
	const currentSearchResults = find( searchResults, searchResult => {
		return isEqual( searchResult.terms, currentReference.terms );
	} )	;

	if ( currentSearchResults ) {
		return currentSearchResults.results[ currentReference.activeReference + offset ];
	}

	return null;
};

const mapStateToProps = ( { searchResults, currentReference, reference } ) => {
	return {
		nextReference: getCurrentReferenceOffset( searchResults, currentReference, 1 ),
		previousReference: getCurrentReferenceOffset( searchResults, currentReference, -1 ),
		reference: reference,
	}
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		markNextCurrentReference: () => {
			dispatch( goToNextCurrentVerse() );
		},
		markPreviousCurrentReference: () => {
			dispatch( goToPreviousCurrentVerse() );
		},
		goToReference: ( reference ) => {
			goToReference( getReferenceFromSearchResult( reference ) );
		}
	}
};

const KeyboardShortcutsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( KeyboardShortcuts )

export default KeyboardShortcutsContainer;
