// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const KJVDef = React.createClass( {
	searchWord() {
		const searchParameters = {
			clusivity: 'exclusive',
			language: 'kjv',
			lemma: this.props.strongsNumber,
			range: 'verse',
			word: this.props.word
		};

		searchHelperFunction( searchParameters, 'search' );
	},

	render() {
		return <span className={ styles.fakeLink } onClick={ this.searchWord }>{ this.props.word }</span>;
	}
} );

KJVDef.propTypes = {};

export default withStyles( styles )( KJVDef );
