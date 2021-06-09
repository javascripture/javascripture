// External dependencies
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import Collapsible from '../collapsible';
import SearchBlock from './search-block';
import styles from './styles.scss';
import { removeFromList, toggleListItemVisible } from '../../actions';

const SearchResults = () => {
	const dispatch = useDispatch();
	const searchTerms = useSelector( state => state.list.filter( ( { listType } ) => listType === 'search' ) );
	const termTitle = ( { clusivity, version, lemma, morph, range, strict, word } ) => {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	};
	const textToCopy = useRef( null );

	return searchTerms.map( ( searchTerm, index ) => {
		const header = searchTerm.data.word + ' ' + searchTerm.data.lemma + ' ' + searchTerm.data.morph;

		return (
			<Collapsible
				title={ termTitle( searchTerm.data ) }
				key={ index }
				header={ header }
				open={ searchTerm.visible }
				textToCopy={ textToCopy }
				onToggle={ () => dispatch( toggleListItemVisible( searchTerm ) ) }
				onRemove={ () => dispatch( removeFromList( searchTerm ) ) }
			>
				<div ref={ textToCopy }>
					<SearchBlock { ...searchTerm } />
				</div>
			</Collapsible>
		);
	} );
}

export default SearchResults;
