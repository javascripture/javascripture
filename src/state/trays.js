const initialState = {
	isFetching: false,
	results: null
};

export function domainSearch( state = initialState, action ) {
	const { type, results } = action;

	switch ( type ) {
		case 'DOMAIN_SEARCH_FETCH':
			return Object.assign( {}, state, { isFetching: true } );
		case 'DOMAIN_SEARCH_FETCH_COMPLETED':
			return Object.assign( {}, state, {
				isFetching: false,
				results: results
			} );
		default:
			return state;
	}
}