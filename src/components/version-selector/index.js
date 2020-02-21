// External dependencies
import React from 'react';
import mousetrap from 'mousetrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

// Internal dependencies
import { changeVersion, fetchData, setReference, setScrollChapter } from '../../actions'
import AddColumnButton from '../add-column-button';
import ReferenceSelectorMobile from '../reference-selector-mobile';
import RemoveColumnButton from '../remove-column-button';
import SyncButton from '../sync-button';
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
		if ( this.props.index === 1 ) {
			mousetrap.bind( [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ], this.goToReferenceField );
		}
	}

	componentWillUnmount() {
		if ( this.props.index === 0 ) {
			mousetrap.unbind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReferenceField );
		}
		if ( this.props.index === 1 ) {
			mousetrap.unbind( [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ], this.goToReferenceField );
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
			<span>
				<select name={ this.props.index } className={ styles.rightVersion } value={ value } onChange={ this.changeVersion }>
					{
						Object.keys( this.props.interfaceLanguages ).map( ( key ) => {
							const versionsForLanguage = Object.keys( this.props.versions ).filter( version => this.props.versions[ version ].language === key );
							const versionOption = versionsForLanguage.map( version => {
								return <option value={ version } key={ version } title={ this.props.versions[ version ].name }>{ version } - { this.props.versions[ version ].name }</option>
							} );
							return <optgroup key={ 'optgroup' + key } label={ this.props.interfaceLanguages[ key ] }>{ versionOption }</optgroup>;
						} )
					}
				</select>
			</span>
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


const getBookFromState = ( state, index ) => {
	if ( state.scrollChapter[ index ] && state.scrollChapter[ index ].book ) {
		return state.scrollChapter[ index ].book;
	} else {
		if ( state.reference[ index ] ) {
			return state.reference[ index ].book;
		}
	}
}
const getReferenceValue = ( state, index, version ) => {
	const chapter = ( state.scrollChapter[ index ] && state.scrollChapter[ index ].chapter ) ? state.scrollChapter[ index ].chapter : state.reference[ index ].chapter;
	const book = getBookFromState( state, index );
	const tranlatedBook = bible.getTranslatedBookName( book, version );
	return tranlatedBook + ' ' + chapter;
};

const getLanguage = ( state, index ) => {
	const book = getBookFromState( state, index );
	if ( bible.Data.otBooks.indexOf( book ) > -1 ) {
		return 'HEB';
	}
	return 'GRK';
}

const mapStateToProps = ( state, ownProps ) => {
	const index = state.settings.inSync ? 0 : ownProps.index;
	const version = state.reference[ ownProps.index ].version;
	return {
		inSync: state.settings.inSync,
		references: state.reference,
		value: getReferenceValue( state, index, version ),
		versions: bible.Data.supportedVersions,
		interfaceLanguages: bible.Data.interfaceLanguages,
		language: getLanguage( state, index ),
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		changeVersion: ( index, version ) => {
			dispatch( changeVersion( index, version ) );
		},
		setReference: ( reference, index ) => {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		},
	}
};

const VersionSelectorContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( VersionSelector );

export default withStyles( styles )( VersionSelectorContainer );
