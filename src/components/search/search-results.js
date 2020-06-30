// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

import CancelSvg from '../svg/cancel.js';
import SearchBlock from './search-block';
import styles from './styles.scss';
import {
	toggleSearch,
	removeSearch,
} from '../../actions'

const SearchResults = () => {
	const dispatch = useDispatch();
	const searchTerms = useSelector( state => state.searchTerms );
	const termTitle = ( { clusivity, version, lemma, morph, range, strict, word } ) => {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	};

	return searchTerms.map( ( searchTerm, index ) => {
		return (
			<div key={ index }>
				<h2 className={ styles.header } onClick={ () => dispatch( toggleSearch( searchTerm.terms ) ) } title={ termTitle( searchTerm.terms ) }>
					{ searchTerm.terms.word + ' ' + searchTerm.terms.lemma + ' ' + searchTerm.terms.morph }
					<a className={ styles.remove } onClick={ () => dispatch( removeSearch( searchTerm.terms ) ) }>
						<CancelSvg fill="#fff" />
					</a>
				</h2>

				<SearchBlock { ...searchTerm } />
			</div>
		);
	} );
}

export default withStyles( styles )( SearchResults );
