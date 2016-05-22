// External
import React from 'react';

// Internal
import strongsColor from '../strongs-color.js';

export default React.createClass( {
	getInitialState() {
		return {
			style: {}
		};
	},

	getLemma() {
		if ( this.props.lemma) {
			return this.props.lemma.split( ' ' ).filter( function( lemma ) {
				return lemma != 'G3588';
			} );
		}

		return [];
	},

	wordStyle() {
		let wordStyle = {};
		if ( this.props.highlighted && this.props.highlighted.indexOf( this.props.lemma ) > -1 ) {
			if ( this.props.word ) {
				wordStyle = {
					color: 'white',
					backgroundColor: strongsColor.get( this.getLemma()[ 0 ] ),
					margin: '0 -3px',
					padding: '0 3px'
				};
			}
		}

		if ( this.props.textTransform ) {
			wordStyle.textTransform = this.props.textTransform;
		}

		return wordStyle;
	},

	render() {
		return (
			<span
				onMouseOver={ this.props.highlightOn }
				onMouseOut={ this.props.highlightOff }
				title={ this.props.lemma ? this.props.lemma : null }
				style={ this.wordStyle() }>
				{ this.props.word }
			</span>
		);
	}

} );
