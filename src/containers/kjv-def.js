// External
import { connect } from 'react-redux';

// Internal
import { addSearch, setTrayVisibilityFilter } from '../actions';
import KJVDef from '../components/word-details/kjv-def';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addSearch: ( terms ) => {
			dispatch( addSearch( terms, 'search' ) );
			dispatch( setTrayVisibilityFilter( 'search' ) )
		}
	}
};

const KJVDefContainer = connect(
 	null,
 	mapDispatchToProps
)( KJVDef )

export default KJVDefContainer;
