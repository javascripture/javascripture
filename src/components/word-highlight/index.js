// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

import { getStyle } from '../strongs-color.js';

class WordHighlight extends React.Component{
	render() {
		return (
			<style>
				{ this.props.word && this.props.word.split(/[/, ]/).map( word => {
					return ( word === 'added' ) ? null : getStyle( word, this.props.settings.subdue, this.props.settings.highlightWordsWith );
				} ) }
			</style>
		);
	}
}

WordHighlight.propTypes = {};

export default WordHighlight;
