// External dependencies
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal dependencies
import { addSearch, setTrayVisibilityFilter } from '../../actions';
import styles from './styles.scss';

const KJVDef = React.memo( ( { word, strongsNumber } ) => {
	const dispatch = useDispatch();
	const searchWord = () => {
		const searchParameters = {
			clusivity: 'exclusive',
			version: 'KJV',
			lemma: strongsNumber,
			range: 'word',
			word: word,
			strict: false,
			morph: '',
		};

		dispatch( addSearch( searchParameters, 'search' ) );
		dispatch( setTrayVisibilityFilter( 'search' ) )
	};

	return (
		<span className={ styles.fakeLink } onClick={ searchWord }>{ word }</span>
	);
} );

export default KJVDef;
