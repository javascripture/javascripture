// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, showCrossReferences } from '../../actions';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const VerseNumber =  React.memo( ( { book, chapter, verse } ) => {
	const dispatch = useDispatch();
	const handleShowCrossReferences = () => {
		dispatch( showCrossReferences( { book,chapter, verse } ) );
		dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
	};

	return (
		<span onClick={ handleShowCrossReferences } className={ styles.verseNumber }>{ verse }. </span>
	);
} );

export default withStyles( styles )( VerseNumber );
