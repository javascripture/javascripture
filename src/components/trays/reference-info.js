// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { compareTwoReferences, calculateRareWords, calculateCommonWords, calculateConnectionQuality } from '../../lib/reference';
import {
	selectWord,
	setReferenceInfo,
	setReferenceInfoCompareWith,
	setReferenceInfoLimit,
	setTrayVisibilityFilter,
} from '../../actions';

import styles from './styles.scss';

const ReferenceInfo = React.memo( ( props ) => {
	const dispatch = useDispatch();
	const reference = useSelector( state => state.referenceInfo.reference );
	const referenceToCompareWith = useSelector( state => state.referenceInfo.referenceToCompareWith );
	const overlap = useSelector( state => compareTwoReferences( state ) );
	const rare = useSelector( state => calculateRareWords( state ) );
	const common = useSelector( state => calculateCommonWords( state ) );
	const limit = useSelector( state => state.referenceInfo.limit );
	const addAllWords = () => {
		overlap.forEach( lemma => addWord( lemma ) );
	};
	const addWord = ( lemma ) => {
		dispatch( setTrayVisibilityFilter( 'word' ) );
		dispatch( selectWord( {
			lemma,
			version: 'original',
		} ) );
	};

	const getOverlap = () => {
		if ( ! overlap ) {
			return;
		}

		if ( overlap.length === 0 ) {
			return 'No connections found';
		}

		const overlapMarkup = overlap.map( lemma => <div key={ lemma }>{ getWord( lemma ) }</div> )

		return (
			<div>
				<span>Connections ({ overlap.length }):</span>
				{ overlapMarkup }
			</div>
		)
	};

	const getCommonWords = () => {
		if ( ! common ) {
			return null;
		}

		if ( common.length === 0 ) {
			return 'No common words found';
		}

		return Object.keys( common ).map( lemma => {
			const significance = ( common[ lemma ] / javascripture.data.strongsObjectWithFamilies[ lemma ].count ).toFixed( 2 );
			return (
				<div key={ lemma }>
					{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].xlit } - <span title={ 'significance: ' + significance }>({ common[ lemma ] } times)</span>
				</div>
			);
		} );
	};

	const bookChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { book: event.target.value, chapter: 1, verse: 'all' } ) );
	};

	const chapterChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { ...referenceToCompareWith, chapter: event.target.value, verse: 'all' } ) );
	};

	const verseChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { ...referenceToCompareWith, verse: event.target.value } ) );
	};

	const getChapters = () => {
		if ( referenceToCompareWith && referenceToCompareWith.book ) {
			const bookNumber = bible.getBookId( referenceToCompareWith.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	};

	const getVerses = ( reference ) => {
		if ( reference && reference.book && reference.chapter ) {
			const bookNumber = bible.getBookId( reference.book );
			const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ reference.chapter - 1 ];
			const verses = [];
			for ( var i = 0 ; i < numberOfVerses ; i++) {
				verses.push( i );
			}
			const versesJSX = verses.map( ( key ) => {
				return <option key={ key }>{ key + 1 }</option>
			} );
			versesJSX.unshift( <option key="all" value="all">All</option> );
			return versesJSX;
		}

		return <option>-</option>;
	};

	const addAllRareWords = () => {
		rare.forEach( lemma => addWord( lemma ) );
	};

	const getRareWords = () => {
		if ( ! rare ) {
			return null;
		}

		if ( rare.length === 0 ) {
			return 'No rare words found';
		}

		return rare.map( lemma => <div key={ lemma }>{ getWord( lemma ) }</div> );
	};

	const getWord = ( lemma ) => {
		return (
			<div>
				{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].xlit }
			</div>
		);
	};

	const changeLimit = (event) => dispatch( setReferenceInfoLimit( event.target.value ) );

	const compareBookChange = ( event ) => {
		dispatch( setReferenceInfo( { book: event.target.value, chapter: 1, verse: 'all' } ) );
	};

	const compareChapterChange = ( event ) => {
		dispatch( setReferenceInfo( { ...reference, chapter: event.target.value, verse: 'all' } ) );
	};

	const compareVerseChange = ( event ) => {
		dispatch( setReferenceInfo( { ...reference, verse: event.target.value } ) );
	};

	const getCompareChapters = () => {
		if ( reference && reference.book ) {
			const bookNumber = bible.getBookId( reference.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	};

	const getBooks = () => {
		return (
			<React.Fragment>
				<option value="">Select a book</option>
				{ bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> ) }
			</React.Fragment>
		);
	};

	return (
		<div className={ styles.chapterTrayPadding }>
			<div className={ styles.chapterTray }>
				<select name="compareWithBook" name="compareWithBook" onChange={ compareBookChange } value={ reference ? reference.book : '' }>
					{ getBooks() }
				</select>
				<select name="compareWithChapter" name="compareWithChapter" onChange={ compareChapterChange } value={ reference ? reference.chapter : '' }>
					{ getCompareChapters() }
				</select>
				<select name="compareWithVerses" onChange={ compareVerseChange } value={ reference ? reference.verse : '' }>{ getVerses( reference ) }</select>
			</div>
			<br />
			<h2>Rare words</h2>
			<div className={ styles.chapterTray }>
				Words used less than <input type="number" name="limit" value={ limit } onChange={ changeLimit } className={ styles.limit } /> times { rare ? '(' + rare.length + ')' : null }:
			</div>
			<div className={ styles.scrollingBlock }>
				{ getRareWords() }
			</div>
			<div className={ styles.chapterTray }>
				{ rare && rare.length > 0 && <button onClick={ addAllRareWords }>Select all rare words (slow!)</button> }
			</div>
			<br />
			<h2>Compare with</h2>
			<div className={ styles.chapterTray }>
				<select name="book" onChange={ bookChange } value={ referenceToCompareWith ? referenceToCompareWith.book : '' }>
					{ getBooks() }
				</select>
				<select name="chapter" onChange={ chapterChange } value={ referenceToCompareWith ? referenceToCompareWith.chapter : '' }>{ getChapters() }</select>
				<select name="verses" onChange={ verseChange } value={ referenceToCompareWith? referenceToCompareWith.verse : '' }>{ getVerses( referenceToCompareWith ) }</select>
			</div>
			<div className={ styles.chapterTray }>
				For words used less than <input type="number" name="limit" value={ limit } onChange={ changeLimit } className={ styles.limit } /> times.
			</div>
			<div className={ styles.scrollingBlock }>
				{ getOverlap() }
			</div>
			<div className={ styles.chapterTray }>
				{ overlap && overlap.length > 0 && <button onClick={ addAllWords }>Select all words</button> }
			</div>
			<br />
			<h2>All words</h2>
			<div className={ styles.scrollingBlock }>
				{ getCommonWords() }
			</div>
		</div>
	);
} );


export default ReferenceInfo;
