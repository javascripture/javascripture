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
import { mapVersionToData } from '../../lib/reference';
import xhr from 'xhr';

const getVerseWrapperStyle = function( language, version ) {
	// TODO generalize
	if ( bible.isRtlVersion( version, language ) ) {
		return {
			direction: 'rtl'
		};
	}

	return {};
};

class Chapter extends React.Component{
	componentDidMount() {
		this.scrollToCurrentChapter();
		this.props.reference.forEach( reference => {
			this.props.fetchData( mapVersionToData( reference.book, reference.version ) );
		} );
	}

	componentWillReceiveProps( nextProps ) {
		nextProps.reference.forEach( reference => {
			this.props.fetchData( mapVersionToData( reference.book, reference.version ) );
		} );
	}

	componentDidUpdate( prevProps, prevState ) {
		if( this.referenceHasChanged( prevProps ) ) {
			this.scrollToCurrentChapter();
		}
	}

	referenceHasChanged( prevProps ) {
		let referenceHasChanged = false;
		this.props.reference.forEach( ( reference, index ) => {
			if ( ! prevProps.reference[ index ] ) {
				referenceHasChanged = true; // Because the colum widths will change
			} else if ( ! ( reference.book === prevProps.reference[ index ].book && reference.chapter === prevProps.reference[ index ].chapter && reference.verse === prevProps.reference[ index ].verse ) ) {
				referenceHasChanged = true;
			}
		} );
		return referenceHasChanged;
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

	placeholder( key ) {
		return (
			<div className={ styles.verseWrapper } key={ key }>
				<span className={ styles.placeholder }></span>
				<span className={ styles.placeholder } style={ { width: ( Math.random() * 100 ) + '%' } }></span>
			</div>
		);
	}

	getSyncVerses() {
		this.currentRef = React.createRef();
		const { book, chapter, index } = this.props;
		const currentReference = this.props.reference[ index ],
			kjvData = this.props.data[ 'KJV' ][ book ][ chapter - 1 ];

		const title = (
			<div className={ styles.chapterColumn }>
				{ this.props.reference.map( ( reference, index ) => {
					const tranlatedBook = bible.getTranslatedBookName( this.props.book, reference.version );

					return (
						<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading } key={ index }>
							{ tranlatedBook + ' ' + this.props.chapter }
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
								const language = mapVersionToData( book, reference.version );
								if ( ! this.props.data[ language ] || ! this.props.data[ language ][ book ] ) {
									return this.placeholder( index + verseNumber);
								}

								const verseData = this.props.data[ language ][ book ][ chapter - 1 ][ verseNumber ];
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
		this.currentRef = React.createRef();

		const { book, chapter, index } = this.props;
		const currentReference = this.props.reference[ index ],
			language = mapVersionToData( book, this.props.reference[ index ].version );

		if ( ! this.props.data[ language ] || ! this.props.data[ language ][ book ] ) {
			return (
				<div>Loading { this.props.reference[ index ].version }...</div>
			);
		}

		const chapterData = this.props.data[ language ][ book ][ chapter - 1 ];

		return (
			<div>
				<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading }>
					{ this.props.book + ' ' + this.props.chapter }
				</h1>
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
