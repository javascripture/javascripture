/*global define, debug, module, test, ok*/
define(['../api/morphology'], function (morphology) {
	"use strict";

	/*english tests*/
	var parameters = { //default parameters
		language: 'english',
		range: 'verse'
	}
	module("morphology");
	test('get a morphology in hebrew', function () {
		expect(2);
		console.log(morphology.get('V-2AAN', 'withLinks'));
		equal(morphology.get('TH8762'), 'Piel Future', 'TH8762 is Piel Future');
		equal(morphology.get('TH8799'), 'Kal Future', 'TH8799 is Kal Future');
	});
	test('get a morphology in greek', function () {
		expect(2);
		equal(morphology.get('V-2AAN'), 'verb second aorist active infinitive', 'V-2AAN is a verb second aorist active infinitive');
		equal(morphology.get('V-AAI-3P'), 'verb aorist active indicative third person plural', 'V-AAI-3P is a verb aorist active indicative third person plural');
	});
});
