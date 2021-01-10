// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';

// Internal dependencies
import { createReferenceLink } from '../../lib/reference';
import ReferenceText from '../reference-text';

//The right way to do a link

const ReferenceLink = ( { reference, number } ) => {
	return (
		<a href={ '/#' + createReferenceLink( reference ) } onClick={ ( event ) => event.stopPropagation() }>
			{ typeof number !== 'undefined' && ( parseInt( number ) + 1 + '.' ) } <ReferenceText reference={ reference } />
		</a>
	);
};

export default ReferenceLink;
