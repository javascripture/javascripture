const morphologyDictionary = {
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

function parseGreekMorph( morph ) {
	var result = '',
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

    morphArray = morph.split('-');
    partOfSpeech = morphArray[0];
    result += morphologyDictionary.greek.partOfSpeech[partOfSpeech] + ' ';
    Case = morphArray[1];
    if (partOfSpeech === 'V') { //for verbs
        if (Case !== undefined) {
            if (morphologyDictionary.greek.Case[Case] !== undefined) {
                result += morphologyDictionary.greek.Case[Case] + ' ';
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
                result += morphologyDictionary.greek.Case.tense[tense] + ' ';
                result += morphologyDictionary.greek.Case.voice[voice] + ' ';
                result += morphologyDictionary.greek.Case.mood[mood];
            }
        }
        if (morphArray[2] !== undefined) {
            result += ' ';
            if (mood === "P" || mood === "R") {
                case2 = morphArray[2][0];
                result += morphologyDictionary.greek.Case[case2] + ' ';
                number = morphArray[2][1];
                result += morphologyDictionary.greek.number[number] + ' ';
                gender = morphArray[2][2];
                result += morphologyDictionary.greek.gender[gender];
            } else {
                person = morphArray[2][0];
                result += morphologyDictionary.greek.person[person] + ' ';
                number = morphArray[2][1];
                result += morphologyDictionary.greek.number[number];
            }
        }
    } else {
        if (morphArray[1] !== undefined) {
            if (morphologyDictionary.greek.Case[Case] !== undefined) { //there are some nouns that have a 3 letter case code
                result += morphologyDictionary.greek.Case[Case];
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
                    result += morphologyDictionary.greek.person[Person] + ' ';
                }
                result += morphologyDictionary.greek.Case[Case] + ' ';
                result += morphologyDictionary.greek.number[number] + ' ';
                if ( gender ) {
                    result += morphologyDictionary.greek.gender[gender];
                }
            }
        }
    }

    return result;
}
