import { REHYDRATE } from 'redux-persist/constants'

const version = ( state = { left: 'original', right: 'kjv' }, action ) => {
	let returnState;
	switch ( action.type ) {
		case 'CHANGE_VERSION':
			const newVersion = {};
			newVersion[ action.side ] = action.version;

			returnState = Object.assign( {}, state, newVersion );
			break;

		case REHYDRATE:
			returnState = state;
			if ( action.payload.version ) {
				javascripture.state.version = action.payload.version;
				returnState = action.payload.version;
				if ( javascripture.modules.reference ) {
					javascripture.modules.reference.loadReferenceFromHash();
				}
			}

			break;

		default:
			returnState = state;
			break;
	}

	javascripture.state.version = returnState;
	return returnState;
}

export default version;
