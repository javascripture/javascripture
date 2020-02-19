// External
import React from 'react';
import classnames from 'classnames';

// Internal
import Verse from './verse';
import VerseNumber from './verse-number';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const getVerseWrapperStyle = ( book, version ) => {
	if ( bible.isRtlVersion( version, book ) ) {
		return {
			direction: 'rtl'
		};
	}

	return {};
};

const getClassName = ( book, version ) => {
	if ( ( version === 'original' || version === 'accented' ) && bible.Data.otBooks.indexOf( book ) > -1 ) {
		return classnames( styles.verse, styles.hebrew );
	}

	if ( version === 'OPV' || version === 'TPV' || version === 'NMV' ) {
		return classnames( styles.verse, styles.farsi );
	}

	return styles.verse
};

const VerseWrapper =  React.memo( ( { book, version, chapter, verseNumber, verseData, index } ) => {
	return (
		<div className={ styles.verseWrapper } style={ getVerseWrapperStyle( book, version ) }>
			<VerseNumber book={ book } chapter={ chapter } verse={ verseNumber } />
			<span className={ getClassName( book, version ) }>
				<Verse verse={ verseData } index={ index } version={ version } />
			</span>
		</div>
	);
} );

export default withStyles( styles )( VerseWrapper );
