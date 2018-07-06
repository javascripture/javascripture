// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { createReferenceLink } from '../../lib/reference.js';

// Internal dependencies
import styles from '../version-selector/styles.scss';

class SecondaryVersionSelector extends React.Component{
	changeVersion =( event ) => {
		this.props.changeVersion( event.target.name, event.target.value );
	};

	goToReference = ( event ) => {
		event.preventDefault();
		const reference = bible.parseReference( this.refs.secondaryReferenceInput.value );
		reference.book = bible.Data.books[reference.bookID - 1][0];
		console.log(reference)
		this.props.setSecondaryReference( reference );
		this.refs.secondaryReferenceInput.blur();
	};

	componentWillReceiveProps( nextProps ) {
		this.refs.secondaryReferenceInput.value = nextProps.value;
	}

	render() {
		return (
			<form className={ styles.versionSelector } onSubmit={ this.goToReference }>
				<select name="left" className={ styles.leftVersion } value={ this.props.version.left } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
				<input type="text" id="goToReference" name="reference" ref="secondaryReferenceInput" placeholder="Go to reference" className={ styles.input } defaultValue={ this.props.value } />
			</form>
		);
	}
}

SecondaryVersionSelector.propTypes = {};

export default withStyles( styles )( SecondaryVersionSelector );
