// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { countBy, toPairs, sortBy } from 'lodash';
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

// Internal dependencies
import { setCurrentVerse } from '../../actions';
import SearchLink from './search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js';
import styles from './styles.scss';

class SearchBlock extends React.Component{
	renderDetails() {
		return this.props.results.map( ( result, index ) => {
			return (
				<SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result ) } terms={ this.props.terms } />
			)
		} );
	}

	renderSortedResults() {
		const countedResults = countBy( this.props.results );
		const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
		const sortedResults = sortBy( countedResultsArray, [ 'value', 'key' ] ).filter( result => result.value > 2 ).reverse();

		return sortedResults.map( ( result, index ) => {
			return <SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result.key ) } terms={ this.props.terms } count={ result.value } />;
		} );
	}

	render() {
		if ( ! this.props.results ) {
			return ( <div className={ styles.noResults }>Loading…</div>);
		}

		if ( this.props.results.length === 0 || typeof this.props.results === 'string' ) {
			return (
				<div className={ this.props.open ? styles.noResults : styles.hidden }>
					No results.
				</div>
			);
		}

		return (
			<div className={ this.props.open ? null : styles.hidden }>
				<ol className={ styles.results }>
					{ this.props.sorted && this.renderSortedResults() || this.renderDetails() }
				</ol>
			</div>
		);
	}
}

SearchBlock.propTypes = {};

function getSearchResults( searchResults, terms ) {
	const searchResultsData = searchResults.find( searchResult => isEqual( searchResult.terms, terms ) );

	if ( searchResultsData ) {
		return searchResultsData.results;
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		results: getSearchResults( state.searchResults, ownProps.terms )
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		setCurrentVerse: ( index ) => {
			dispatch( setCurrentVerse( ownProps.terms, index ) );
		},
	}
};

const SearchBlockContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SearchBlock )

export default withStyles( styles )( SearchBlockContainer );
