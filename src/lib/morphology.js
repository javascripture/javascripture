export default function (morph, includeLinks, lemma ) {
	if (includeLinks === undefined) {
		includeLinks = 'noLinks';
	}
	var language = 'greek';
	if ( lemma.substring( 0, 1 ) === "H" ) {
		language = 'hebrew';
	}
	var morphologyDictionary = javascripture.data.morphology,
		markup = '',
		gender,
		morphArray,
		number,
		Case,
		person,
		Person,
		case2,
		mood,
		voice,
		tense,
		partOfSpeech;
	if (morph !== undefined) {
		//hebrew
		if (morphologyDictionary.hebrew[morph] !== undefined) {
			markup += morphologyDictionary.hebrew[morph];
		} else {
			if ( 'hebrew' === language ) {
				const morphParseObject = new MorphParse();
				if ( 'undefined' !== typeof morphParseObject.Parse( morph ) ) {
					markup += morphParseObject.Parse( 'H' + morph ); // The morphology API expexts the morph to be prepended with an H
				}
			} else {
				//greek
				morphArray = morph.split('-');
				partOfSpeech = morphArray[0];
				markup += morphologyDictionary.greek.partOfSpeech[partOfSpeech] + ' ';
				Case = morphArray[1];
				if (partOfSpeech === 'V') { //for verbs
					if (Case !== undefined) {
						if (morphologyDictionary.greek.Case[Case] !== undefined) {
							markup += morphologyDictionary.greek.Case[Case] + ' ';
						} else {
							if (parseInt(Case[0], 10) > 0) { // second future, second aorist and second perfect
								tense = Case[0] + Case[1];
								voice = Case[2];
								mood = Case[3];
							} else {
								tense = Case[0];
								voice = Case[1];
								mood = Case[2];
							}
							markup += morphologyDictionary.greek.Case.tense[tense] + ' ';
							markup += morphologyDictionary.greek.Case.voice[voice] + ' ';
							if ( includeLinks === 'withLinks' ) {
								markup += '<a href="#" class="morphSearch" data-word="" data-lemma="" data-morph="V-(.*)' + mood + '-" ';
								markup += 'data-language="greek" data-range="word" >';
							}
							markup += morphologyDictionary.greek.Case.mood[mood];
							if ( includeLinks === 'withLinks' ) {
								markup += '</a> '; //should be abstracted
							}
						}
					}
					if (morphArray[2] !== undefined) {
						markup += ' ';
						if (mood === "P" || mood === "R") {
							case2 = morphArray[2][0];
							markup += morphologyDictionary.greek.Case[case2] + ' ';
							number = morphArray[2][1];
							markup += morphologyDictionary.greek.number[number] + ' ';
							gender = morphArray[2][2];
							markup += morphologyDictionary.greek.gender[gender];
						} else {
							person = morphArray[2][0];
							markup += morphologyDictionary.greek.person[person] + ' ';
							number = morphArray[2][1];
							markup += morphologyDictionary.greek.number[number];
						}
					}
				} else {
					if (morphArray[1] !== undefined) {
						if (morphologyDictionary.greek.Case[Case] !== undefined) { //there are some nouns that have a 3 letter case code
							markup += morphologyDictionary.greek.Case[Case];
						} else {
							if ( parseInt( morphArray[1][0] ) > 0 ) {
								Person = morphArray[1][0];
								Case = morphArray[1][1];
								number = morphArray[1][2];
								gender = morphArray[1][3];
							} else {
								Case = morphArray[1][0];
								number = morphArray[1][1];
								gender = morphArray[1][2];
							}

							if ( typeof Person !== 'undefined' ) {
								markup += morphologyDictionary.greek.person[Person] + ' ';
							}
							markup += morphologyDictionary.greek.Case[Case] + ' ';
							markup += morphologyDictionary.greek.number[number] + ' ';
							if ( gender ) {
								markup += morphologyDictionary.greek.gender[gender];
							}
						}
					}
				}
			}
		}
	}
	return markup;
};
