// External
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { mapVersionToData } from '../../lib/reference';
import Word from './word';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import deferComponentRender from '../deferComponentRender';

const Verse = React.memo( ( { reference, version } ) => {
	const dispatch = useDispatch();
	const { book, chapter, verse } = reference;
	const data = useSelector( state => state.data );
	const language = mapVersionToData( book, version );
	let lastWord = null;
	let words = null;

	const placeholder = ( key ) => {
		return (
			<div className={ styles.verseWrapper } key={ key }>
				<span className={ styles.placeholder }>&nbsp;Loading</span>
				<span className={ styles.placeholder } style={ { width: ( Math.random() * 100 ) + '%' } }>&nbsp;</span>
			</div>
		);
	}

	const notAvailable = ( key ) => {
		return (
			<div className={ styles.verseWrapper } key={ key }>Book not available</div>
		);
	}

	if ( ! data[ language ] || Object.keys( data[ language ] ).length === 0 ) {
		return placeholder( verse );
	}

	if ( ! data[ language ][ book ] ) {
		return notAvailable( verse );
	}

	if ( ! language || typeof data[ language ] === 'undefined' || typeof data[ language ][ book ] === 'undefined' || typeof data[ language ][ book ][ chapter ] === 'undefined' ) {
		return null;
	}

	const verseData = data[ language ][ book ][ chapter ][ verse ] ;
	if ( verseData && verseData.map ) {
		words = verseData.map( ( word, index ) => {
			lastWord = word;
			return <Word word={ word } key={ index } version={ version } lastWord={ lastWord }/>;
		} );
	} else if ( verseData ) {
		words = verseData.replace(/<[^>]+>/g, ''); // to strip tags like <FI>
	}

	return words;
} );

export default deferComponentRender( withStyles( styles )( Verse ) );
