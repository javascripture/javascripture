// External
import { connect } from 'react-redux';

// Internal
import Search from '../components/search';

const mapStateToProps = ( state, ownProps ) => {
	return {};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {};
};

const SearchContainer = connect(
 	mapStateToProps,
 	mapDispatchToProps
)( Search )

export default SearchContainer;
