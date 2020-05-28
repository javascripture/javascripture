// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { setCurrentVerse } from '../../actions';
import Verse from '../reference/verse';
import styles from './styles.scss';
import { createReferenceLink, getVerseData } from '../../lib/reference.js';
import ReferenceText from '../reference-text';

function isLinkActive( currentReference, index, terms ) {
	if( terms === currentReference.terms && currentReference.activeReference === index ) {
		return true;
	}

	return false;
}

const SearchLink = React.memo( ( { reference, index, count, terms } ) => {
	// State constants
	const isActive = useSelector( state => isLinkActive( state.currentReference, index, terms ) );
	const expandedSearchResults = useSelector( state => state.settings.expandedSearchResults );
	const highlightSearchResults = useSelector( state => state.settings.highlightSearchResults );
	const data = useSelector( state => state.data );

	const dispatch = useDispatch();

	// Component constants
	const className = isActive ? styles.activeReference : null;
	const highlightWords = () => {
		if( ! highlightSearchResults ) {
			return;
		}

		const verseData = getVerseData( reference, terms.version );
		const strongsNumbers = verseData.map( ( word ) => {
				return word[ 1 ]
			} );

		window.updateAppComponent( 'highlightedWord', strongsNumbers.join( ' ' ) );
	};
	const unHighlighWords = () => {
		if( ! highlightSearchResults ) {
			return;
		}

		window.updateAppComponent( 'highlightedWord', null );
	};
	const expandedSearchResultsRendered = ( reference ) => {
		if ( ! data[ terms.version ][ reference.book ][ reference.chapter - 1 ] || ! data[ terms.version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ] ) {
			console.log( 'found a non-existent verse', reference );
			return null;
		}
		const verseData = getVerseData( reference, terms.version, data );

		return (
			<div className={ styles.verse }>
				<Verse verse={ verseData } index={ null } version={ terms.version } />
			</div>
		);
	};

	return (
		<li className={ className }>
			<a href={ '/#' + createReferenceLink( reference ) }
				className={ styles.searchLink }
				onClick={ () => dispatch( setCurrentVerse( terms, index ) ) }
				onMouseOver={ highlightWords }
				onMouseOut={ unHighlighWords }
			>
				{ index + 1 }. <ReferenceText reference={ reference } />
				{ count && ' (' + count + ')' }
			</a>
			{ expandedSearchResults && expandedSearchResultsRendered( reference ) }
		</li>
	);
} );

export default withStyles( styles )( SearchLink );
