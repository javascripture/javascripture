// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import mousetrap from 'mousetrap';

// Internal dependencies
import AddColumnButton from '../add-column-button';
import ReferenceSelectorMobile from '../reference-selector-mobile';
import RemoveColumnButton from '../remove-column-button';
import SyncButton from '../sync-button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { createReferenceLink } from '../../lib/reference.js';

// Component variables
let lastTimeStamp = 0;

// Internal dependencies
import styles from './styles.scss';

class VersionSelector extends React.Component{
	state = {
		reference: this.props.value,
	};

	changeVersion = ( event ) => {
		this.props.changeVersion( event.target.name, event.target.value );
		event.target.blur();
	};

	change = ( event ) => {
		this.setState( {
			reference: event.target.value,
		} );
	};

	goToReference = ( event ) => {
		event.preventDefault();
		const reference = bible.parseReference( this.refs.referenceInput.value );
		reference.book = bible.Data.books[reference.bookID - 1][0];
		if ( this.props.index === 0 || this.props.inSync ) {
			window.location.hash = createReferenceLink( reference );
		} else {
			this.props.setReference( reference, this.props.index );
		}
		this.refs.referenceInput.blur();
	};

	componentWillReceiveProps( nextProps ) {
		if ( this.refs.referenceInput ) {
			//this.refs.referenceInput.value = nextProps.value;
			this.setState( {
				reference: nextProps.value,
			} );
		}
	}

	goToReferenceField = ( event ) => {
		event.preventDefault();
		this.refs.referenceInput.focus();
		this.refs.referenceInput.selectionStart = this.refs.referenceInput.selectionEnd = 0;
		//this.refs.referenceInput.value = event.key;
		this.setState( {
			reference: event.key,
		} );
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

	renderInput() {
		return (
			<span className={ styles.inputWrapper }>
				<ReferenceSelectorMobile index={ this.props.index } version={ this.props.reference.version } inSync={ this.props.inSync } />
				<input type="text" id="goToReference" name="reference" ref="referenceInput" placeholder="Go to reference" className={ styles.input } value={ this.state.reference } onChange={ this.change } />
			</span>
		);
	}

	renderSelect() {
		const value = this.props.references[ this.props.index ].version ? this.props.references[ this.props.index ].version : '';
		return (
			<select name={ this.props.index } className={ styles.rightVersion } value={ value } onChange={ this.changeVersion }>
				{
					this.props.versions.map( ( version, index ) => (
						<option value={ version[ 0 ] } key={ index }>{ version[ 1 ] }</option>
					) )
				}
			</select>
		);
	}

	render() {
		return (
			<form onSubmit={ this.goToReference } className={ styles.versionSelectorFlexible }>
				{ this.renderInput() }
				{ this.renderSelect() }
				{ this.props.index === 0 ? <SyncButton /> : <RemoveColumnButton index={ this.props.index } /> }
				{ this.props.last && <AddColumnButton /> }

			</form>
		);
	}
}

VersionSelector.propTypes = {};

export default withStyles( styles )( VersionSelector );
