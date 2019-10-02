// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { uniq } from 'lodash';

// Internal dependencies
import { getLemmasForReference } from '../../lib/reference';
import {
	addWord,
	setReferenceInfo,
	setReferenceInfoCompareWith,
	setReferenceInfoLimit,
	setTrayVisibilityFilter,
} from '../../actions';

import styles from './styles.scss';

class ReferenceInfo extends React.Component {
	bookChange = ( event ) => {
		this.props.setReferenceInfoCompareWith( { book: event.target.value, chapter: 1, verse: 'all' } );
	}

	chapterChange = ( event ) => {
		this.props.setReferenceInfoCompareWith( { ...this.props.referenceToCompareWith, chapter: event.target.value, verse: 'all' } );
	}

	verseChange = ( event ) => {
		this.props.setReferenceInfoCompareWith( { ...this.props.referenceToCompareWith, verse: event.target.value } );
	}

	getChapters() {
		if ( this.props.referenceToCompareWith && this.props.referenceToCompareWith.book ) {
			const bookNumber = bible.getBookId( this.props.referenceToCompareWith.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	}

	getVerses( reference ) {
		if ( reference && reference.book && reference.chapter ) {
			const bookNumber = bible.getBookId( reference.book );
			const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ reference.chapter ];
			const verses = [];
			for ( var i = 0 ; i <= numberOfVerses ; i++) {
				verses.push( i );
			}
			const versesJSX = verses.map( ( key ) => {
				return <option key={ key }>{ key + 1 }</option>
			} );
			versesJSX.unshift( <option key="all" value="all">All</option> );
			return versesJSX;
		}

		return <option>-</option>;
	}

	compareBookChange = ( event ) => {
		this.props.setReferenceInfo( { book: event.target.value, chapter: 1, verse: 'all' } );
	}

	compareChapterChange = ( event ) => {
		this.props.setReferenceInfo( { ...this.props.reference, chapter: event.target.value, verse: 'all' } );
	}

	compareVerseChange = ( event ) => {
		this.props.setReferenceInfo( { ...this.props.reference, verse: event.target.value } );
	}

	getCompareChapters() {
		if ( this.props.reference && this.props.reference.book ) {
			const bookNumber = bible.getBookId( this.props.reference.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	}

	changeLimit = ( event ) => {
		this.props.setReferenceInfoLimit( event.target.value );
	};

	addAllRareWords = () => {
		this.props.rare.forEach( lemma => this.props.addWord( lemma ) );
	};

	addAllWords = () => {
		this.props.overlap.forEach( lemma => this.props.addWord( lemma ) );
	};

	getOverlap() {
		if ( ! this.props.overlap ) {
			return;
		}

		if ( this.props.overlap.length === 0 ) {
			return 'No connections found';
		}

		const overlap = this.props.overlap.map( lemma => <div key={ lemma }>{ this.getWord( lemma ) }</div> )
//				<span>Connection quality: { this.props.connectionQuality }</span>

		return (
			<div>
				<span>Connections ({ this.props.overlap.length }):</span>
				{ overlap }
			</div>
		)
	}

	getRareWords() {
		if ( ! this.props.rare ) {
			return null;
		}

		if ( this.props.rare.length === 0 ) {
			return 'No rare words found';
		}

		return this.props.rare.map( lemma => <div key={ lemma }>{ this.getWord( lemma ) }</div> );
	}

	getWord( lemma ) {
		return(
			<div>
				{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].xlit }
			</div>
		);
	}

	render() {
		return (
			<div className={ styles.tray }>
				<div className={ styles.chapterTrayPadding }>
					<h1>Reference Info</h1>
					<div className={ styles.chapterTray }>
						<select name="compareWithBook" name="compareWithBook" onChange={ this.compareBookChange } value={ this.props.reference ? this.props.reference.book : '' }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="compareWithChapter" name="compareWithChapter" onChange={ this.compareChapterChange } value={ this.props.reference ? this.props.reference.chapter : '' }>
							{ this.getCompareChapters() }
						</select>
						<select name="compareWithVerses" onChange={ this.compareVerseChange } value={ this.props.reference ? this.props.reference.verse : '' }>{ this.getVerses( this.props.reference ) }</select>
					</div>
					<br />

					<h2>Rare words</h2>
					<div className={ styles.chapterTray }>
						Words used less than <input type="number" name="limit" value={ this.props.limit } onChange={ this.changeLimit } className={ styles.limit } /> times { this.props.rare ? '(' + this.props.rare.length + ')' : null }:
					</div>
					<div className={ styles.scrollingBlock }>
						{ this.getRareWords() }
					</div>
					<div className={ styles.chapterTray }>
						{ this.props.rare && this.props.rare.length > 0 && <button onClick={ this.addAllRareWords }>Select all rare words (slow!)</button> }
					</div>
					<br />
					<h2>Compare with</h2>
					<div className={ styles.chapterTray }>
						<select name="book" onChange={ this.bookChange } value={ this.props.referenceToCompareWith ? this.props.referenceToCompareWith.book : '' }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="chapter" onChange={ this.chapterChange } value={ this.props.referenceToCompareWith ? this.props.referenceToCompareWith.chapter : '' }>{ this.getChapters() }</select>
						<select name="verses" onChange={ this.verseChange } value={ this.props.referenceToCompareWith? this.props.referenceToCompareWith.verse : '' }>{ this.getVerses( this.props.referenceToCompareWith ) }</select>
					</div>
					<div className={ styles.chapterTray }>
						For words used less than <input type="number" name="limit" value={ this.props.limit } onChange={ this.changeLimit } className={ styles.limit } /> times.
					</div>
					<div className={ styles.scrollingBlock }>
						{ this.getOverlap() }
					</div>
					<div className={ styles.chapterTray }>
						{ this.props.overlap && this.props.overlap.length > 0 && <button onClick={ this.addAllWords }>Select all words</button> }
					</div>
				</div>
			</div>
		);
	}
}

ReferenceInfo.propTypes = {};

const getDataFromBook = ( reference, data ) => {
	return bible.Data.otBooks.indexOf( reference.book ) > -1 ? data.hebrew : data.greek;
}

const compareTwoReferences = ( { referenceInfo: { reference, referenceToCompareWith, limit } , data } ) => {
	if ( ! reference || ! referenceToCompareWith ) {
		return null;
	}

	const ref1Lemmas = getLemmasForReference( reference, getDataFromBook( reference, data ) );
	const ref2Lemmas = getLemmasForReference( referenceToCompareWith, getDataFromBook( referenceToCompareWith, data ) );
	const comparison = ref1Lemmas.filter( lemma => {
		if ( javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit ) {
			if ( ref2Lemmas.indexOf( lemma ) > -1 ) {
				return lemma;
			}
		}
	} );

	return uniq( comparison );
};

const calculateRareWords = ( { referenceInfo: { reference, limit } , data } ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, getDataFromBook( reference, data ) );
	return uniq( lemmas.filter( lemma => {
		return javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit;
	} ) );
};


const calculateConnectionQuality = ( state ) => {
	const { referenceInfo: { reference, limit } , data } = state;
	if ( ! reference ) {
		return null;
	}

	const comparisonState = JSON.parse( JSON.stringify( state ) );
	comparisonState.referenceInfo.limit = 99999999999;
	const numberOfWordsInReference = uniq( getLemmasForReference( reference, getDataFromBook( reference, data ) ) ).length;
	const comparison = compareTwoReferences( comparisonState );
	const numberOfConnections = comparison ? comparison.length : 0;
	return numberOfConnections / numberOfWordsInReference;
};

const mapStateToProps = ( state ) => {
	return {
		reference: state.referenceInfo.reference,
		referenceToCompareWith: state.referenceInfo.referenceToCompareWith,
		limit: state.referenceInfo.limit,
		overlap: compareTwoReferences( state ),
		rare: calculateRareWords( state ),
		data: state.data,
		connectionQuality: null, //calculateConnectionQuality( state ),
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma ) => {
			dispatch( setTrayVisibilityFilter( 'word' ) );
			dispatch( addWord( {
				strongsNumber: lemma,
				subdue: null,
				open: true,
				version: 'original',
			} ) );
		},
		setReferenceInfo: ( reference ) => {
			dispatch( setReferenceInfo( reference ) );
		},
		setReferenceInfoCompareWith: ( reference ) => {
			dispatch( setReferenceInfoCompareWith( reference ) );
		},
		setReferenceInfoLimit: ( limit ) => {
			dispatch( setReferenceInfoLimit( limit ) );
		},
	}
};

const ConnectedReferenceInfo = connect(
	mapStateToProps,
	mapDispatchToProps
)( ReferenceInfo )

export default withStyles( styles )( ConnectedReferenceInfo );
