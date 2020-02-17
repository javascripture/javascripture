// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, setReferenceInfo } from '../../actions';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const Title =  React.memo( ( { book, chapter, version } ) => {
	const dispatch = useDispatch();

	const tranlatedBook = bible.getTranslatedBookName( book, version );
	const showChapterDetails = () => {
		dispatch( setTrayVisibilityFilter( 'reference' ) );
		dispatch( setReferenceInfo( { book, chapter } ) );
	};

	return (
		<h1 className={ styles.heading } onClick={ showChapterDetails }>
			{ tranlatedBook + ' ' + chapter }
		</h1>
	);
} );

export default withStyles( styles )( Title );
