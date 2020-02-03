// External
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Sidebar from 'react-sidebar';

// Internal
import Dock from './dock';
import Footer from './footer';
import ReferenceWrapper from '../components/reference-wrapper';
import KeyboardShortcuts from './keyboard-shortcuts';
import Trays from './trays';
import TrayList from './trays/tray-list';
import WordHighlight from './word-highlight';
import styles from './root.scss';
import { toggleSidebar } from '../actions'

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
			<Sidebar
				sidebar={
					<Trays>
						<TrayList />
					</Trays>
				}
				open={ this.props.sidebar }
				onSetOpen={this.props.toggleSidebar }
				styles={{
					sidebar: { background: "white", overflowY: "none", width: "320px", zIndex: "10" },
					overlay: { disply: "none", bottom: "auto", right: "auto" },
					content: { background: "white" },
				}}
			>
				<div className={ styles.root }>
					<style>{ this.getBodyStyles() }</style>
					<KeyboardShortcuts />
					<WordHighlight word={ this.props.highlightedWord } />
					<Dock />
					<ReferenceWrapper />
					<Footer />
				</div>
			</Sidebar>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		settings: state.settings,
		sidebar: state.sidebar,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		toggleSidebar: () => {
			dispatch( toggleSidebar() );
		},
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( withStyles( styles )( Root ) );
