/*global javascripture*/

// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Verse from './verse';
import styles from './styles.scss';

const getLanguageFromVersion = function( book, version ) {
	if ( version === 'original' || version === 'lc' ) {
		return bible.Data.otBooks.indexOf( book ) > -1 ? 'hebrew' : 'greek';
	}

	return version;
};

const getVerseWrapperStyle = function( language ) {
	if ( language === 'hebrew' ) {
		return {
			direction: 'rtl'
		};
	}

	return {};
};


const getVerseStyle = function( language ) {
	if ( language === 'hebrew' ) {
		return {
			fontFamily: 'Times, serif',
			fontSize: '140%',
			lineHeight: '1em',
			verticalAlign: 'middle'
		};
	}

	return {};
};

const Chapter = function ( { book, chapter, version, highlightWord } ) {
	const leftLanguage = getLanguageFromVersion( book, version.left ),
		rightLanguage = getLanguageFromVersion( book, version.right ),
		leftChapterData = javascripture.data[ leftLanguage ][ book ][ chapter - 1 ],
		rightChapterData = javascripture.data[ rightLanguage ][ book ][ chapter - 1 ],
		verses = leftChapterData.map( ( verse, index ) => {
			return (
				<div className={ styles.singleReference } key={ index }>
					<div className={ styles.verseWrapper } key={ 'kjv' + index  } style={ getVerseWrapperStyle( leftLanguage ) }>
						{ index + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( leftLanguage ) }>
							<Verse verse={ verse } index={ index } version={ leftLanguage } highlightWord={ highlightWord } />
						</span>
					</div>
					<div className={ styles.verseWrapper } key={ 'hebrew' + index } style={ getVerseWrapperStyle( rightLanguage ) }>
						{ index + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( rightLanguage ) }>
							<Verse className={ styles.verseContainer } verse={ rightChapterData[ index ] } index={ index } version={ rightLanguage } highlightWord={ highlightWord } />
						</span>
					</div>
				</div>
			);
		} );

	return (
		<div>
			{ verses }
		</div>
	);
};

export default withStyles( styles )( Chapter );
