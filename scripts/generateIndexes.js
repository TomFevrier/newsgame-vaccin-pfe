const fs = require('fs');
const process = require('process');

const folder = 'src/' + process.argv[2];
const files = fs.readdirSync(folder)
	.filter(e => (e.endsWith('.js') || e.endsWith('.svelte')) && e !== 'index.js');

const content = `${files.map(file => `import ${file.split('.')[0]} from './${file}';`).join('\n')}

export {
${files.map(file => `\t${file.split('.')[0]}`).join(',\n')}
};`;

fs.writeFileSync(folder + '/index.js', content);
