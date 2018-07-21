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
		if ( this.props.index === 0 ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			this.props.setReference( reference, this.props.index );
		}
		this.refs.referenceInput.blur();
	};

	componentWillReceiveProps( nextProps ) {
		if ( this.refs.referenceInput ) {
			this.refs.referenceInput.value = nextProps.value;
		}
	}

	goToReferenceField = ( event ) => {
		event.preventDefault();
		this.refs.referenceInput.focus();
		this.refs.referenceInput.selectionStart = this.refs.referenceInput.selectionEnd = 0;
		this.refs.referenceInput.value = event.key;
	}

	componentDidMount() {
		if ( this.props.index === 0 ) {
			mousetrap.bind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReferenceField );
		}
	}

	componentWillUnmount() {
		if ( this.props.index === 0 ) {
			mousetrap.unbind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReferenceField );
		}
	}

	render() {
		const value = this.props.references[ this.props.index ].version ? this.props.references[ this.props.index ].version : '';
		return (
			<form onSubmit={ this.goToReference } id="dock">
				<select name={ this.props.index } className={ styles.leftVersion } defaultValue={ value } onChange={ this.changeVersion }>
					<option value="original">Original</option>
					<option value="kjv">KJV</option>
					<option value="web">WEB</option>
					<option value="lc">Literal Consistent</option>
				</select>
				{ ( this.props.index === 0 || ! this.props.inSync ) && <input type="text" id="goToReference" name="reference" ref="referenceInput" placeholder="Go to reference" className={ styles.input } defaultValue={ this.props.value } /> }
			</form>
		);
	}
}

VersionSelector.propTypes = {};

export default withStyles( styles )( VersionSelector );
