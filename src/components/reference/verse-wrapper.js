// External
import React from 'react';
import classnames from 'classnames';

// Internal
import Verse from './verse';
import VerseNumber from './verse-number';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { mapVersionToData } from '../../lib/reference';

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

const placeholder = ( key ) => {
	return (
		<div className={ styles.verseWrapper } key={ key }>
			<span className={ styles.placeholder }>&nbsp;Loading</span>
			<span className={ styles.placeholder } style={ { width: ( Math.random() * 100 ) + '%' } }>&nbsp;</span>
		</div>
	);
}

const notAvailable = ( key ) => {
	return (
		<div className={ styles.verseWrapper } key={ key }>Book not available</div>
	);
}

const VerseWrapper =  React.memo( ( { data, book, version, chapter, verseNumber, index } ) => {
	const language = mapVersionToData( book, version );
	if ( ! data[ language ] || Object.keys( data[ language ] ).length === 0 ) {
		return placeholder( index + verseNumber);
	}

	if ( ! data[ language ][ book ] ) {
		return notAvailable( index + verseNumber );
	}

	const verseData = data[ language ][ book ][ chapter - 1 ][ index ];
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
