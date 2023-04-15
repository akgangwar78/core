/**
 * Script to read languages array from stdin and print prettified array
 */
const fs = require('fs');

function getPrettifiedLanguagesList(langs, langsPerLine = 10) {
	const lines = [];

	for (let offset = 0; offset < langs.length; offset += langsPerLine) {
		const line = langs
			.slice(offset, offset + langsPerLine)
			.map((l) => `"${l}"`)
			.join(', ');
		lines.push(line);
	}

	return '[\n' + lines.map((l) => '\t' + l).join(',\n') + '\n]';
}

const rawData = fs.readFileSync('/dev/stdin').toString();
const data = JSON.parse(rawData);
if (!Array.isArray(data) || !data.every((e) => typeof e === 'string')) {
	throw new TypeError('Invalid data');
}

const prettifiedLangs = getPrettifiedLanguagesList(data);

console.log(prettifiedLangs);
