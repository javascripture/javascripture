// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { union } from 'lodash';

// Internal dependencies
import VerseWrapper from '../reference/verse-wrapper.js';
import SingleReference from '../reference/single-reference.js';
import Title from '../reference/title.js';
import styles from './styles.scss';

const Comparison = React.memo( () => {
	const list = useSelector( state => state.list );
	const referenceControl = useSelector( state => state.reference );

	let combinedResults = [];
	list.forEach( item => {
		if ( item.results ) {
			combinedResults = union( combinedResults, item.results );
		}
	} );

	const sortReferences = ( referenceA, referenceB ) => {
		const referenceAArray = referenceA.split('.');
		const referenceBArray = referenceB.split('.');
		const positionOfReferenceA = bible.Data.allBooks.indexOf( referenceAArray[ 0 ] );
		const positionOfReferenceB = bible.Data.allBooks.indexOf( referenceBArray[ 0 ] );

		if ( positionOfReferenceA === positionOfReferenceB ) {
			if ( referenceAArray[1] === referenceBArray[1] ) {
				return referenceAArray[2] - referenceBArray[2];
			}

			return referenceAArray[1] - referenceBArray[1];
		}

		return positionOfReferenceA - positionOfReferenceB;
	}
	combinedResults = combinedResults.sort( sortReferences )

	return list.length > 0 ? (
		<div className={ styles.comparison }>
			{ combinedResults.map( ( item, index ) => {
				const referenceArray = item.split('.');
				const reference = {
					book: referenceArray[0],
					chapter: referenceArray[1],
					verse: referenceArray[2],
				};
				const markup = referenceControl.map( ( { version } ) => {
					return (
						<div>
							<Title book={ reference.book } chapter={ reference.chapter } version={ version } />
							<VerseWrapper
								book={ reference.book }
								version={ version }
								chapter={ reference.chapter }
								verse={ reference.verse }
								key={ 'versewrapper' + reference.chapter + reference.verse + 'original' }
								isCurrentRef={ false } />
						</div>
					);
				} );

				return (
					<div key={ index }>
						<SingleReference>
							{ markup }
						</SingleReference>
					</div>
				);
			} ) }
		</div>
	) : (
		<VerseWrapper
			book={ 'I Corinthians' }
			version={ 'KJV' }
			chapter={ '2' }
			verse={ '13' }
			isCurrentRef={ false } />
	);

} );

export default Comparison;
