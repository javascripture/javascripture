export const getFamily = ( strongsNumber ) => {
	if ( javascripture.data.strongsObjectWithFamilies[ strongsNumber ] && javascripture.data.strongsObjectWithFamilies[ strongsNumber ].family ) {
		return javascripture.data.strongsObjectWithFamilies[ strongsNumber ].family;
	} else {
		return strongsNumber;
	}
};
