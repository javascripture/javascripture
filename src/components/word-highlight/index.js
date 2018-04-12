// External dependencies
import React, { PropTypes } from 'react';

import strongsColor from '../strongs-color.js';

const WordHighlight = React.createClass( {
	render() {
		const styles = this.props.wordHighlight.map( ( lemma ) => {
			return '.' + lemma + ' { background: ' + strongsColor.get( lemma.slice( 1 ) ) + '; color: white; margin: 0 -3px; padding: 0 3px; }';
		} );

		return (
			<style>
				{ styles }
			</style>
		);
	}
} );

WordHighlight.propTypes = {};

export default WordHighlight;
