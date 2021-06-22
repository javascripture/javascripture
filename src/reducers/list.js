import { isEqual } from 'lodash';

const initialState = [];

const list = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'ADD_TO_LIST':
			const id = JSON.stringify( action.item.data );
			const findInState = state.filter( item => isEqual( item.data, action.item.data ) );
			if ( findInState.length > 0 ) {
				return [
					...state.map( item => {
						item.visible = findInState[ 0 ].id === item.id;
						return item;
					} )
				];
			}

			return [
				...state.map( item => {
					if ( item.listType === action.item.listType ) {
						item.visible = false;
					}
					return item;
				} ),
				{ ...action.item, id }
			]
		case 'REMOVE_FROM_LIST':
			return [
				...state.filter( item => item.id !== action.item.id )
			]
		case 'REMOVE_TYPE_FROM_LIST':
			return [
				...state.filter( item => item.listType !== action.listType )
			]
		case 'TOGGLE_LIST_ITEM_VISIBLE':
			return [
				...state.map( ( item ) => {
					if ( item.id === action.item.id ) {
						item.visible = ! item.visible;
					} else if ( action.item.listType === item.listType ) {
						item.visible = false;
					}
					return item;
				} )
			]
		case 'ADD_SEARCH_RESULTS':
			return [
				...state.map( item => {
					if ( isEqual( action.terms, item.data ) ) {
						item.results = action.results;
					}
					return item;
				} )
			]
		case 'SET_CURRENT_LIST_RESULT':
			return [
				...state.map( item => {
					if ( item.id === action.id ) {
						item.current = action.index;
					} else {
						delete( item.current )
					}
					return item;
				} )
			]
		default:
			return state
	}
}

export default list;
