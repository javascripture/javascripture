// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Dock from './dock';
import Footer from './footer';
import ReferenceWrapper from '../containers/reference-wrapper';
import KeyboardShortcuts from '../containers/keyboard-shortcuts';
import Trays from './trays';
import VisibleTrays from '../containers/visible-trays';
import WordHighlight from '../containers/word-highlight';

class Root extends React.Component{
	getBodyStyles() {
		var bodyStyles = 'body { ';
		bodyStyles += 'font-family: ' + this.props.settings.fontFamily + ';';
		bodyStyles += 'font-size: ' + this.props.settings.fontSize + ';';
		bodyStyles += '}';
		return bodyStyles;
	}

	render() {
		return (
			<div className="javascripture-wrapper">
				<style>{ this.getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ this.props.highlightedWord } />
				<Trays>
					<VisibleTrays />
				</Trays>
				<Dock />
				<ReferenceWrapper />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings
	};
};


export default connect(
	mapStateToProps,
)( Root );
