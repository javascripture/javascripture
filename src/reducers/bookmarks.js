const bookmarks = ( state = [], action ) => {
	function referencesAreEqual( reference1, reference2 ) {
		return reference1.book === reference2.book &&
		reference1.chapter === reference2.chapter &&
		reference1.verse === reference2.verse;
	}

	switch ( action.type ) {
		case 'ADD_BOOKMARK':
			const removeBookmarkFromState = state.filter( reference => {
				return ! referencesAreEqual( reference, action.reference );
			} );
			const allBookmarksClosed = removeBookmarkFromState.map( bookmark => {
				bookmark.open = false;
				return bookmark;
			} );
			const bookmark = action.reference;
			bookmark.open = true;
			allBookmarksClosed.push( bookmark );
			return allBookmarksClosed;

		case 'REMOVE_BOOKMARK':
			return state.filter( reference => {
				return ! referencesAreEqual( reference, action.reference );
			} );

		case 'TOGGLE_BOOKMARK':
			return state.map( reference => {
				if ( referencesAreEqual( reference, action.reference ) ) {
					reference.open = ! reference.open;
					return reference;
				} else {
					reference.open = false;
					return reference;
				}
			} );


		default:
			return state;
	}
}

export default bookmarks;
