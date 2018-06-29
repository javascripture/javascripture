// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
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

export default withStyles( styles )( KJVDef );
