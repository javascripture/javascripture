// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SearchLink = React.createClass( {
	setCurrentVerse() {
		const { index } = this.props;
		this.props.setCurrentVerse( index );
	},

	render() {
		const { reference, index } = this.props,
			className = this.props.isActive ? styles.activeReference : null;

		return (
			<li className={ className }>
				<a href={ '#' + javascripture.modules.reference.createReferenceLink( reference ) } onClick={ () => this.setCurrentVerse( false ) }>
					{ index + 1 }. { reference.book } { reference.chapter }:{ reference.verse }
				</a>
			</li>
		);
	}
} );

SearchLink.propTypes = {};

export default withStyles( styles )( SearchLink );
