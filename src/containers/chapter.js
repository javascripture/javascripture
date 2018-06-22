import { connect } from 'react-redux';

import Chapter from '../components/reference/chapter';

const mapStateToProps = ( state, ownProps ) => {
	return {
		version: state.version
	}
};

const ChapterContainer = connect(
 	mapStateToProps
)( Chapter )

export default ChapterContainer;
