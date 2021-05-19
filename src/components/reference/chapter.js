// External
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { fetchData } from '../../actions';
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

// Also needs updating in _dimensions.scss
const dockHeight = 60;

const Chapter = React.memo( ( { book, chapter, index } ) => {
	const inSync = useSelector( state => state.settings.inSync );
	const data = useSelector( state => state.data );
	const reference = useSelector( state => state.reference );
	const currentReference = reference[ index ];
	const kjvData = data[ 'KJV' ][ book ][ chapter - 1 ];
	const dispatch = useDispatch();

	// used to scroll to the current chapter
	const currentRef = useRef();

	// probably move this to the parent
	useEffect( () => {
		reference.forEach( ( { book, version } ) => {
			dispatch( fetchData( mapVersionToData( book, version ) ) );
		} );
	}, [ reference ] );

	useEffect( () => {
		scrollToCurrentChapter();
	}, [ reference[ index ] ] );

	const scrollToCurrentChapter = () => {
		const currrentChapter = ReactDOM.findDOMNode( currentRef.current );
		if ( currrentChapter ) {
			currrentChapter.scrollIntoView();
			document.getElementById( 'referenceWindow' + index ).scrollBy( 0, 0 - dockHeight );
		}
	};

	const isCurrentRef = ( verseNumber ) => ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) ? currentRef : null;

	const getSyncVerses = () => {
		const title = (
			<div className={ styles.chapterColumn }>
				{ reference.map( ( { version }, index ) => {
					return <Title book={ book } chapter={ chapter } version={ version } key={ index } />;
				} ) }
			</div>
		);

		return (
			<div>
				{ title }
				{ kjvData.map( ( verse, verseNumber ) => {
					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ isCurrentRef( verseNumber ) }>
							{ reference.map( ( { version }, index ) => {
								return (
									<VerseWrapper
										data={ data }
										book={ book }
										version={ version }
										chapter={ chapter }
										verseNumber={ verseNumber + 1 }
										index={ verseNumber }
										key={ 'versewrapper' + index + verseNumber }
										isCurrentRef={ !! isCurrentRef( verseNumber ) } />
								);
							} ) }
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
								data={ data }
								book={ book }
								version={ version }
								chapter={ chapter }
								verseNumber={ verseNumber + 1 }
								index={ verseNumber }
								isCurrentRef={ isCurrentRef( verseNumber ) } />
						</div>
					);
				} ) }
			</div>
		);
	}

	return (
		<div className={ styles.chapter }>
			{ inSync ? getSyncVerses() : getDifferentVerses() }
		</div>
	);
} );

export default withStyles( styles )( Chapter );
