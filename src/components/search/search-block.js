// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { countBy, sortBy } from 'lodash';
import { useSelector } from 'react-redux';

// Internal dependencies
import SearchLink from './search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js';
import styles from './styles.scss';

const SearchBlock = React.memo( ( props ) => {
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const { visible, sorted, terms, results } = props;
	if ( ! results ) {
		return ( <div className={ styles.noResults }>Loading…</div> );
	}

	if ( results.length === 0 || typeof results === 'string' ) {
		return (
			<div className={ visible ? styles.noResults : styles.hidden }>
				No results.
			</div>
		);
	}

	let renderedResults;
	if ( sorted ) {
		const countedResults = countBy( results );
		const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
		const sortedResults = sortBy( countedResultsArray, [ 'value', 'key' ] ).filter( result => result.value > 2 ).reverse();

		renderedResults = sortedResults.map( ( result, index ) => {
			return <SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result.key ) } terms={ terms } count={ result.value } word={ props } />;
		} );
	} else {
		renderedResults = results.map( ( result, index ) => <SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result ) } terms={ terms } word={ props } /> )
	}

	return (
		<div className={ visible ? styles.open : styles.hidden } dir={ bible.isRtlVersion( interfaceLanguage ) ? 'rtl' : 'ltr' }>
			<ol className={ styles.results }>
				{ renderedResults }
			</ol>
		</div>
	);
} );

export default withStyles( styles )( SearchBlock );
