// External dependencies
import classnames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.scss';
import { selectWord } from '../../actions';

const WordBlockLink = React.memo( ( { strongsNumber, version } ) => {
	const subdue = useSelector( state => state.settings.subdue );
	const dispatch = useDispatch();

	const getClassName = ( strongsNumber ) => {
		return classnames( strongsNumber, styles.wordTree )
	};

	const highlight = ( strongsNumber ) => {
		window.updateAppComponent( 'highlightedWord', strongsNumber );
	};

	const unHighlight = () => {
		window.updateAppComponent( 'highlightedWord', null );
	};

	const searchForWord = ( strongsNumber ) => {
		dispatch( selectWord( {
			lemma: strongsNumber,
			version,
		} ) );
	};

	return (
		<span><a className={ getClassName( strongsNumber ) }
			onClick={ () => searchForWord( strongsNumber ) }
			onMouseOver={ () => highlight( strongsNumber ) }
			onMouseOut={ unHighlight }>
			{ strongsNumber }
		</a> </span>
	)
} );

export default WordBlockLink;
