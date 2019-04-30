// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

import { getHighlight, getHighlightBorder } from '../strongs-color.js';

class WordHighlight extends React.Component{
	render() {
		return (
			<style>
				{ this.props.word && this.props.word.split(/[/, ]/).map( word => {
					if ( word === 'added' || word === 'divineName' || word === 'G3588' ) {
						return;
					}

					if ( this.props.searchSelect ) {
						return getHighlightBorder( word, this.props.settings.subdue, this.props.settings.highlightWordsWith );
					}

					return getHighlight( word, this.props.settings.subdue, this.props.settings.highlightWordsWith );
				} ) }
			</style>
		);
	}
}

WordHighlight.propTypes = {};

export default WordHighlight;
