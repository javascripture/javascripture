// External dependencies
import React, { useRef } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import stripPointing from '../../lib/strip-pointing.js';

// Internal dependencies
import Collapsible from '../collapsible';
import SearchBlock from '../search/search-block.js';
import { getHighlight } from '../strongs-color.js';
import styles from './styles.scss';
import WordBlockDetails from './word-block-details';
import { removeSearch, removeWord, toggleWord } from '../../actions'

const strongs = javascripture.data.strongsDictionary;

const WordBlock = React.memo( ( props ) => {
	const { clickedWord, open, morphology, strongsNumber, version } = props;
	const subdue = useSelector( state => state.settings.subdue );
	const wordBlockRef = useRef( null );
	const getSearchParameters = () => {
		return {
			clusivity: 'exclusive',
			version: version,
			lemma: strongsNumber,
			range: 'verse',
			clickedWord,
		};
	};

	const getClassName = ( rootNumber ) => {
		return classnames( rootNumber, styles.wordTree );
	};

	const termTitle = ( { clusivity, version, lemma, range, clickedWord } ) => {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nclicked word: ' + clickedWord;
	};

	const wordDetail = strongs[ strongsNumber ];

	if ( strongsNumber === 'G3588' ) {
		return null;
	}

	const dispatch = useDispatch();
	const onRemove = () => {
		const searchParameters = {
			clusivity: 'exclusive',
			version: version,
			lemma: strongsNumber,
			range: 'verse',
		};
		dispatch( removeWord( strongsNumber ) );
		dispatch( removeSearch( searchParameters ) );
	};

	if ( wordDetail ) {
		const header = (
			<span>
				<span className={ styles.strongsNumberTitle }>{ strongsNumber }</span>
				{ stripPointing( wordDetail.lemma ) }
			</span>
		);

		return (
			<Collapsible
				title={ termTitle( getSearchParameters() ) }
				header={ header }
				open={ open }
				onToggle={ () => dispatch( toggleWord( strongsNumber ) ) }
				className={ getClassName( strongsNumber ) }
				textToCopy={ wordBlockRef }
				onRemove={ onRemove }
			>
				<style>{ getHighlight( strongsNumber, subdue, null ) }</style>
				<div ref={ wordBlockRef }>
					<div className={ classnames( styles.wordBlock, open ? styles.visible : styles.hidden ) }>
						<WordBlockDetails morphologyProp={ morphology } strongsNumber={ strongsNumber } version={ version } />
					</div>
					<SearchBlock { ...props } terms={ getSearchParameters() } />
				</div>
			</Collapsible>
		);
	}

	return null;
} );

export default withStyles( styles )( WordBlock );
