// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { clearAll, removeTypeFromList, clearSearch } from '../../actions';

import ClearSvg from '../svg/clear.js';
import DeleteForever from '../svg/delete-forever.js';
import styles from './style.scss';

const Clear = React.memo( ( { selectedTrayId } ) => {
	const dispatch = useDispatch();
	const wordDetails = useSelector( state => state.wordDetails );
	const bookmarks = useSelector( state => state.list.filter( ( { listType } ) => listType === 'bookmark' ) );
	const searchTerms = useSelector( state => state.searchTerms );

	if (  selectedTrayId !== 'bookmarks' && selectedTrayId !== 'word' && selectedTrayId !== 'search' ) {
		return <button className={ styles.button }>&nbsp;</button>;
	}

	if ( selectedTrayId === 'bookmarks' && bookmarks.length === 0 ) {
		return <button className={ styles.button }>&nbsp;</button>;
	}

	if ( selectedTrayId === 'word' && wordDetails.length === 0 ) {
		return <button className={ styles.button }>&nbsp;</button>;
	}

	if ( selectedTrayId === 'search' && searchTerms.length === 0 ) {
		return <button className={ styles.button }>&nbsp;</button>;
	}

	const clearTray = ( event ) => {
		event.preventDefault();
		if ( selectedTrayId === 'bookmarks' ) {
			dispatch( removeTypeFromList( 'bookmark' ) );
		}

		if ( selectedTrayId === 'word' ) {
			dispatch( clearAll() );
		}

		if ( selectedTrayId === 'search' ) {
			dispatch( clearSearch() );
		}
	};

	return (
		<button onClick={ ( event ) => {
			clearTray( event )
		} } title="Clear" className={ styles.clear }>
			<DeleteForever />
		</button>
	);
} );

export default withStyles( styles )( Clear );
