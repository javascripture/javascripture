const initialVersions = [
	[ 'original', 'Original' ],
	[ 'kjv', 'KJV' ],
	[ 'web', 'WEB' ],
	[ 'esv', 'ESV' ],
	[ 'lc', 'Literal' ],
];

const versions = ( state = initialVersions , action ) => {
	let returnState;
	switch ( action.type ) {
		default:
			return state;
	}
}

export default versions;
