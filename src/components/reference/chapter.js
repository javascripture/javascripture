/*global javascripture*/

// External
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Bookmarker from '../../containers/bookmarker';
import Verse from './verse';
import VerseNumber from './verse-number';
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
	/*if ( language === 'hebrew' && version === 'original' ) {
		return {
			fontFamily: 'Times New Roman, Times, serif',
			fontSize: '140%',
			lineHeight: '1em',
			verticalAlign: 'middle'
		};
	}

	return {};*/
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
			document.getElementById( 'referenceWindow' + this.props.index ).scrollBy( 0, -40 );
		}
	}

	getClassName( language, version ) {
		if ( language === 'hebrew' && version === 'original' ) {
			return classnames( styles.verse, styles.hebrew );
		}

		return styles.verse
	}

	getSyncVerses() {
		const { book, chapter, index } = this.props;
		const currentReference = this.props.reference[ index ],
			kjvData = javascripture.data[ 'kjv' ][ book ][ chapter - 1 ];

		this.currentRef = React.createRef();
		const title = (
			<div className={ styles.chapterColumn }>
				{ this.props.reference.map( ( reference, index ) => {
					const tranlatedBook = bible.getTranslatedBookName( this.props.reference[ 0 ].book, reference.version );

					return (
						<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading }>
							{ tranlatedBook + ' ' + this.props.reference[ 0 ].chapter }
						</h1>
					);
				} ) }
			</div>
		);

		return (
			<div>
				{ title }
				{ kjvData.map( ( verse, verseNumber ) => {
					let ref = null;
					if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) {
						ref = this.currentRef;
					}

					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ ref }>
							{ this.props.reference.map( ( reference, index ) => {
								const language = getLanguageFromVersion( book, reference.version );
								const verseData = javascripture.data[ language ][ book ][ chapter - 1 ][ verseNumber ];
								return (
									<div className={ styles.verseWrapper } key={ index + verseNumber } style={ getVerseWrapperStyle( language, reference.version ) }>
										<VerseNumber book={ book } chapter={ chapter } verse={ verseNumber + 1 } /><span className={ this.getClassName( language, reference.version ) }>
											<Verse verse={ verseData } index={ verseNumber } version={ reference.version } language={ language } />
										</span>
									</div>
								);
							} ) }
							<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
						</div>
					);
				} ) }
			</div>
		)
	}

	getDifferentVerses() {
		const { book, chapter, index } = this.props;
		const currentReference = this.props.reference[ index ],
			language = getLanguageFromVersion( book, this.props.reference[ index ].version ),
			chapterData = javascripture.data[ language ][ book ][ chapter - 1 ];

		this.currentRef = React.createRef();
		return (
			<div>
				<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading }>fdsd</h1>
				{ chapterData.map( ( verse, verseNumber ) => {
					let ref = null;
					if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) {
						ref = this.currentRef;
					}

					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ ref }>
							<div className={ styles.verseWrapper } style={ getVerseWrapperStyle( language, this.props.reference[ index ].version ) }>
								<VerseNumber book={ book } chapter={ chapter } verse={ verseNumber + 1 } /><span className={ this.getClassName( language, this.props.reference[ index ].version ) }>
									<Verse verse={ verse } index={ verseNumber } version={ this.props.reference[ index ].version } language={ language } />
								</span>
							</div>
							<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
						</div>
					);
				} ) }
			</div>
		);
	}
	render() {
		return (
			<div>
				{ this.props.inSync && this.getSyncVerses() }
				{ ! this.props.inSync && this.getDifferentVerses() }
			</div>
		);
	}
}

export default withStyles( styles )( Chapter );
