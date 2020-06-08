// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

// Internal dependencies
import { removeSearch, removeWord, toggleWord } from '../../actions'
import RemoveSvg from '../svg/remove.js';
import CopySvg from '../svg/copy.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';

const fill = '#fff';
const strongs = javascripture.data.strongsDictionary;

const WordBlockHeader = ( { copyToClipboard, strongsNumber, textToCopy, title, version } ) => {
	const dispatch = useDispatch();
	const wordDetail = strongs[ strongsNumber ];

	const removeWordAction = () => {
		const searchParameters = {
			clusivity: 'exclusive',
			version: version,
			lemma: strongsNumber,
			range: 'verse',
		};
		dispatch( removeWord( strongsNumber ) );
		dispatch( removeSearch( searchParameters ) );
	};

	const getClassName = ( rootNumber ) => {
		return classnames( rootNumber, styles.wordTree, styles.title )
	};

	copyToClipboard = ( event, textToCopy ) => {
		event.stopPropagation();
		const textarea = document.createElement( 'textarea' )
		textarea.value = textToCopy.current.innerText;
		document.body.appendChild( textarea );
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		event.target.focus();
	};

	return (
		<h2
			className={ getClassName( strongsNumber ) }
			title={ title }
			onClick={ () => dispatch( toggleWord( strongsNumber ) ) }>
			<span className={ styles.strongsNumberTitle }>{ strongsNumber }</span>
			{ stripPointing( wordDetail.lemma ) }
			<a className={ styles.copy } onClick={ ( event ) => copyToClipboard( event, textToCopy ) }>
				<CopySvg fill={ fill } />
			</a>
			<a className={ styles.remove } onClick={ () => removeWordAction() }>
				<RemoveSvg fill={ fill } />
			</a>
		</h2>
	);
};

export default WordBlockHeader;