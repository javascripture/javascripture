/*global javascripture*/

// External
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Bookmarker from '../../containers/bookmarker';
import Verse from './verse';
import styles from './styles.scss';
import { getLanguageFromVersion } from '../../lib/reference';

const getVerseWrapperStyle = function( language, version ) {
	if ( language === 'hebrew' && version === 'original' ) {
		return {
			direction: 'rtl'
		};
	}

	return {};
};

const getVerseStyle = function( language, version ) {
	if ( language === 'hebrew' && version === 'original' ) {
		return {
			fontFamily: 'Times New Roman, Times, serif',
			fontSize: '140%',
			lineHeight: '1em',
			verticalAlign: 'middle'
		};
	}

	return {};
};

class Chapter extends React.Component{
	componentDidMount() {
		this.scrollToCurrentChapter();
	}

	componentDidUpdate( prevProps, prevState ) {
		this.scrollToCurrentChapter();
	}

	scrollToCurrentChapter() {
		const currrentChapter = ReactDOM.findDOMNode( this.currentRef.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			document.getElementById( 'referenceWindow' + this.props.index ).scrollBy( 0, -50 );
		}
	}

	getSyncVerses() {
		const { book, chapter, highlightWord, index } = this.props;
		const currentReference = this.props.reference[ index ],
			leftLanguage = getLanguageFromVersion( book, this.props.reference[0].version ),
			rightLanguage = getLanguageFromVersion( book, this.props.reference[1].version ),
			leftChapterData = javascripture.data[ leftLanguage ][ book ][ chapter - 1 ],
			rightChapterData = javascripture.data[ rightLanguage ][ book ][ chapter - 1 ];

		this.currentRef = React.createRef();
		return leftChapterData.map( ( verse, verseNumber ) => {
			let ref = null;
			if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) {
				ref = this.currentRef;
			}

			return (
				<div className={ styles.singleReference } key={ verseNumber } ref={ ref }>
					<div className={ styles.verseWrapper } key={ 'one-' + verseNumber  } style={ getVerseWrapperStyle( leftLanguage, this.props.reference[0].version ) }>
						{ verseNumber + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( leftLanguage, this.props.reference[0].version ) }>
							<Verse verse={ verse } index={ verseNumber } version={ this.props.reference[0].version } language={ leftLanguage } highlightWord={ highlightWord } />
						</span>
					</div>
					<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
					<div className={ styles.verseWrapper } key={ 'two-' + verseNumber } style={ getVerseWrapperStyle( rightLanguage, this.props.reference[1].version ) }>
						{ verseNumber + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( rightLanguage, this.props.reference[1].version ) }>
							<Verse className={ styles.verseContainer } verse={ rightChapterData[ verseNumber ] } index={ verseNumber } version={ this.props.reference[ 1 ].version } language={ rightLanguage } highlightWord={ highlightWord } />
						</span>
					</div>
				</div>
			);
		} );
	}

	getDifferentVerses() {
		const { book, chapter, highlightWord, index } = this.props;
		const currentReference = this.props.reference[ index ],
			language = getLanguageFromVersion( book, this.props.reference[ index ].version ),
			chapterData = javascripture.data[ language ][ book ][ chapter - 1 ];

		this.currentRef = React.createRef();
		return chapterData.map( ( verse, verseNumber ) => {
			let ref = null;
			if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) {
				ref = this.currentRef;
			}

			return (
				<div className={ styles.singleReference } key={ verseNumber } ref={ ref }>
					<div className={ styles.verseWrapper } style={ getVerseWrapperStyle( language, this.props.reference[ index ].version ) }>
						{ verseNumber + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( language, this.props.reference[ index ].version ) }>
							<Verse verse={ verse } index={ verseNumber } version={ this.props.reference[ index ].version } language={ language } highlightWord={ highlightWord } />
						</span>
					</div>
					<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
				</div>
			);
		} );
	}
	render() {
		return (
			<div>
				{ (this.props.inSync === 'sync' ) && this.getSyncVerses() }
				{ (this.props.inSync === 'different' ) && this.getDifferentVerses() }
			</div>
		);
	}
}

export default withStyles( styles )( Chapter );
