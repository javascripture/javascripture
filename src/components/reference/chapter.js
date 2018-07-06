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
		const currrentChapter = ReactDOM.findDOMNode( this.refs.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			document.getElementById( 'referenceWindow' ).scrollBy( 0, -50 );
		}
	}

	getVerses() {
		const { book, chapter, version, highlightWord } = this.props;
		const currentReference = this.props.reference,
			leftLanguage = getLanguageFromVersion( book, version.left ),
			rightLanguage = getLanguageFromVersion( book, version.right ),
			leftChapterData = javascripture.data[ leftLanguage ][ book ][ chapter - 1 ],
			rightChapterData = javascripture.data[ rightLanguage ][ book ][ chapter - 1 ];
		return leftChapterData.map( ( verse, index ) => {
			let ref = null;
			if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( index + 1 ) ) {
				ref = 'current';
			}

			return (
				<div className={ styles.singleReference } key={ index } ref={ ref } id={ ref }>
					<div className={ styles.verseWrapper } key={ 'kjv' + index  } style={ getVerseWrapperStyle( leftLanguage, version.left ) }>
						{ index + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( leftLanguage, version.left ) }>
							<Verse verse={ verse } index={ index } version={ version.left } language={ leftLanguage } highlightWord={ highlightWord } />
						</span>
					</div>
					<Bookmarker book={ book } chapter={ chapter } verse={ index + 1 } />
					{ ( this.props.inSync === 'sync' ) && <div className={ styles.verseWrapper } key={ 'hebrew' + index } style={ getVerseWrapperStyle( rightLanguage, version.right ) }>
						{ index + 1 }.
						<span  className={ styles.verse } style={ getVerseStyle( rightLanguage, version.right ) }>
							<Verse className={ styles.verseContainer } verse={ rightChapterData[ index ] } index={ index } version={ version.right } language={ rightLanguage } highlightWord={ highlightWord } />
						</span>
					</div> }
				</div>
			);
		} );
	}

	render() {
		return (
			<div>
				{ this.getVerses() }
			</div>
		);
	}
}

export default withStyles( styles )( Chapter );
