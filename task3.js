const fs = require('fs');
const events = require('events');
const utils = require('util');
const csvDirPath = './csv';
const txtDirPath = './txt';

class Watcher extends events.EventEmitter {
  constructor(watchDir, processesDir) {
    super();
    this.watchDir = watchDir;
    this.processesDir = processesDir;
    super.on.bind(this)
  }

  watch() {
    const watcher = this;

    fs.readdir(this.watchDir, { encoding: 'utf-8'}, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      const csvFiles = this.getCSVFiles(files);

      for (let index in csvFiles) {
        console.log(csvFiles[index]);
        watcher.emit('process', csvFiles[index]);
      }
    });
  }

  start() {
    const watcher = this;
    fs.watchFile(this.watchDir, () => {
      watcher.watch();
    })
  }

  getCSVFiles(files) {
    return files.filter(file => this.getFileExtension(file) === 'csv');
  }

  getFileExtension(file) {
    const fileName = file.split('.');
    return fileName[fileName.length - 1];
  }
}

const watcher = new Watcher(csvDirPath, txtDirPath);

watcher.watch();

watcher.on('process', (file) => {
  const watchFile = `${this.watchDir}/${file}`;
  const processedFile = `${this.processesDir}/${file}`;
  console.log('check', this);

  if (fs.existsSync(watcher.processesDir)) {
    //convert to txt file
  } else {
    //create directory
    utils.promisify(fs.mkdir(this.processesDir, { recursive: true }, (err) => {
      console.log(`Can't create a directory, ${err}`);
    }));
  }
});

watch.start();

