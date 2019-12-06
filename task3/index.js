import path from 'path';
import { Watcher, Converter } from './models';
import { existsSync, mkdir } from 'fs';

const txtDirPath = './txt';
const csvDirPath = './csv';

const watcher = new Watcher(csvDirPath, txtDirPath);
const converter = new Converter(csvDirPath, txtDirPath);

watcher.on('process', (file) => {
  if (existsSync(txtDirPath)) {
    converter.convertToJson(file);
  } else {
    mkdir(txtDirPath, (err) => {
      if (err) {
        console.log(`Can't create a directory: ${err}`);
        return;
      }

      converter.convertToJson(file);
    });
  }
});

watcher.start();
watcher.watch();