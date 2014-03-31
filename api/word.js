/*globals javascripture bible*/
javascripture.api.word = {
	getFamily: function ( strongsNumber ) {
		if ( javascripture.data.strongsObjectWithFamilies[ strongsNumber ] ) {
			return javascripture.data.strongsObjectWithFamilies[ strongsNumber ].family;
		} else {
			return strongsNumber;
		}
	}
};