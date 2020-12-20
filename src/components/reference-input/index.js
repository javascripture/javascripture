// External dependencies
import React, { Fragment } from 'react';
import mousetrap from 'mousetrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect, useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { setReference, setScrollChapter } from '../../actions'
import { createReferenceLink } from '../../lib/reference.js';

// Internal dependencies
import styles from './styles.scss';

class ReferenceInput extends React.Component{
	state = {
		reference: this.props.value,
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

	render() {
		return (
			<div className={ styles.versionSelectorFlexible }>
				<form onSubmit={ this.goToReference } className={ styles.versionSelectorInput} >
					<input type="text" id="goToReference" name="reference" ref="referenceInput" placeholder="Go to reference" className={ styles.input } value={ this.state.reference } onChange={ this.change } />
				</form>
			</div>
		);
	}
}

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

const mapStateToProps = ( state, ownProps ) => {
	let index = state.settings.inSync ? 0 : ownProps.index;
	// in case the references get deleted before the other columns
	//if ( 'undefined' === typeof state.reference[ index ] ) {
	//	index = 0;
	//}
	const version = state.reference[ index ].version;
	return {
		inSync: state.settings.inSync,
		value: getReferenceValue( state, index, version ),
	}
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		setReference: ( reference, index ) => {
			dispatch( setReference( reference, index ) );
			dispatch( setScrollChapter( reference.book, reference.chapter, index ) );
		},
	}
};

const ReferenceInputContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( ReferenceInput );

export default withStyles( styles )( ReferenceInputContainer );
