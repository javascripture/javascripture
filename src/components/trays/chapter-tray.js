// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { uniq } from 'lodash';

// Internal dependencies
import { getLemmasForReference } from '../../lib/reference';
import { addWord, setTrayVisibilityFilter } from '../../actions';

import styles from './styles.scss';

class ChapterTray extends React.Component {
	state = {
		compareWithBook: null,
		compareWithChapter: null,
		book: null,
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
		this.setState( newState );
	}

	chapterChange = ( event ) => {
		const newState = {};
		newState[ event.target.name ] = event.target.value;
		this.setState( newState );
	}

	getChapters() {
		if ( this.state.book ) {
			const bookNumber = bible.getBookId( this.state.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	}

	getCompareChapters() {
		if ( this.props.chapterInfo && this.props.chapterInfo.book ) {
			const bookNumber = bible.getBookId( this.props.chapterInfo.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	}

	getDataFromBook( reference ) {
		return bible.Data.otBooks.indexOf( reference.book ) > -1 ? this.props.data.hebrew : this.props.data.greek;
	}

	compareChapters = () => {
		const ref1Lemmas = getLemmasForReference( this.props.chapterInfo, this.getDataFromBook( this.props.chapterInfo ) );
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
		const lemmas = getLemmasForReference( this.props.chapterInfo, this.getDataFromBook( this.props.chapterInfo ) );
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
						<select name="compareWithBook" name="compareWithBook" onChange={ this.bookChange } value={ this.props.chapterInfo ? this.props.chapterInfo.book : '' }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="compareWithChapter" name="compareWithChapter" onChange={ this.chapterChange } value={ this.props.chapterInfo ? this.props.chapterInfo.chapter : '' }>
						{ this.getCompareChapters() }
						</select>
					</div>
					<div className={ styles.chapterTray }>
						<span>with </span>
						<select name="book" onChange={ this.bookChange }>
							<option value="">Select a book</option>
							{
								bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> )
							}
						</select>
						<select name="chapter" onChange={ this.chapterChange }>{ this.getChapters() }</select>
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
						{ this.state.overlap && <button onClick={ this.addAllWords }>Select all words</button> }
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

ChapterTray.propTypes = {};

const mapStateToProps = ( state ) => {
	return {
		chapterInfo: state.chapterInfo,
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
	}
};

const ConnectedChapterTray = connect(
	mapStateToProps,
	mapDispatchToProps
)( ChapterTray )

export default withStyles( styles )( ConnectedChapterTray );
