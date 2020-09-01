// External dependencies
import React, { useRef } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import Collapsible from '../collapsible';
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
	const textToCopy = useRef( null );

	return searchTerms.map( ( searchTerm, index ) => {
		const header = searchTerm.terms.word + ' ' + searchTerm.terms.lemma + ' ' + searchTerm.terms.morph;

		return (
			<Collapsible
				title={ termTitle( searchTerm.terms ) }
				key={ index }
				header={ header }
				open={ searchTerm.open }
				onToggle={ () => dispatch( toggleSearch( searchTerm.terms ) ) }
				textToCopy={ textToCopy }
				onRemove={ () => dispatch( removeSearch( searchTerm.terms ) ) }
			>
				<div ref={ textToCopy }>
					<SearchBlock { ...searchTerm } />
				</div>
			</Collapsible>
		);
	} );
}

export default withStyles( styles )( SearchResults );
