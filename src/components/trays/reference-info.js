// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { uniq } from 'lodash';

// Internal dependencies
import { getLemmasForReference } from '../../lib/reference';
import { addWord, setReferenceInfo, setTrayVisibilityFilter } from '../../actions';

import styles from './styles.scss';

class ReferenceInfo extends React.Component {
	state = {
		compareWithBook: null,
		compareWithChapter: null,
		book: null,
		chapter: '',
		verse: '',
		limit: 100,
		overlap: null,
		rare: null,
	}

	bookChange = ( event ) => {
		const newState = {};
		let chapterFieldName = 'chapter';
		if ( event.target.name === 'compareWithBook' ) {
			chapterFieldName = 'compareWithChapter';
		}
		newState[ event.target.name ] = event.target.value;
		newState[ chapterFieldName ] = 1;
		newState.verse = 'all';
		this.setState( newState );
	}

	chapterChange = ( event ) => {
		const newState = {};
		newState[ event.target.name ] = event.target.value;
		newState.verse = 'all';
		this.setState( newState );
	}

	verseChange = ( event ) => {
		this.setState( { verse: event.target.value } );
	}

	getChapters() {
		if ( this.state.book ) {
			const bookNumber = bible.getBookId( this.state.book );
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
		this.props.setReferenceInfo( { ...this.props.referenceInfo, chapter: event.target.value, verse: 'all' } );
	}

	compareVerseChange = ( event ) => {
		this.props.setReferenceInfo( { ...this.props.referenceInfo, verse: event.target.value } );
	}

	getCompareChapters() {
		if ( this.props.referenceInfo && this.props.referenceInfo.book ) {
			const bookNumber = bible.getBookId( this.props.referenceInfo.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	}

	getDataFromBook( reference ) {
		return bible.Data.otBooks.indexOf( reference.book ) > -1 ? this.props.data.hebrew : this.props.data.greek;
	}

	compareChapters = () => {
		const ref1Lemmas = getLemmasForReference( this.props.referenceInfo, this.getDataFromBook( this.props.referenceInfo ) );
		const ref2Lemmas = getLemmasForReference( this.state, this.getDataFromBook( this.state ) );
		const overlap = ref1Lemmas.filter( lemma => {
			if ( javascripture.data.strongsObjectWithFamilies[ lemma ].count < this.state.limit ) {
				if ( ref2Lemmas.indexOf( lemma ) > -1 ) {
					return lemma;
				}
			}
		} )

		this.setState( {
			overlap: uniq( overlap )
		} );
	}

	changeLimit = ( event ) => {
		this.setState( {
			limit: event.target.value
		} );
	};

	addAllWords = () => {
		this.state.overlap.forEach( lemma => this.props.addWord( lemma ) );
	};

	getOverlap() {
		if ( ! this.state.overlap ) {
			return;
		}

		if ( this.state.overlap.length === 0 ) {
			return 'No connections found';
		}

		const overlap = this.state.overlap.map( lemma => <div key={ lemma }>{ lemma }</div> )

		return (
			<span>Connections: { overlap }</span>
		)
	}

	findRareWords = () => {
		const lemmas = getLemmasForReference( this.props.referenceInfo, this.getDataFromBook( this.props.referenceInfo ) );
		const rare = uniq( lemmas.filter( lemma => {
			return javascripture.data.strongsObjectWithFamilies[ lemma ].count < this.state.limit;
		} ) );

		this.setState({ rare });
	};

	getRareWords() {
		if ( ! this.state.rare ) {
			return null;
		}

		return this.state.rare.map( lemma => <div key={ lemma }>{ lemma }</div> );
	}

	render() {
		return (
			<div className={ styles.tray }>
				<div className={ styles.chapterTrayPadding }>
					<h2>Comparison</h2>
					<div className={ styles.chapterTray }>
						<span>Compare </span>
						<select name="compareWithBook" name="compareWithBook" onChange={ this.compareBookChange } value={ this.props.referenceInfo ? this.props.referenceInfo.book : '' }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="compareWithChapter" name="compareWithChapter" onChange={ this.compareChapterChange } value={ this.props.referenceInfo ? this.props.referenceInfo.chapter : '' }>
							{ this.getCompareChapters() }
						</select>
						<select name="compareWithVerses" onChange={ this.compareVerseChange } value={ this.props.referenceInfo ? this.props.referenceInfo.verse : '' }>{ this.getVerses( this.props.referenceInfo ) }</select>
					</div>
					<div className={ styles.chapterTray }>
						<span>with </span>
						<select name="book" onChange={ this.bookChange }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="chapter" onChange={ this.chapterChange } value={ this.state.chapter }>{ this.getChapters() }</select>
						<select name="verses" onChange={ this.verseChange } value={ this.state.verse }>{ this.getVerses( this.state ) }</select>
					</div>
					<div className={ styles.chapterTray }>
						For words used less than <input type="number" name="limit" value={ this.state.limit } onChange={ this.changeLimit } className={ styles.limit } /> times.
					</div>
					<div className={ styles.chapterTray }>
						<button onClick={ this.compareChapters } disabled={ ! this.state.book }>Compare</button>
					</div>
					<div className={ styles.chapterTray }>
						{ this.getOverlap() }
					</div>
					<div className={ styles.chapterTray }>
						{ this.state.overlap && this.state.overlap.length > 0 && <button onClick={ this.addAllWords }>Select all words</button> }
					</div>
					<h2>Rare words</h2>
					<div className={ styles.chapterTray }>
						Find words used less than <input type="number" name="limit" value={ this.state.limit } onChange={ this.changeLimit } className={ styles.limit } /> times.
					</div>
					<div className={ styles.chapterTray }>
						<button onClick={ this.findRareWords }>Find rare words</button>
					</div>
					<div>
						{ this.getRareWords() }
					</div>
				</div>
			</div>
		);
	}
}

ReferenceInfo.propTypes = {};

const mapStateToProps = ( state ) => {
	return {
		referenceInfo: state.referenceInfo,
		data: state.data,
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
		}
	}
};

const ConnectedReferenceInfo = connect(
	mapStateToProps,
	mapDispatchToProps
)( ReferenceInfo )

export default withStyles( styles )( ConnectedReferenceInfo );
