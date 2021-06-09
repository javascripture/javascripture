// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import CombinedResults from './combined';
import WordBlock from './word-block';

const WordDetails = React.memo( () => {
	const words = useSelector( state => state.list.filter( ( { listType } ) => listType === 'word' ) );
	return words.length ? (
		<div>
			{ words.map( ( word, index ) => {
				return (
					<WordBlock { ...word } key={ index } />
				);
			} ) }
			<CombinedResults />
		</div>
	) : <div className={ styles.wordBlockHelp }>Select a word to show more details about it here.</div>;

} );

export default WordDetails;
