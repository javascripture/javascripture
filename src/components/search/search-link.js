// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';

// Internal dependencies
import Verse from '../reference/verse';
import styles from './styles.scss';
import { createReferenceLink, getVerseData } from '../../lib/reference.js';

class SearchLink extends React.Component{
	setCurrentVerse() {
		const { index } = this.props;
		this.props.setCurrentVerse( index );
	}

	expandedSearchResults = ( reference ) => {
		if ( ! this.props.data[ this.props.terms.version ][ reference.book ][ reference.chapter - 1 ] || ! this.props.data[ this.props.terms.version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ] ) {
			console.log( 'found a non-existent verse', reference );
			return null;
		}
		const verseData = getVerseData( reference, this.props.terms.version, this.props.data );

		return (
			<div className={ styles.verse }>
				<Verse verse={ verseData } index={ null } version="kjv" language="kjv" />
			</div>
		);
	};

	highlightWords = () => {
		if( ! this.props.highlightSearchResults ) {
			return;
		}

		const { reference, terms } = this.props,
			verseData = getVerseData( reference, terms.version ),
			strongsNumbers = verseData.map( ( word ) => {
				return word[ 1 ]
			} );

		window.updateAppComponent( 'highlightedWord', strongsNumbers.join( ' ' ) );
	};

	unHighlighWords = () => {
		if( ! this.props.highlightSearchResults ) {
			return;
		}

		window.updateAppComponent( 'highlightedWord', null );
	};

	render() {
		const { reference, index } = this.props,
			className = this.props.isActive ? styles.activeReference : null;

		return (
			<li className={ className }>
				<Link to={ createReferenceLink( reference ) }
					className={ styles.searchLink }
					onClick={ () => this.setCurrentVerse( false ) }
					onMouseOver={ this.highlightWords }
					onMouseOut={ this.unHighlighWords }
				>
					{ index + 1 }. { bible.getTranslatedBookNameByLanguage( reference.book, this.props.interfaceLanguage ) } { reference.chapter }:{ reference.verse }
				</Link>
				{ this.props.expandedSearchResults && this.expandedSearchResults( reference ) }
			</li>
		);
	}
}

SearchLink.propTypes = {};

export default withStyles( styles )( SearchLink );
