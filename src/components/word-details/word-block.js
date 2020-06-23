// External dependencies
import React, { useRef } from "react";
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SearchBlock from '../search/search-block.js';
import { getHighlight } from '../strongs-color.js';
import styles from './styles.scss';
import WordBlockHeader from '../word-block-header';
import WordBlockDetails from './word-block-details';

const strongs = javascripture.data.strongsDictionary;

const WordBlock = React.memo( ( props ) => {
	const { clickedWord, open, morphology, strongsNumber, version } = props;
	const subdue = useSelector( state => state.settings.subdue );
	const wordBlock = useRef( null );
	const getSearchParameters = () => {
		return {
			clusivity: 'exclusive',
			version: version,
			lemma: strongsNumber,
			range: 'verse',
			clickedWord,
		};
	};

	const termTitle = ( { clusivity, version, lemma, range, clickedWord } ) => {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nclicked word: ' + clickedWord;
	};

	const wordDetail = strongs[ strongsNumber ];

	if ( strongsNumber === 'G3588' ) {
		return null;
	}

	if ( wordDetail ) {
		return (
			<div>
				<style>{ getHighlight( strongsNumber, subdue, null ) }</style>
				<WordBlockHeader title={ termTitle( getSearchParameters() ) } strongsNumber={ strongsNumber } version={ version } textToCopy={ wordBlock } />
				<div ref={ wordBlock }>
					<div className={ classnames( styles.wordBlock, open ? styles.visible : styles.hidden ) }>
						<WordBlockDetails morphologyProp={ morphology } strongsNumber={ strongsNumber } version={ version } />
					</div>
					<SearchBlock { ...props } terms={ getSearchParameters() } />
				</div>
			</div>
		);
	}

	return null;
} );

export default withStyles( styles )( WordBlock );
