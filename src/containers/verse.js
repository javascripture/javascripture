import { connect } from 'react-redux';
import Verse from '../components/reference/verse';

const mapStateToProps = ( state, ownProps ) => {
	return {
		references: state.references
	}
};

const VerseContainer = connect(
 	mapStateToProps
)( Verse )

export default VerseContainer;
