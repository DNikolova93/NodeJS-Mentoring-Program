import fs from 'fs';
import path from 'path';

export class Logger {
  public config: any;

  constructor(config: any) {
    this.config = config;
  }

  log(message: string) {
    if (this.config.env === this.config.dev) {
      console.log(message);
      return;
    }

    if (this.config.env === this.config.prod) {
      message = `\n${new Date(Date.now())}: ${message}`;

      const logPath = path.join(__dirname, '../logs/logs.txt');

      fs.appendFileSync(logPath, message);

      return;
    }
  }
}
