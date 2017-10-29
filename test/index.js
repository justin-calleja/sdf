const engine = require('php-parser');
const fs = require('fs');
const path = require('path');
const traverse = require("ast-traverse");

const parser = new engine();

const wpConfigStr = fs.readFileSync(path.join(__dirname, 'wp-config.php')).toString();
const ast = parser.parseCode(wpConfigStr);

const result = ast.children.reduce((acc, node) => {
	if (node.kind === 'call' && node.what.name === 'define') {
		if (node.arguments[0].value === 'DB_NAME') {
			return Object.assign({}, acc, {
				dbName: node.arguments[1].value
			});
		}
		if (node.arguments[0].value === 'DB_USER') {
			return Object.assign({}, acc, {
				dbUser: node.arguments[1].value
			});
		}
		if (node.arguments[0].value === 'DB_PASSWORD') {
			return Object.assign({}, acc, {
				dbPassword: node.arguments[1].value
			});
		}
		if (node.arguments[0].value === 'DB_HOST') {
			return Object.assign({}, acc, {
				dbHost: node.arguments[1].value
			});
		}
	}
	return acc;
}, {});

console.log(result)
