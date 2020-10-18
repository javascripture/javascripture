// External dependencies
import { countBy, sortBy } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Collapsible from '../collapsible';
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js'
import { getSearchResults } from '../search/utils.js';
import styles from './styles.scss';

const CombinedResults = React.memo( () => {
	const [ open, setOpen ] = useState( false );
	const words = useSelector( ( state ) => state.wordDetails );
	const searchResults = useSelector( ( state ) => state.searchResults );
	if ( words.length ) {
		let combined = [];
		words.forEach( ( wordDetails, index ) => {
			const { version, strongsNumber, clickedWord } = wordDetails
			const params = {
				clusivity: 'exclusive',
				version: version,
				lemma: strongsNumber,
				range: 'verse',
				clickedWord,
			};
			const results = getSearchResults( searchResults, params );
			const uniqueResults = [ ...new Set( results ) ];
			combined = combined.concat( uniqueResults );
		} );

		const countedResults = countBy( combined );
		const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
		const sortedResults = sortBy( countedResultsArray, [ 'value', 'key' ] ).filter( result => result.value > 1 ).reverse();

		const combinedResults = sortedResults.map( ( result, index ) => {
			return (
				<SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result.key ) } count={ result.value } />
			);
		} );

		if ( combinedResults.length > 0 ) {
			return (
				<Collapsible
					header="Combined"
					open={ open }
					onToggle={ () => setOpen( ! open ) }
					className="collapse"
				>
					<ol className={ styles.results }>
						{ combinedResults }
					</ol>
				</Collapsible>
			);
		}

		return null
	}

	return null;
} );

export default withStyles( styles )( CombinedResults );
