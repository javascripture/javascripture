const initialState = [ {
	open: false,
	bookIndex: null,
	bookName: null,
}, {
	open: false,
	bookIndex: null,
	bookName: null,
} ];

const openState = {
	open: true,
	bookIndex: null,
	bookName: null,
};

const referenceSelectorMobile = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'TOGGLE_REFERENCE_SELECTOR_MOBILE':
			const newState = [ {
				open: false,
				bookIndex: null,
				bookName: null,
			}, {
				open: false,
				bookIndex: null,
				bookName: null,
			} ];

			newState[ action.index ].open = ! state[ action.index ].open;
			return newState;

		case 'REFERENCE_SELECTOR_MOBILE_SET_BOOK':
			const setBookState = [ ...state ];
			setBookState[ action.index ].bookName = action.bookName;
			setBookState[ action.index ].bookIndex = action.bookIndex;

			return setBookState;

		default:
			return state;
	}
}

export default referenceSelectorMobile;
