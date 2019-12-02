const fs = require('fs');
const EventEmitter = require('events');
const { promisify } = require('util');
const csvtojson = require('csvtojson');
const csvDirPath = './csv';
const txtDirPath = './txt';

const watcher = new EventEmitter();

const watch = () => {
  fs.readdir(csvDirPath, { encoding: 'utf-8' }, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    const csvFiles = getCSVFiles(files);

    for (let index in csvFiles) {
      watcher.emit('process', csvFiles[index]);
    }
  });
}

const getCSVFiles = (files) => {
  return files.filter(file => getFileExtension(file) === 'csv');
}

const getFileExtension = (file) => {
  const fileName = file.split('.');
  return fileName[fileName.length - 1];
}

const getFileName = (file) => {
  const fileName = file.split('.');
  return fileName[0];
}


const converToJson = (filePath, processedPath) => {
  let headers = [];
  const file = fs.createWriteStream(processedPath);
  csvtojson({ output: 'line' })
    .on('header', (header) => {
      headers = [...header];
      console.log('headers', headers);
    })
    .fromFile(filePath)
    .subscribe((data, lineNumber) => {
      console.log('data', data);
      console.log('line number', lineNumber);
      // writeStream(processedPath);
      file.write(data);
  })
}

const writeStream = (filePath, data) => {
   const file = fs.createWriteStream(processedPath);
  file.write(data);
}

watcher.on('process', (file) => {
  const watchFile = `${csvDirPath}/${file}`;
  const processedFile = `${txtDirPath}/${getFileName(file)}.txt`;
  if (fs.existsSync('./txt')) {
    console.log(`Directory exist`);
    converToJson(watchFile, processedFile);
  } else {
    fs.mkdir('./txt', (err) => {

      if (err) {
        console.log(`Can't create a directory, ${err}`);
      }

      console.log('directory created');
    });
  }
});

watch();
// console.log(files);

// const watcher = 
