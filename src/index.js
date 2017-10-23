const inquirer = require('inquirer');
const inquirerAutoCompletePrompt = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');
const getDirs = require('./utils/getDirs');

inquirer.registerPrompt('autocomplete', inquirerAutoCompletePrompt);

module.exports = (searchPaths) => {
	const dirs = searchPaths.reduce((acc, searchPath) => {
		return acc.concat(getDirs(searchPath));
	}, []);

	const searchDirs = (answers, input) => {
		input = input || '';
		return new Promise(function (resolve) {
			var fuzzyResult = fuzzy.filter(input, dirs);
			resolve(fuzzyResult.map(function (el) {
				return el.original;
			}));
		});
	}

	let questions = [{
		type: 'autocomplete',
		name: 'chooseDir',
		message: 'Select directory',
		source: searchDirs
	}];

	return inquirer.prompt(questions);

	// .then(function (answers) {
	// 	console.log('answers:', answers);
	// });
};
