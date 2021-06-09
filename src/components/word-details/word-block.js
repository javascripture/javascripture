// External dependencies
import React, { useRef } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import stripPointing from '../../lib/strip-pointing.js';

// Internal dependencies
import Collapsible from '../collapsible';
import { getHighlight } from '../strongs-color.js';
import styles from './styles.scss';
import WordBlockDetails from './word-block-details';
import { removeFromList, toggleListItemVisible } from '../../actions';

const strongs = javascripture.data.strongsDictionary;

const WordBlock = React.memo( ( props ) => {
	const { data, visible } = props;
	const { clickedWord, morphology, lemma, version } = data;
	const subdue = useSelector( state => state.settings.subdue );
	const wordBlockRef = useRef( null );
	const getSearchParameters = () => {
		return {
			clusivity: 'exclusive',
			version: version,
			lemma,
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

	const wordDetail = strongs[ lemma ];

	if ( lemma === 'G3588' ) {
		return null;
	}

	const dispatch = useDispatch();

	if ( wordDetail ) {
		const header = (
			<span>
				<span className={ styles.strongsNumberTitle }>{ lemma }</span>
				{ stripPointing( wordDetail.lemma ) }
			</span>
		);

		return (
			<Collapsible
				title={ termTitle( getSearchParameters() ) }
				header={ header }
				open={ visible }
				onToggle={ () => dispatch( toggleListItemVisible( props ) ) }
				className={ getClassName( lemma ) }
				textToCopy={ wordBlockRef }
				onRemove={ () => dispatch( removeFromList( props ) ) }
			>
				<style>{ getHighlight( lemma, subdue, null ) }</style>
				<div ref={ wordBlockRef }>
					<div className={ classnames( styles.wordBlock, visible ? styles.visible : styles.hidden ) }>
						<WordBlockDetails morphologyProp={ morphology } strongsNumber={ lemma } version={ version } word={ props } />
					</div>
				</div>
			</Collapsible>
		);
	}

	return null;
} );

export default WordBlock;
