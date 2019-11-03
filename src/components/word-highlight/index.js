// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Internal
import { getHighlight, getHighlightBorder } from '../strongs-color.js';

class WordHighlight extends React.Component{
	render() {
		return (
			<style>
				{ this.props.word && this.props.word.split(/[/, ]/).map( word => {
					if ( word === 'added' || word === 'divineName' ) {
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

const mapStateToProps = ( state, ownProps ) => {
	return {
		wordHighlight: state.wordHighlight,
		settings: state.settings,
		searchSelect: state.searchSelect,
	}
};

const WordHighlightContainer = connect(
	mapStateToProps
)( WordHighlight )

export default WordHighlightContainer;
