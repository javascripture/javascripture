// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeSearch, removeWord, toggleWord } from '../../actions'
import RemoveSvg from '../svg/remove.js';
import styles from './styles.scss';
import CopyToClipboard from '../copy-to-clipboard';

const fill = '#fff';
const strongs = javascripture.data.strongsDictionary;

const WordBlockHeader = React.memo( ( { children, className, strongsNumber, textToCopy, title, version } ) => {
	const dispatch = useDispatch();

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

	return (
		<h2
			className={ classnames( className, styles.title ) }
			title={ title }
			onClick={ () => dispatch( toggleWord( strongsNumber ) ) }>
				{ children }
				<span className={ styles.copy }>
					<CopyToClipboard fill={ fill } textToCopy={ textToCopy } />
				</span>
				<a className={ styles.remove } onClick={ () => removeWordAction() }>
					<RemoveSvg fill={ fill } />
				</a>
		</h2>
	);
} );

export default withStyles( styles )( WordBlockHeader );
