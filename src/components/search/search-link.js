// External dependencies
import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { setCurrentListResult } from '../../actions';
import Verse from '../reference/verse';
import styles from './styles.scss';
import { createReferenceLink, getVerseData } from '../../lib/reference.js';
import ReferenceText from '../reference-text';

const SearchLink = React.memo( ( { reference, index, count, word } ) => {
	// State constants
	const expandedSearchResults = useSelector( state => state.settings.expandedSearchResults );
	const highlightSearchResults = useSelector( state => state.settings.highlightSearchResults );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const isActive = word && typeof word.current !== 'undefined' && word.current === index;
	const dispatch = useDispatch();

	// Component constants
	const className = isActive ? styles.activeReference : null;
	const highlightWords = () => {
		if( ! highlightSearchResults ) {
			return;
		}

		const verseData = getVerseData( reference, interfaceLanguage );
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
		const adjustedReference = { book: reference.book, chapter: reference.chapter - 1, verse: reference.verse - 1 };
		return (
			<div className={ classnames( styles.verse, expandedSearchResults ? styles.verseExpanded : null ) }>
				<Verse reference={ adjustedReference } index={ adjustedReference.verse } version={ interfaceLanguage } />
			</div>
		);
	};

	return (
		<li className={ className }>
			<a href={ '/#' + createReferenceLink( reference ) }
				className={ styles.searchLink }
				onClick={ () => {
					if ( word ) {
						dispatch( setCurrentListResult( word.id, index ) );
					}
				} }
				onMouseOver={ highlightWords }
				onMouseOut={ unHighlighWords }
			>
				{ index + 1 }. <ReferenceText reference={ reference } />
				{ count && ' (' + count + ')' }
			</a>
			{ expandedSearchResultsRendered( reference ) }
		</li>
	);
} );

export default withStyles( styles )( SearchLink );
