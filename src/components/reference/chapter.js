/*global javascripture*/

// External
import React from 'react';
import ReactDOM from 'react-dom';
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

const getReferenceFromHash = ( hash ) => {
	const reference = hash.split('/'),
		book = reference[ 1 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 2 ] ),
		verse = parseInt( reference[ 3 ] );
	return { book, chapter, verse };
};

const Chapter = React.createClass( {
	componentDidMount() {
		this.scrollToCurrentChapter();
	},

	componentDidUpdate( prevProps, prevState ) {
		this.scrollToCurrentChapter();
		// Only scroll if chapter or book changes
		/*const references = this.state.references;

		if ( ! references || ! prevState ) {
			return;
		}

		const prevReferences = prevState.references;
		if ( ! prevReferences || prevReferences.book !== references.book || prevReferences.chapter !== references.chapter ) {
			this.scrollToCurrentChapter();
		} else {
			if( this.state.references.loadingPrev ) {
				const newHeight = documentHeight();
				window.scrollBy( 0, newHeight - oldHeight );
				document.body.style.overflow = '';
			}
		}*/
	},

scrollToCurrentChapter() {
		const currrentChapter = ReactDOM.findDOMNode( this.refs.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			window.scrollBy( 0, -50 );
		}
	},
	render() {
		const { book, chapter, version, highlightWord, hash } = this.props;
		const currentReference = getReferenceFromHash( hash ),
			leftLanguage = getLanguageFromVersion( book, version.left ),
			rightLanguage = getLanguageFromVersion( book, version.right ),
			leftChapterData = javascripture.data[ leftLanguage ][ book ][ chapter - 1 ],
			rightChapterData = javascripture.data[ rightLanguage ][ book ][ chapter - 1 ],
			verses = leftChapterData.map( ( verse, index ) => {
				let ref = null;
				if ( currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( index + 1 ) ) {
					ref = 'current';
				}

				return (
					<div className={ styles.singleReference } key={ index } ref={ ref } id={ ref }>
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
	}
} );

export default withStyles( styles )( Chapter );
