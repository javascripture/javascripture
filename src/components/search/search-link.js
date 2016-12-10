// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SearchLink = React.createClass( {
	setCurrentVerse() {
		const { reference } = this.props;
		this.props.setCurrentVerse( reference );
	},

	render() {
		const { reference } = this.props,
			className = this.props.activeReference === this.props.index ? styles.activeReference : null;

		return (
			<li className={ className }>
				<a href={ '#' + javascripture.modules.reference.createReferenceLink( reference ) } onClick={ () => this.setCurrentVerse( false ) }>
					{ reference.book } { reference.chapter }:{ reference.verse }
				</a>
			</li>
		);
	}
} );

SearchLink.propTypes = {};

export default withStyles( styles )( SearchLink );
