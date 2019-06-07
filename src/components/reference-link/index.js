// External dependencies
import { Link } from 'react-router-dom';
import React from 'react';

// Internal dependencies
import { createReferenceLink } from '../../lib/reference';
import ReferenceText from '../reference-text';

//The right way to do a link

const ReferenceLink = ( { reference, number } ) => {
	return (
		<Link to={ createReferenceLink( reference ) }>
			{ number + 1 }. <ReferenceText reference={ reference } />
		</Link>
	);
};

export default ReferenceLink;
