const initialVersions = [
	[ 'original', 'Original' ],
	[ 'kjv', 'KJV' ],
	[ 'web', 'WEB' ],
	[ 'esv', 'ESV' ],
];

const versions = ( state = initialVersions , action ) => {
	let returnState;
	switch ( action.type ) {
		default:
			return state;
	}
}

export default versions;
