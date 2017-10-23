const os = require('os');
const path = require('path');
const fs = require('fs');

module.exports = function readConf (logger) {
	const homedir = os.homedir()

	const confPath = path.join(homedir, '.sdf', 'conf.json');

	const defaultConf = {
		searchPaths: [
			'/home/www'
		]
	};

	let confStr, userConf;

	try {
		confStr = fs.readFileSync(confPath);
	} catch (err) {
		logger.info(`Using default configuration as no overwrite file found at: ${confPath}`);
	}

	if (confStr) {
		try {
			userConf = JSON.parse(confStr);
		} catch (err) {
			logger.info(`Error occured trying to parse user config file at: ${confPath}`);
			logger.error(err.message);
		}
	}

	return userConf ? Object.assign({}, defaultConf, userConf) : defaultConf;
};

