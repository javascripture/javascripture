// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

import strongsColor from '../strongs-color.js';

class WordHighlight extends React.Component{
	render() {
		return (
			<style>
				{ this.props.word && this.props.word.split(/[/, ]/).map( word => {
					const color = strongsColor.get( word.slice( 1 ), this.props.settings.subdue );
					return ( word === 'added' ) ? null : 'span.' + word + ' { background: ' + color + '; color: white; margin: 0 -2px; padding: 0 2px; }'
				} ) }
			</style>
		);
	}
}

WordHighlight.propTypes = {};

export default WordHighlight;
