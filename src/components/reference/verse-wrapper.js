// External
import React, { useRef } from 'react';
import classnames from 'classnames';

// Internal
import CopyToClipboard from '../copy-to-clipboard';
import Verse from './verse';
import VerseNumber from './verse-number';
import styles from './styles.scss';

const getClassName = ( book, version ) => {
	if ( ( version === 'original' || version === 'accented' ) && bible.Data.otBooks.indexOf( book ) > -1 ) {
		return classnames( styles.verse, styles.hebrew );
	}

	if ( version === 'OPV' || version === 'TPV' || version === 'NMV' ) {
		return classnames( styles.verse, styles.farsi );
	}

	return styles.verse
};

const VerseWrapper = React.memo( ( { book, version, chapter, verse, isCurrentRef } ) => {
	const verseWrapperRef = useRef( null );
	const reference = { book, chapter: chapter - 1, verse: verse - 1 };

	return (
		<div className={ classnames( styles.verseWrapper, isCurrentRef ? styles.isCurrent : null ) } dir={ bible.isRtlVersion( version, book ) ? 'rtl' : 'ltr' } ref={ verseWrapperRef }>
			<div className={ styles.helpers }>
				<VerseNumber book={ book } chapter={ chapter } verse={ verse } />
				<span className={ styles.hidden }>
					<CopyToClipboard fill={ '#999' } textToCopy={ verseWrapperRef } />
				</span>
			</div>
			<div className={ getClassName( book, version ) }>
				<Verse reference={ reference } version={ version } />
			</div>
		</div>
	);
} );

export default VerseWrapper;
