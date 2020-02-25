// External
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import { fetchData } from '../../actions';
import Bookmarker from './bookmarker';
import Title from './title';
import VerseWrapper from './verse-wrapper';
import styles from './styles.scss';
import { mapVersionToData } from '../../lib/reference';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
	  ref.current = value;
	});
	return ref.current;
  }

const Chapter = React.memo( ( props ) => {
	const { reference } = props;
	const { book, chapter, index } = props;
	const prevProps = usePrevious( props );
	const currentReference = props.reference[ index ];
	const kjvData = props.data[ 'KJV' ][ book ][ chapter - 1 ];

	// used to scroll to the current chapter
	const currentRef = useRef();

	// probably move this to the parent
	useEffect( () => {
		props.reference.forEach( reference => {
			props.fetchData( mapVersionToData( reference.book, reference.version ) );
		} );
	}, [] );

	useEffect( () => {
		if( referenceHasChanged( prevProps ) ) {
			scrollToCurrentChapter();
		}
	}, [ reference ] );

	const referenceHasChanged = () => {
		let referenceHasChanged = false;

		props.reference.forEach( ( reference, index ) => {
			if ( ! prevProps || ! prevProps.reference[ index ] ) {
				referenceHasChanged = true; // Because the colum widths will change
			} else if ( ! ( reference.book === prevProps.reference[ index ].book && reference.chapter === prevProps.reference[ index ].chapter && reference.verse === prevProps.reference[ index ].verse ) ) {
				referenceHasChanged = true;
			}
		} );
		return referenceHasChanged;
	};

	const scrollToCurrentChapter = () => {
		const currrentChapter = ReactDOM.findDOMNode( currentRef.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			document.getElementById( 'referenceWindow' + props.index ).scrollBy( 0, -40 );
		}
	};

	const isCurrentRef = ( verseNumber ) => ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) ? currentRef : null;

	const getSyncVerses = () => {
		const title = (
			<div className={ styles.chapterColumn }>
				{ props.reference.map( ( reference, index ) => {
					const version = reference.version;
					return <Title book={ props.book } chapter={ props.chapter } version={ version } key={ index } />;
				} ) }
			</div>
		);

		return (
			<div>
				{ title }
				{ kjvData.map( ( verse, verseNumber ) => {
					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ isCurrentRef( verseNumber ) }>
							{ props.reference.map( ( reference, index ) => {
								return (
									<VerseWrapper
										data={ props.data }
										book={ book }
										version={ reference.version }
										chapter={ chapter }
										verseNumber={ verseNumber + 1 }
										index={ verseNumber }
										key={ 'versewrapper' + index + verseNumber } />
								);
							} ) }
							<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
						</div>
					);
				} ) }
			</div>
		)
	}

	const getDifferentVerses = () => {
		const version = currentReference.version;

		return (
			<div>
				<Title book={ book } chapter={ chapter } version={ version } />
				{ kjvData.map( ( verse, verseNumber ) => {
					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ isCurrentRef( verseNumber ) }>
							<VerseWrapper
								data={ props.data }
								book={ book }
								version={ version }
								chapter={ chapter }
								verseNumber={ verseNumber + 1 }
								index={ verseNumber } />
							<Bookmarker book={ book } chapter={ chapter } verse={ verseNumber + 1 } />
						</div>
					);
				} ) }
			</div>
		);
	}

	return (
		<div className={ styles.chapter }>
			{ props.inSync && getSyncVerses() }
			{ ! props.inSync && getDifferentVerses() }
		</div>
	);
} );

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
