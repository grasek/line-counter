import * as fs from 'fs';
import * as path from 'path';
import * as argv from 'process';

const dirpath = process.argv[2];
let dirContent = [], lines = [];

fs.readdir(dirpath, (err, files) => {
	if(err) throw err;

	files.forEach((file) => {
		const filePath = path.join(dirpath, file);
		fs.readFile(filePath, 'utf8', (err, data) => {
			if(err) throw err;
			dirContent.push(data.split('\n'));
		}) 
	})	
})

const histogram = () => {
	let codeLines = 0, comments = 0, emptyLines = 0;
	dirContent = dirContent.flat();
	for(let i = 0; i < dirContent.length; i++){
		if(dirContent[i] === '') {
			emptyLines++;
		} else if(dirContent[i][0] === '/' && dirContent[i][1] === '/'){
			comments++;
		} else{
			codeLines++;
		}
	}

	let sum = codeLines + comments + emptyLines;
	console.log(`Lines of code: ${codeLines} (${(codeLines / sum * 100).toFixed(2)}%) \nCommented lines: ${comments} (${(comments / sum * 100).toFixed(2)}%) \nEmpty lines: ${emptyLines} (${(emptyLines / sum * 100).toFixed(2)}%)`)
}

setTimeout(histogram, 1000)
