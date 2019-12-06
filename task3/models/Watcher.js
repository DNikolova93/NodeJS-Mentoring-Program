import { EventEmitter } from 'events';
import { readdir, watchFile } from 'fs';

class Watcher extends EventEmitter {
  constructor(watchDir, processesDir) {
    super();
    this.watchDir = watchDir;
    this.processesDir = processesDir;
  }

  watch() {
    const watcher = this;

    readdir(this.watchDir, { encoding: 'utf-8'}, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      const csvFiles = this.getCSVFiles(files);

      for (let index in csvFiles) {
        watcher.emit('process', csvFiles[index]);
      }
    });
  }

  start() {
    const watcher = this;
    watchFile(this.watchDir, () => {
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

export default Watcher;