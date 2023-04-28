"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var dirpath = process.argv[2];
var dirContent = [], lines = [];
fs.readdir(dirpath, function (err, files) {
    if (err)
        throw err;
    files.forEach(function (file) {
        var filePath = path.join(dirpath, file);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err)
                throw err;
            dirContent.push(data.split('\n'));
        });
    });
});
var histogram = function () {
    var codeLines = 0, comments = 0, emptyLines = 0;
    dirContent = dirContent.flat();
    for (var i = 0; i < dirContent.length; i++) {
        if (dirContent[i] === '') {
            emptyLines++;
        }
        else if (dirContent[i][0] === '/' && dirContent[i][1] === '/') {
            comments++;
        }
        else {
            codeLines++;
        }
    }
    var sum = codeLines + comments + emptyLines;
    console.log("Lines of code: ".concat(codeLines, " (").concat((codeLines / sum * 100).toFixed(2), "%) \nCommented lines: ").concat(comments, " (").concat((comments / sum * 100).toFixed(2), "%) \nEmpty lines: ").concat(emptyLines, " (").concat((emptyLines / sum * 100).toFixed(2), "%)"));
};
setTimeout(histogram, 1000);
