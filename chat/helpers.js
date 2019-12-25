let fs = require('fs');

function checkPeople(clients){
    return clients.length;
}

function parserInObj (element) {
    return JSON.parse(element); 
}

function parseInStr (element) {
    return JSON.stringify(element);
}

function getDataFromFile(file) {
    let fileContent = fs.readFileSync(file, "utf-8");
    return parserInObj(fileContent);
}

function writeStringToFile(newData, fileName){
    let newFile = parseInStr(newData);
	fs.writeFileSync(fileName, newFile);
}

module.exports = {checkPeople, parserInObj, parseInStr, getDataFromFile, writeStringToFile}