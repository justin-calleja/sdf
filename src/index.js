const inquirer = require('inquirer');
const inquirerAutoCompletePrompt = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');

inquirer.registerPrompt('autocomplete', inquirerAutoCompletePrompt);

var states = [
	'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona',
	'Arkansas',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Marshall Islands'
];

function searchStates(answers, input) {
	input = input || '';
	return new Promise(function (resolve) {
		var fuzzyResult = fuzzy.filter(input, states);
		resolve(fuzzyResult.map(function (el) {
			return el.original;
		}));
	});
}

let questions = [{
	type: 'autocomplete',
	name: 'chooseDir',
	message: 'Which dir do you want to go to?',
	source: searchStates
}];

inquirer.prompt(questions).then(function (answers) {
	console.log('answers:', answers);
});

