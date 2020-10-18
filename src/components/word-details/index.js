// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import CombinedResults from './combined';
import WordBlock from './word-block';

const WordDetails = React.memo( () => {
	const words = useSelector( ( state ) => state.wordDetails );
	if ( words.length ) {
		return (
			<div>
				{ words.map( ( wordDetails, index ) => {
					return (
						<WordBlock { ...wordDetails } key={ index } />
					);
				} ) }
				<CombinedResults />
			</div>
		);
	}

	return ( <div className={ styles.wordBlock }>Select a word to show more details about it here.</div> );

} );

export default withStyles( styles )( WordDetails );
