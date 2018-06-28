export const getFamily = ( strongsNumber ) => {
	if ( javascripture.data.strongsObjectWithFamilies[ strongsNumber ] ) {
		return javascripture.data.strongsObjectWithFamilies[ strongsNumber ].family;
	} else {
		return strongsNumber;
	}
};
