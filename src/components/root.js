// External
import React from 'react';
import { connect } from 'react-redux';

// Internal
import Footer from './footer'
import Trays from './trays';
import VisibleTrays from '../containers/visible-trays';

const Root = React.createClass( {
	getBodyStyles() {
		var bodyStyles = 'body { ';
		bodyStyles += 'font-family: ' + this.props.settings.fontFamily + ';';
		bodyStyles += 'font-size: ' + this.props.settings.fontSize + ';';
		bodyStyles += '}';

		return bodyStyles;
	},

	render() {
		return (
			<div style={{ fontFamily: 'Helvetica, Arial, sans-seif' }}>
				<style>{ this.getBodyStyles() }</style>
				<Trays>
			    	<VisibleTrays />
			    </Trays>

				<div style={{ marginTop: '1.5em' }}>
					{ this.props.children }
				</div>

				<Footer />
			</div>
		);
	}
} );

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
