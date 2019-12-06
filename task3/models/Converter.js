import { createWriteStream } from 'fs';
import csvtojson from 'csvtojson';

class Coverter {
  constructor(filePath, processedFilePath) {
    this.filePath = filePath;
    this.processedFilePath = processedFilePath;
  }

  convertToJson(fileName) {
    let headers = [];
    const watchFile = `${this.filePath}/${fileName}`;
    const processedFile = `${this.processedFilePath}/${this.getFileName(fileName)}.txt`;

    const file = createWriteStream(processedFile);
    csvtojson({ output: 'line' })
      .on('header', header => {
        headers = [...header];
      })
      .fromFile(watchFile)
      .subscribe(data => {
        const csvData = {};
        const columns = data.split(',');
        
        let txtData;
        
        if (headers.length && headers.length === columns.length) {
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

  getFileName(file) {
    if (file) {
      const fileName = file.split('.');
      return fileName[0];
    }

    return '';
  }
}

export default Coverter;