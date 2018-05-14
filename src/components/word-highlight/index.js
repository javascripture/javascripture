// External dependencies
import React, { PropTypes } from 'react';

import strongsColor from '../strongs-color.js';

const WordHighlight = React.createClass( {
	render() {
		return (
			<style>
				{ this.props.word && this.props.word.split(/[/, ]/).map( word => (
					'span.' + word + ' { background: ' + strongsColor.get( word.slice( 1 ) ) + '; color: white; margin: 0 -2px; padding: 0 2px; }'
				) ) }
			</style>
		);
	}
} );

WordHighlight.propTypes = {};

export default WordHighlight;
