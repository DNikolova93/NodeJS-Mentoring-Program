const fs = require('fs');
const EventEmitter = require('events');
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

const startMonitoring = (watchDir) => {
  fs.watchFile(watchDir, () => {
    watch();
  })
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
    })
    .fromFile(filePath)
    .subscribe((data, lineNumber) => {
      const csvData = {};
      const columns = data.split(',');
      let txtData;

      if (headers.length) {
        columns.forEach((value, index) => csvData[headers[index]] = value);
        txtData = JSON.stringify(csvData);
      } else {
        txtData = JSON.stringify(data);
      }

      file.write(txtData + '\n');
    })
    .on('done', (err) => {
      if (err) {
        console.log('Error', err);
        return;
      }

      console.log('File created successfully');
    });
}

watcher.on('process', (file) => {
  const watchFile = `${csvDirPath}/${file}`;
  const processedFile = `${txtDirPath}/${getFileName(file)}.txt`;
  if (fs.existsSync('./txt')) {
    converToJson(watchFile, processedFile);
  } else {
    fs.mkdir('./txt', (err) => {
      
      if (err) {
        console.log(`Can't create a directory, ${err}`);
        return;
      }
      
      converToJson(watchFile, processedFile);
    });
  }
});

startMonitoring(csvDirPath);
watch();