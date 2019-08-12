// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { union } from 'lodash';
import { connect } from 'react-redux';

// Internal
import { addNextChapter, addPreviousChapter } from '../../actions';
import Chapter from './chapter';
import styles from './styles.scss';

class SingleReference extends React.Component{
	render() {
		const { book, reference, index } = this.props;
		const tranlatedBook = bible.getTranslatedBookName( book, reference[ index ].version );

		return (
			<div>
				<div className={ styles.chapter }>
					<Chapter
						book={ this.props.book }
						chapter={ this.props.chapter }
						index={ this.props.index }
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		scrollChapter: state.scrollChapter,
		reference: state.reference,
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addPreviousChapter: () => {
			dispatch( addPreviousChapter( ownProps.reference ) );
		},
		addNextChapter: () => {
			dispatch( addNextChapter( ownProps.reference ) );
		}
	}
};

const SingleReferenceContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SingleReference )

export default withStyles( styles )( SingleReferenceContainer );
