import { connect } from 'react-redux';
import { fetchData } from '../actions';

import Chapter from '../components/reference/chapter';

const mapStateToProps = ( state, ownProps ) => {
	return {
		reference: state.reference,
		inSync: state.settings.inSync,
		data: state.data,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		fetchData: ( key ) => {
			dispatch( fetchData( key ) );
		}
	}
};

const ChapterContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Chapter )

export default ChapterContainer;
