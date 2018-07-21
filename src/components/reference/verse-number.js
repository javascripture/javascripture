// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, showCrossReferences } from '../../actions';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class VerseNumber extends React.Component{
	showCrossReferences = () => {
		this.props.showCrossReferences( {
			book: this.props.book,
			chapter: this.props.chapter,
			verse: this.props.verse
		} );
	};

	render() {
		return (
			<span onClick={ this.showCrossReferences } className={ styles.verseNumber }>{ this.props.verse + 1 }. </span>
		);
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		showCrossReferences: ( reference ) => {
			dispatch( showCrossReferences( reference ) );
			dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
		}
	};
};

export default connect(
  null,
  mapDispatchToProps,
)( withStyles( styles )( VerseNumber ) );
