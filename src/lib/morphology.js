const morphologyDictionary = {
	hebrew: {
		TH8712: 'Kal Infinitive',
		TH8798: 'Kal Imperitive',
		TH8799: 'Kal Future',
		TH8802: 'Kal Participle Poel',
		TH8803: 'Kal Participle Paul',
		TH8804: 'Kal Preterite',
		TH8735: 'Niphal Future',
		TH8736: 'Niphal Inifinitive',
		TH8737: 'Niphal Participle',
		TH8738: 'Niphal Preterite',
		TH8762: 'Piel Future',
		TH8763: 'Piel Infinitive',
		TH8764: 'Piel Participle',
		TH8765: 'Piel Preterite',
		TH8685: 'Hiphel imperative',
		TH8686: 'Hiphil Future',
		TH8687: 'Hiphil Infinitive',
		TH8688: 'Hiphil Participle',
		TH8689: 'Hiphil Preterite',
		TH8690: 'Hithpael Imperitive',
		TH8691: 'Hithpiel Future',
		TH8693: 'Hithpiel Participle',
		TH8710: 'Hithpiel Infinitive',
		TH8800: 'Hithpiel Preterite'
	}
};

export default function (morph, includeLinks, lemma ) {
	if (includeLinks === undefined) {
		includeLinks = 'noLinks';
	}
	var language = 'greek';
	if ( lemma.substring( 0, 1 ) === "H" ) {
		language = 'hebrew';
	}
	var markup = '';
	if (morph !== undefined) {
		//hebrew
		if (morphologyDictionary.hebrew[morph] !== undefined) {
			markup += morphologyDictionary.hebrew[morph];
		} else {
			if ( 'hebrew' === language ) {
				const morphParseObject = new MorphParse();
				if ( 'undefined' !== typeof morphParseObject.Parse( morph ) ) {
					markup += morphParseObject.Parse( morph );
				}
			} else {
				//greek
				markup += parseGreekMorph( morph );
			}
		}
	}
	return markup;
};
