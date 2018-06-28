// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import mousetrap from 'mousetrap';

// Internal dependencies
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { createReferenceLink } from '../../lib/reference.js';

// Component variables
let lastTimeStamp = 0;

// Internal dependencies
import styles from './styles.scss';

class VersionSelector extends React.Component{
	changeVersion =( event ) => {
		this.props.changeVersion( event.target.name, event.target.value );
	};

	goToReference = ( event ) => {
		event.preventDefault();
		const reference = bible.parseReference( this.refs.referenceInput.value );
		reference.book = bible.Data.books[reference.bookID - 1][0];
		window.location.hash = createReferenceLink( reference );
		this.refs.referenceInput.blur();
	};

	componentWillReceiveProps( nextProps ) {
		this.refs.referenceInput.value = nextProps.value;
	}

	goToReferenceField = ( event ) => {
		this.refs.referenceInput.focus();
		this.refs.referenceInput.selectionStart = this.refs.referenceInput.selectionEnd = 0;
		this.refs.referenceInput.value = event.key;
	}

	componentDidMount() {
		mousetrap.bind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReferenceField );
	}

	componentWillUnmount() {
		mousetrap.unbind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReferenceField );
	}

	render() {
		return (
			<form className={ styles.versionSelector } onSubmit={ this.goToReference } id="dock">
				<select name="left" className={ styles.leftVersion } value={ this.props.version.left } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
				<input type="text" id="goToReference" name="reference" ref="referenceInput" placeholder="Go to reference" className={ styles.input } defaultValue={ this.props.value } />
				<select name="right" className={ styles.formField } value={ this.props.version.right } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
			</form>
		);
	}
}

VersionSelector.propTypes = {};

export default withStyles( styles )( VersionSelector );
