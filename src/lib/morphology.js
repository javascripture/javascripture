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
	},
	greek: {
		partOfSpeech: {
			N: 'noun',
			A: 'adjective',
			T: 'article',
			V: 'verb',
			P: 'personal pronoun',
			R: 'relative pronoun',
			C: 'reciprocal pronoun',
			D: 'demonstrative pronoun',
			K: 'correlative pronoun',
			I: 'interrogative pronoun',
			X: 'indefinite pronoun',
			Q: 'correlative or interrogative pronoun',
			F: 'reflexive pronoun',
			S: 'possessive pronoun',
			ADV: 'adverb',
			CONJ: 'conjunction',
			COND: 'cond',
			PRT: 'particle',
			PREP: 'preposition',
			INJ: 'interjection',
			ARAM: 'aramaic',
			HEB: 'hebrew'
		},
		Case: {
			N: 'nominative',
			V: 'vocative',
			G: 'genitive',
			D: 'dative',
			A: 'accusative',
			PRI: 'proper noun indeclinable',
			NUI: 'numeral indeclinable',
			LI: 'letter indeclinable',
			OI: 'noun other type indeclinable',
			tense: {
				P  : 'present',
				I  : 'imperfect',
				F  : 'future',
				'2F' : 'second future',
				A  : 'aorist',
				'2A' : 'second aorist',
				R  : 'perfect',
				'2R' : 'second perfect',
				L  : 'pluperfect',
				'2L' : 'second pluperfect',
				X  : 'no tense stated'
			},
			voice: {
				A : 'active',
				M : 'middle',
				P : 'passive',
				E : 'middle or passive',
				D : 'middle deponent',
				O : 'passive deponent',
				N : 'middle or passive deponent',
				Q : 'impersonal active',
				X : 'no voice'
			},
			mood: {
				I: 'indicative',
				S: 'subjunctive',
				O: 'optative',
				M: 'imperative',
				N: 'infinitive',
				P: 'participle',
				R: 'imperative participle'
			}
		},
		number: {
			S: 'singular',
			P: 'plural'
		},
		gender: {
			M: 'masculine',
			F: 'feminine',
			N: 'neuter'
		},
		person: {
			1: 'first person',
			2: 'second person',
			3 : 'third person'
		}
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
	var markup = '',
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
