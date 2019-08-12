// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

// Internal dependencies
import { addSearch, setTrayVisibilityFilter } from '../../actions';
import styles from './styles.scss';

class KJVDef extends React.Component{
	searchWord = () => {
		const searchParameters = {
			clusivity: 'exclusive',
			language: 'kjv',
			version: 'kjv',
			lemma: this.props.strongsNumber,
			range: 'verse',
			word: this.props.word,
			morph: '',
		};

		this.props.addSearch( searchParameters, 'search' );
	};

	render() {
		return <span className={ styles.fakeLink } onClick={ this.searchWord }>{ this.props.word }</span>;
	}
}

KJVDef.propTypes = {};

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

export default withStyles( styles )( KJVDefContainer );
