import isEqual from 'lodash/isEqual';

export const getSearchResults = ( searchResults, terms ) => {
	const searchResultsData = searchResults.find( searchResult => isEqual( searchResult.terms, terms ) );

	if ( searchResultsData ) {
		return searchResultsData.results;
	}
};
