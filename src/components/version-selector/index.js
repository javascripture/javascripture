// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const VersionSelector = React.createClass( {
	changeVersion( event ) {
		this.props.changeVersion( event.target.name, event.target.value );
	},

	goToReference( event ) {
		event.preventDefault();
		const reference = bible.parseReference( this.refs.referenceInput.value );
		reference.book = bible.Data.books[reference.bookID - 1][0];
		window.location.hash = javascripture.modules.reference.createReferenceLink( reference )
		this.refs.referenceInput.blur();
	},

	render() {
		return (
			<form className={ styles.versionSelector } onSubmit={ this.goToReference }>
				<select name="left" className={ styles.leftVersion } value={ this.props.version.left } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
				<input type="text" id="goToReference" name="reference" ref="referenceInput" placeholder="Go to reference" className={ styles.input } />
				<select name="right" className={ styles.formField } value={ this.props.version.right } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
			</form>
		);
	}
} );

VersionSelector.propTypes = {};

export default withStyles( styles )( VersionSelector );
