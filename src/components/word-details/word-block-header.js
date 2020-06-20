// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

// Internal dependencies
import { removeSearch, removeWord, toggleWord } from '../../actions'
import RemoveSvg from '../svg/remove.js';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import CopyToClipboard from '../copy-to-clipboard';

const fill = '#fff';
const strongs = javascripture.data.strongsDictionary;

const WordBlockHeader = React.memo( ( { strongsNumber, textToCopy, title, version } ) => {
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

	return (
		<h2
			className={ getClassName( strongsNumber ) }
			title={ title }
			onClick={ () => dispatch( toggleWord( strongsNumber ) ) }>
			<span className={ styles.strongsNumberTitle }>{ strongsNumber }</span>
			{ stripPointing( wordDetail.lemma ) }
			<span className={ styles.copy }>
				<CopyToClipboard fill={ fill } textToCopy={ textToCopy } />
			</span>
			<a className={ styles.remove } onClick={ () => removeWordAction() }>
				<RemoveSvg fill={ fill } />
			</a>
		</h2>
	);
} );

export default WordBlockHeader;
