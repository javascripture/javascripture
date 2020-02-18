// External
import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import { fetchData } from '../../actions';
import Bookmarker from './bookmarker';
import Title from './title';
import VerseWrapper from './verse-wrapper';
import styles from './styles.scss';
import { mapVersionToData } from '../../lib/reference';

const getVerseWrapperStyle = function( book, version ) {
	// TODO generalize
	if ( bible.isRtlVersion( version, book ) ) {
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

		if ( ! this.props.inSync ) {
			return false;
		}

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

	getClassName( book, version ) {
		if ( ( version === 'original' || version === 'accented' ) && bible.Data.otBooks.indexOf( book ) > -1 ) {
			return classnames( styles.verse, styles.hebrew );
		}

		if ( version === 'OPV' || version === 'TPV' || version === 'NMV' ) {
			return classnames( styles.verse, styles.farsi );
		}

		return styles.verse
	}

	placeholder( key ) {
		return (
			<div className={ styles.verseWrapper } key={ key }>
				<span className={ styles.placeholder }>&nbsp;Loading</span>
				<span className={ styles.placeholder } style={ { width: ( Math.random() * 100 ) + '%' } }>&nbsp;</span>
			</div>
		);
	}

	notAvailable( key ) {
		return (
			<div className={ styles.verseWrapper } key={ key }>Book not available</div>
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
					return <Title book={ this.props.book } chapter={ this.props.chapter } version={ reference.version } />;
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
								if ( ! this.props.data[ language ] || Object.keys( this.props.data[ language ] ).length === 0 ) {
									return this.placeholder( index + verseNumber);
								}

								if ( ! this.props.data[ language ][ book ] ) {
									return this.notAvailable( index + verseNumber );
								}

								const verseData = this.props.data[ language ][ book ][ chapter - 1 ][ verseNumber ];
								return (
									<VerseWrapper
										book={ book }
										version={ reference.version }
										chapter={ chapter }
										verseNumber={ verseNumber + 1 }
										verseData={ verseData }
										index={ verseNumber } />
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
		const currentReference = this.props.reference[ index ];
		const language = mapVersionToData( book, currentReference.version );
		const version = currentReference.version;

		if ( ! this.props.data[ language ] || ! this.props.data[ language ][ book ] ) {
			return (
				<div>Loading { version }...</div>
			);
		}

		const chapterData = this.props.data[ language ][ book ][ chapter - 1 ];

		return (
			<div>
				<Title book={ book } chapter={ chapter } version={ version } />
				{ chapterData.map( ( verse, verseNumber ) => {
					let ref = null;
					if ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) {
						ref = this.currentRef;
					}

					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ ref }>
							<VerseWrapper
								book={ book }
								version={ version }
								chapter={ chapter }
								verseNumber={ verseNumber + 1 }
								verseData={ verse }
								index={ verseNumber } />
							<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
						</div>
					);
				} ) }
			</div>
		);
	}
	render() {
		return (
			<React.Fragment>
				{ this.props.inSync && this.getSyncVerses() }
				{ ! this.props.inSync && this.getDifferentVerses() }
			</React.Fragment>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		reference: state.reference,
		inSync: state.settings.inSync,
		data: state.data,
	}
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		fetchData: ( key ) => {
			dispatch( fetchData( key ) );
		},
	}
};

const ChapterContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)( Chapter )

export default withStyles( styles )( ChapterContainer );
