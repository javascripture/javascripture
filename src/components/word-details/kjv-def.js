// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const KJVDef = React.createClass( {
	searchWord() {
		console.log( this.props );
	},

	render() {
		return <span className={ styles.kjvDef } onClick={ this.searchWord }>{ this.props.word }</span>;
	}
} );

KJVDef.propTypes = {};

export default withStyles( styles )( KJVDef );
