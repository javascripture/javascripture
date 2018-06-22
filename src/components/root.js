// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Footer from './footer';
import Reference from '../containers/reference';
import KeyboardShortcuts from '../containers/keyboard-shortcuts';
import Trays from './trays';
import VersionSelector from '../containers/version-selector';
import VisibleTrays from '../containers/visible-trays';
import WordHighlight from '../containers/word-highlight';

class Root extends React.Component{
	state = {
		highlightedWord: ''
	};

	getBodyStyles() {
		var bodyStyles = 'body { ';
		bodyStyles += 'font-family: ' + this.props.settings.fontFamily + ';';
		bodyStyles += 'font-size: ' + this.props.settings.fontSize + ';';
		bodyStyles += '}';

		return bodyStyles;
	}

	highlightWord = ( word ) => {
		this.setState( {
			highlightedWord: word
		} );
	};

	render() {
		return (
			<div style={{ fontFamily: 'Helvetica, Arial, sans-seif' }}>
				<style>{ this.getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ this.state.highlightedWord } />
				<Trays>
			    	<VisibleTrays />
			    </Trays>
				<VersionSelector />
				<div>
					<Reference highlightWord={ this.highlightWord } hash={ this.props.location.hash } />
				</div>
				<Footer />
			</div>
		);
	}
}

//const SettingsTrayWithStyles = withStyles( styles )( SettingsTray );

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
	}
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Root );
