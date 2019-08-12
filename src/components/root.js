// External
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Dock from './dock';
import Footer from './footer';
import ReferenceWrapper from '../components/reference-wrapper';
import KeyboardShortcuts from './keyboard-shortcuts';
import Trays from './trays';
import TrayList from './trays/tray-list';
import WordHighlight from './word-highlight';
import styles from './root.scss';

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
			<div className={ styles.root }>
				<style>{ this.getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ this.props.highlightedWord } />
				<Trays>
					<TrayList />
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
)( withStyles( styles )( Root ) );
