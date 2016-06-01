var bible = javascripture.data.bible;

// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import keyboardShortcut from 'keyboard-shortcut';

// Internal
import styles from './style.scss';

const ReferenceInput = React.createClass( {
	getInitialState() {
		const { book, chapter } = this.props;
		return {
			value: book + ' ' + chapter
		}
	},

	componentWillMount() {
		const { book, chapter } = this.props;

		this.setState( {
			value: book + ' ' + chapter
		} );

		window.addEventListener( 'keydown', this.keyHandler, false );
	},

	componentWillReceiveProps( nextProps ) {
		const { book, chapter } = nextProps;

		this.setState( {
			value: book + ' ' + chapter
		} );

	},

	keyHandler: function( event ) {
		if ( ! event.metaKey ) {
			this.refs.referenceInputField.focus();
		}
	},

	onFocus( event ) {
		event.target.select()
	},

	onChange( event ) {
		this.setState( {
			value: event.target.value
		} );
	},

	onSubmit( event ) {
		event.preventDefault();
		this.refs.referenceInputField.blur();
		this.setState( this.getInitialState() );
		this.props.goToReference( this.state.value );
	},

	render() {
		return (
			<form className={ styles.referenceInput } onSubmit={ this.onSubmit }>
				<input
					className={ styles.referenceInputField }
					onChange={ this.onChange }
					onFocus={ this.onFocus }
					ref="referenceInputField"
					value={ this.state.value } />
			</form>
		);
	}
} );

export default withStyles( styles )( ReferenceInput );
