const engine = require('php-parser');
const fs = require('fs');
const path = require('path');
const traverse = require("ast-traverse");

const globalParser = new engine();

module.exports = function getDbInfo (dirPath, opts = {}) {
	const parser = opts.parser || globalParser;
	const wpConfigStr = fs.readFileSync(path.join(dirPath, 'wp-config.php')).toString();
	const ast = parser.parseCode(wpConfigStr);
	return ast.children.reduce((acc, node) => {
		if (node.kind === 'call' && node.what.name === 'define') {
			if (node.arguments[0].value === 'DB_NAME') {
				return Object.assign({}, acc, {
					name: node.arguments[1].value
				});
			}
			if (node.arguments[0].value === 'DB_USER') {
				return Object.assign({}, acc, {
					user: node.arguments[1].value
				});
			}
			if (node.arguments[0].value === 'DB_PASSWORD') {
				return Object.assign({}, acc, {
					password: node.arguments[1].value
				});
			}
			if (node.arguments[0].value === 'DB_HOST') {
				return Object.assign({}, acc, {
					host: node.arguments[1].value
				});
			}
		}
		return acc;
	}, {});
};
