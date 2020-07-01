// External dependencies
import React, { useRef } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import SearchBlock from './search-block';
import styles from './styles.scss';
import {
	toggleSearch,
	removeSearch,
} from '../../actions'
import WordBlockHeader from '../word-block-header';

const SearchResults = () => {
	const dispatch = useDispatch();
	const searchTerms = useSelector( state => state.searchTerms );
	const termTitle = ( { clusivity, version, lemma, morph, range, strict, word } ) => {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	};
	const textToCopy = useRef( null );

	return searchTerms.map( ( searchTerm, index ) => {
		return (
			<div key={ index }>
				<WordBlockHeader
					className={ styles.header }
					title={ termTitle( searchTerm.terms ) }
					textToCopy={ textToCopy }
					onClick={ () => dispatch( toggleSearch( searchTerm.terms ) ) }
					onRemove={ () => dispatch( removeSearch( searchTerm.terms ) ) }>
					{ searchTerm.terms.word + ' ' + searchTerm.terms.lemma + ' ' + searchTerm.terms.morph }
				</WordBlockHeader>
				<div ref={ textToCopy }>
					<SearchBlock { ...searchTerm } />
				</div>
			</div>
		);
	} );
}

export default withStyles( styles )( SearchResults );
